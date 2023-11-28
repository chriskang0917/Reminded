import {
  FieldValue,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { nanoid } from "nanoid";
import { db } from "../config/firebase";
import { cardUtils } from "../utils/cardUtils";
import { cookie } from "../utils/cookie";
import { authStore } from "./authStore";

export type cardStatus =
  | "idea"
  | "action"
  | "todo"
  | "remind"
  | "note"
  | "execute";

export const enum CardsType {
  All,
  TodoAll,
  TodoToday,
  TodoTomorrow,
  TodoThisWeek,
  TodoComplete,
  IdeaAll,
  IdeaThisWeek,
  ActionAll,
  ActionTodo,
  ActionExpired,
  ActionArchive,
  ExecutedAction,
}

export interface ICard {
  id: string;
  content: string;
  tags: string[];
  status: cardStatus;
  isArchived: boolean;
  isTransformed: boolean;
  isImportant: boolean;
  createdTime: string;
  updatedTime: string;
  serverTimestamp: FieldValue;
  dueDate: string | null;
  reminderStartDate: number | null;
  reminderEndDate: number | null;
}

export interface ICardObject {
  [id: string]: ICard;
}

export interface IUpdateCard {
  content?: string;
  tags?: string[];
  status?: cardStatus;
  isArchived?: boolean;
  isTransformed?: boolean;
  isImportant?: boolean;
  updatedTime?: string;
  dueDate?: string | null;
  reminderStartDate?: number | null;
  reminderEndDate?: number | null;
}

interface ICardsTypeService {
  getAllCards: () => ICard[];
  getTodoAllCards: () => ICard[];
  getTodoTodayCards: () => ICard[];
  getTodoTomorrowCards: () => ICard[];
  getTodoThisWeekCards: () => ICard[];
  getTodoCompletedCards: () => ICard[];
  getIdeaAllCards: () => ICard[];
  getIdeaThisWeekCards: () => ICard[];
  getActionAllCards: () => ICard[];
  getActionExpiredCards: () => ICard[];
  getActionTodoCards: () => ICard[];
  getExecutedActionCards: () => ICard[];
  getActionArchiveCards: () => ICard[];
}

interface ICardService {
  getAllTags: string[];
  getFilteredCardsWith: (cardsType: CardsType) => ICard[];
  addCard: (newCard: NewCard, updateCard?: IUpdateCard) => void;
  deleteCard: (id: string) => void;
  updateCard: (id: string, updateCard: IUpdateCard) => void;
}

interface IFirebaseService {
  initActiveCards: () => void;
  updateCardToFirebase: (cardId: string, card: IUpdateCard) => void;
  addCardToFireStore: (card: ICard, updateCard?: IUpdateCard) => void;
  getArchivedCards: () => void;
  getExecutedActionCards: () => void;
  deleteCardFromFireStore: (cardId: string) => void;
}

/* ===============================
===========  NewCard  ============
=============================== */

export class NewCard implements ICard {
  id: string;
  content: string;
  tags: string[];
  status: cardStatus;
  isArchived: boolean = false;
  isTransformed: boolean = false;
  isImportant: boolean = false;
  serverTimestamp: FieldValue;
  createdTime: string;
  updatedTime: string;
  dueDate: string | null;
  reminderStartDate: number | null = null;
  reminderEndDate: number | null = null;

  constructor(content: string, tags: string[], status: cardStatus) {
    const currentDate = new Date().toISOString();
    this.id = nanoid();
    this.content = content;
    this.tags = tags[0] ? tags : [];
    this.status = status;
    this.serverTimestamp = serverTimestamp();
    this.createdTime = currentDate;
    this.updatedTime = currentDate;
    this.dueDate = status === "todo" ? currentDate : null;
  }
}

/* ===============================
=======  CardsTypeService  =======
=============================== */

class CardsTypeService implements ICardsTypeService {
  private getSortedCardsByOrderList() {
    const sortedCards: ICard[] = [];
    cardStore.cardOrderList.forEach((id) => {
      if (cardStore.cards.hasOwnProperty(id))
        sortedCards.push(cardStore.cards[id]);
    });
    return sortedCards;
  }

  getAllCards() {
    return this.getSortedCardsByOrderList();
  }

  getTodoAllCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    const cards = sortedCards.filter(
      (card) =>
        (card.status === "todo" ||
          (card.status === "action" && card.dueDate)) &&
        !card.isArchived,
    );
    const sortedCardsDesc = cardUtils.sortCardsDescBy("dueDate", cards);
    return sortedCardsDesc;
  }

  getTodoTodayCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter((card) => {
      if (!card.dueDate) return false;
      return (
        (card.status === "todo" || card.status === "action") &&
        cardUtils.isToday(card.dueDate) &&
        !card.isArchived
      );
    });
  }

  getTodoTomorrowCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter((card) => {
      if (!card.dueDate) return false;
      return (
        (card.status === "todo" || card.status === "action") &&
        cardUtils.isTomorrow(card.dueDate) &&
        !card.isArchived
      );
    });
  }

  getTodoThisWeekCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    const cards = sortedCards.filter((card) => {
      if (!card.dueDate) return false;
      return (
        (card.status === "todo" || card.status === "action") &&
        cardUtils.isThisWeek(card.dueDate) &&
        !card.isArchived
      );
    });
    const sortedCardsDesc = cardUtils.sortCardsDescBy("dueDate", cards);
    return sortedCardsDesc;
  }

  getTodoCompletedCards() {
    return cardStore.archivedCards.filter((card) => {
      return (
        (card.status === "todo" || card.status === "execute") && card.isArchived
      );
    });
  }

  getIdeaAllCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    const cards = sortedCards.filter(
      (card) => card.status === "idea" && !card.isArchived,
    );
    const sortedCardsDesc = cardUtils.sortCardsDescBy("createdTime", cards);
    return sortedCardsDesc;
  }

  getIdeaThisWeekCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    const cards = sortedCards.filter((card) => {
      return (
        card.status === "idea" &&
        cardUtils.isThisWeek(card.createdTime) &&
        !card.isArchived
      );
    });
    const sortedCardsDesc = cardUtils.sortCardsDescBy("createdTime", cards);
    return sortedCardsDesc;
  }

  getActionAllCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter(
      (card) => card.status === "action" && !card.dueDate && !card.isArchived,
    );
  }

  getActionExpiredCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter(
      (card) =>
        card.status === "action" &&
        card.dueDate &&
        cardUtils.isExceedToday(card.dueDate) &&
        !card.isArchived,
    );
  }

  getActionTodoCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter(
      (card) => card.status === "action" && card.dueDate && !card.isArchived,
    );
  }

  getExecutedActionCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    const justArchived = sortedCards.filter(
      (card) => card.status === "execute",
    );
    const hasArchived = cardStore.archivedCards.filter(
      (card) => card.status === "execute",
    );
    return [...justArchived, ...hasArchived];
  }

  getActionArchiveCards() {
    return cardStore.archivedCards.filter((card) => card.status === "action");
  }
}

/* ===============================
=========  CardService  ==========
=============================== */

class CardService implements ICardService {
  private cardsTypeService: CardsTypeService;

  private getSortedCardsByOrderList() {
    const sortedCards: ICard[] = [];
    cardStore.cardOrderList.forEach((id) => {
      if (cardStore.cards.hasOwnProperty(id))
        sortedCards.push(cardStore.cards[id]);
    });
    return sortedCards;
  }

  constructor(cardsTypeService: CardsTypeService) {
    this.cardsTypeService = cardsTypeService;
  }

  get getAllTags() {
    const sortedCards = this.getSortedCardsByOrderList();
    const tags = sortedCards.map((card) => card.tags).flat() || [];
    if (!tags) return [];
    return [...new Set(tags)];
  }

  getFilteredCardsWith(cardSType: CardsType) {
    switch (cardSType) {
      case CardsType.All:
        return this.cardsTypeService.getAllCards();
      case CardsType.TodoAll:
        return this.cardsTypeService.getTodoAllCards();
      case CardsType.TodoToday:
        return this.cardsTypeService.getTodoTodayCards();
      case CardsType.TodoTomorrow:
        return this.cardsTypeService.getTodoTomorrowCards();
      case CardsType.TodoThisWeek:
        return this.cardsTypeService.getTodoThisWeekCards();
      case CardsType.TodoComplete:
        return this.cardsTypeService.getTodoCompletedCards();
      case CardsType.IdeaAll:
        return this.cardsTypeService.getIdeaAllCards();
      case CardsType.IdeaThisWeek:
        return this.cardsTypeService.getIdeaThisWeekCards();
      case CardsType.ActionAll:
        return this.cardsTypeService.getActionAllCards();
      case CardsType.ActionTodo:
        return this.cardsTypeService.getActionTodoCards();
      case CardsType.ActionExpired:
        return this.cardsTypeService.getActionExpiredCards();
      case CardsType.ExecutedAction:
        return this.cardsTypeService.getExecutedActionCards();
      case CardsType.ActionArchive:
        return this.cardsTypeService.getActionArchiveCards();
      default:
        return [];
    }
  }

  addCard(newCard: NewCard, updateCard?: IUpdateCard) {
    const updatedCard = { ...newCard, ...updateCard };
    runInAction(() => {
      cardStore.cards[newCard.id] = updatedCard;
      cardStore.cardOrderList.unshift(newCard.id);
    });
  }

  updateCard(id: string, updateCard: IUpdateCard) {
    const card = cardStore.cards[id];
    if (!card) return;
    const updatedTime = new Date().toISOString();
    const updatedCard = { ...card, ...updateCard, updatedTime };
    runInAction(() => (cardStore.cards[id] = updatedCard));
  }

  deleteCard(id: string) {
    runInAction(() => {
      delete cardStore.cards[id];
      cardStore.cardOrderList = cardStore.cardOrderList.filter(
        (cardId) => cardId !== id,
      );
    });
  }
}

/* ===============================
=======  FirebaseService  ========
=============================== */

class FirebaseService implements IFirebaseService {
  private async getCardOrderList() {
    const uid = cookie.getCookie("uid");
    if (!uid) return;
    const cardsOrderListRef = doc(db, "user_cards", uid);
    return onSnapshot(cardsOrderListRef, (doc) => {
      const cardOrderList = doc.data()?.cardOrderList || [];
      runInAction(() => (cardStore.cardOrderList = cardOrderList));
    });
  }

  private async getActiveCards() {
    const uid = cookie.getCookie("uid");
    if (!uid) return;
    const cardsRef = collection(db, "user_cards", uid, "cards");
    const queryArchived = where("isArchived", "==", false);
    const q = query(cardsRef, queryArchived);

    return onSnapshot(q, (querySnapshot) => {
      const cards: ICardObject = {};
      querySnapshot.forEach((doc) => {
        cards[doc.id] = doc.data() as ICard;
      });
      runInAction(() => (cardStore.cards = cards || []));
    });
  }

  async initActiveCards() {
    try {
      await this.getCardOrderList();
      await this.getActiveCards();
    } catch (error) {
      console.error(error);
    }
  }

  async getArchivedCards() {
    try {
      const uid = cookie.getCookie("uid");
      if (!uid) return;

      const cardsRef = collection(db, "user_cards", uid, "cards");
      const queryActive = where("isArchived", "==", true);
      const q = query(cardsRef, queryActive);

      return onSnapshot(q, (querySnapshot) => {
        const archivedCards: ICard[] = [];
        querySnapshot.forEach((doc) => archivedCards.push(doc.data() as ICard));
        runInAction(() => (cardStore.archivedCards = archivedCards || []));
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getExecutedActionCards() {
    const uid = cookie.getCookie("uid");
    if (!uid) return;
    const cardsRef = collection(db, "user_cards", uid, "cards");
    const oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    const serverTimestamp = Timestamp.fromDate(new Date(oneWeekAgo));
    const q = query(cardsRef, where("serverTimestamp", ">=", serverTimestamp));

    return onSnapshot(q, (querySnapshot) => {
      const executedActionCards: ICard[] = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().status !== "execute") return;
        if (doc.data().isArchived !== true) return;
        executedActionCards.push(doc.data() as ICard);
      });
      runInAction(() => {
        cardStore.executedActionCards = executedActionCards || [];
      });
    });
  }

  async addCardToFireStore(card: ICard, updateCard?: IUpdateCard) {
    try {
      if (!authStore.uid) return;
      const cardsRef = doc(db, "user_cards", authStore.uid, "cards", card.id);
      const cardOrderListRef = doc(db, "user_cards", authStore.uid);
      await setDoc(cardsRef, Object.assign({}, { ...card, ...updateCard }), {
        merge: true,
      });
      await setDoc(cardOrderListRef, {
        cardOrderList: [...cardStore.cardOrderList],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateCardToFirebase(cardId: string, updateCard: IUpdateCard) {
    try {
      if (!authStore.uid) return;
      const cardsRef = doc(db, "user_cards", authStore.uid, "cards", cardId);
      await setDoc(cardsRef, { ...updateCard }, { merge: true });
    } catch (error) {
      console.error("update_card_error", error);
    }
  }

  async deleteCardFromFireStore(cardId: string) {
    try {
      if (!authStore.uid) return;
      const cardsRef = doc(db, "user_cards", authStore.uid, "cards", cardId);
      await deleteDoc(cardsRef);
    } catch (error) {
      console.error(error);
    }
  }
}

/* ===============================
==========  CardStore  ===========
=============================== */

class CardStore {
  private cardService: CardService;
  private firebaseService: FirebaseService;
  cardOrderList: string[] = [];
  cards: ICardObject = {};
  archivedCards: ICard[] = [];
  executedActionCards: ICard[] = [];

  constructor(cardService: CardService, firebaseService: FirebaseService) {
    makeAutoObservable(this);
    this.cardService = cardService;
    this.firebaseService = firebaseService;
  }

  initActiveCards() {
    this.firebaseService.initActiveCards();
  }

  getArchivedCards() {
    this.firebaseService.getArchivedCards();
  }

  async getExecutedActionCards() {
    this.firebaseService.getExecutedActionCards();
  }

  async updateCardToFirebase(cardId: string, updateCard: IUpdateCard) {
    this.firebaseService.updateCardToFirebase(cardId, updateCard);
  }

  async addCardToFireStore(card: ICard, updateCard?: IUpdateCard) {
    this.firebaseService.addCardToFireStore(card, updateCard);
  }

  async deleteCardFromFireStore(cardId: string) {
    this.firebaseService.deleteCardFromFireStore(cardId);
  }

  get getAllTags() {
    return this.cardService.getAllTags;
  }

  getFilteredCardsWith(cardsType: CardsType) {
    return this.cardService.getFilteredCardsWith(cardsType);
  }

  addCard(newCard: NewCard, updateCard?: IUpdateCard) {
    this.cardService.addCard(newCard, updateCard);
  }

  updateCard(id: string, updateCard: IUpdateCard) {
    this.cardService.updateCard(id, updateCard);
  }

  deleteCard(id: string) {
    this.cardService.deleteCard(id);
  }
}

const cardsTypeService = new CardsTypeService();
const cardService = new CardService(cardsTypeService);
const firebaseService = new FirebaseService();
export const cardStore = new CardStore(cardService, firebaseService);

// interface UserSettings {
//   user_id: {
//     score: number; // 100
//     favoriteIdeaTags: string[]; // "work", "study"
//     favoriteActionTags: string[]; // "work", "study"
//     favoriteTodoTags: string[]; // "work", "study"
//     ideaDailyReminders: string[]; // "9:00", "12:00", "15:00", "18:00", "21:00"
//     startDayOfWeek: string; // "MON", "SUN"
//     defaultDueDate: number; // 1 (意指明天)
//     sortTypeOfAllIdeas:
//       | "asc"
//       | "desc"
//       | "ascCreatedTime"
//       | "descCreatedTime"
//       | "ascModifiedTime"
//       | "descModifiedTime"
//       | "custom";
//     sortTypeOfAllActions:
//       | "asc"
//       | "desc"
//       | "ascCreatedTime"
//       | "descCreatedTime"
//       | "ascModifiedTime"
//       | "descModifiedTime";
//     sortTypeOfAllTasks:
//       | "asc"
//       | "desc"
//       | "ascCreatedTime"
//       | "descCreatedTime"
//       | "ascModifiedTime"
//       | "descModifiedTime"
//       | "ascDueDate"
//       | "descDueDate";
//     sortTypeOfAllReminders: string; // "asc", "desc"
//     sortTypeOfTodayTasks: string; // "asc", "desc"
//     sortTypeOfTomorrowTasks: string; // "asc", "desc"
//   };
// }
