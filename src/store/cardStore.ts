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
  getTodoAllCards: () => ICard[];
  getTodoTodayCards: () => ICard[];
  getTodoTomorrowCards: () => ICard[];
  getTodoThisWeekCards: () => ICard[];
  getTodoCompletedCards: () => ICard[];
  getIdeaAllCards: () => ICard[];
  getIdeaThisWeekCards: () => ICard[];
}

interface ICardService {
  getAllTags: string[];
  getFilteredCardsWith: (cardsType: CardsType) => ICard[];
  addCard: (newCard: NewCard, updateCard?: IUpdateCard) => void;
  deleteCard: (id: string) => void;
  deleteCardTag: (id: string, tag: string) => void;
}

interface IFirebaseService {
  initActiveCards: () => void;
  updateCardToFirebase: (cardId: string, card: IUpdateCard) => void;
  addCardToFireStore: (card: ICard) => void;
  getArchivedCards: () => void;
}

/* ===============================
==========  Implement  ===========
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

class CardsTypeService implements ICardsTypeService {
  getAllCards() {
    return cardStore.cards;
  }

  getTodoAllCards() {
    const cards = cardStore.cards.filter(
      (card) =>
        (card.status === "todo" || card.status === "action") &&
        !card.isArchived,
    );
    const sortedCardsDesc = cardUtils.sortCardsByDueDateDesc(cards);
    return sortedCardsDesc;
  }

  getTodoTodayCards() {
    return cardStore.cards.filter((card) => {
      if (!card.dueDate) return false;
      return (
        (card.status === "todo" || card.status === "action") &&
        cardUtils.isToday(card.dueDate) &&
        !card.isArchived
      );
    });
  }

  getTodoTomorrowCards() {
    return cardStore.cards.filter((card) => {
      if (!card.dueDate) return false;
      return (
        (card.status === "todo" || card.status === "action") &&
        cardUtils.isTomorrow(card.dueDate) &&
        !card.isArchived
      );
    });
  }

  getTodoThisWeekCards() {
    return cardStore.cards.filter((card) => {
      if (!card.dueDate) return false;
      return (
        (card.status === "todo" || card.status === "action") &&
        cardUtils.isThisWeek(card.dueDate) &&
        !card.isArchived
      );
    });
  }

  getTodoCompletedCards() {
    return cardStore.archivedCards.filter((card) => {
      return (
        (card.status === "todo" || card.status === "execute") && card.isArchived
      );
    });
  }

  getIdeaAllCards() {
    return cardStore.cards.filter(
      (card) => card.status === "idea" && !card.isArchived,
    );
  }

  getIdeaThisWeekCards() {
    return cardStore.cards.filter((card) => {
      return (
        card.status === "idea" &&
        cardUtils.isThisWeek(card.createdTime) &&
        !card.isArchived
      );
    });
  }

  getActionAllCards() {
    return cardStore.cards.filter(
      (card) => card.status === "action" && !card.dueDate && !card.isArchived,
    );
  }

  getActionTodoCards() {
    return cardStore.cards.filter(
      (card) => card.status === "action" && card.dueDate && !card.isArchived,
    );
  }

  getExecutedActionCards() {
    return cardStore.archivedCards.filter((card) => card.status === "execute");
  }
}

class CardService implements ICardService {
  private cardsTypeService: CardsTypeService;

  constructor(cardsTypeService: CardsTypeService) {
    this.cardsTypeService = cardsTypeService;
  }

  get getAllTags() {
    const tags = cardStore.cards.map((card) => card.tags).flat() || [];
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
      case CardsType.ExecutedAction:
        return this.cardsTypeService.getExecutedActionCards();
      default:
        return [];
    }
  }

  addCard(newCard: NewCard, updateCard?: IUpdateCard) {
    cardStore.cards.unshift({ ...newCard, ...updateCard });
  }

  updateCard(id: string, updateCard: IUpdateCard) {
    const updatedTime = new Date().toISOString();
    cardStore.cards = cardStore.cards.map((card) => {
      if (card.id === id) return { ...card, ...updateCard, updatedTime };
      return card;
    });
  }

  deleteCard(id: string) {
    cardStore.cards = cardStore.cards.filter((card) => card.id !== id);
  }

  deleteCardTag(id: string, tag: string) {
    cardStore.cards = cardStore.cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          tags: card.tags.filter((item) => item !== tag),
        };
      }
      return card;
    });
  }
}

class FirebaseService implements IFirebaseService {
  private getLocalCards() {
    const localCards = JSON.parse(localStorage.getItem("cards") || "");
    if (localCards) runInAction(() => (cardStore.cards = localCards));
  }

  async initActiveCards() {
    try {
      const uid = authStore.uid;
      if (!uid) return;

      this.getLocalCards();

      const cardsRef = collection(db, "user_cards", uid, "cards");
      const queryArchived = where("isArchived", "==", false);
      const q = query(cardsRef, queryArchived);

      return onSnapshot(q, (querySnapshot) => {
        const cards: ICard[] = [];
        querySnapshot.forEach((doc) => cards.push(doc.data() as ICard));
        localStorage.setItem("cards", JSON.stringify(cards || []));
        runInAction(() => (cardStore.cards = cards || []));
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getArchivedCards() {
    try {
      const uid = cookie.getCookie("uid");
      if (!uid) return;

      const cardsRef = collection(db, "user_cards", uid, "cards");
      const q = query(cardsRef, where("isArchived", "==", true));

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

  async updateCardToFirebase(cardId: string, updateCard: IUpdateCard) {
    try {
      if (!authStore.uid) return;
      const cardsRef = doc(db, "user_cards", authStore.uid, "cards", cardId);
      await setDoc(cardsRef, { ...updateCard }, { merge: true });
    } catch (error) {
      console.error("update_card_error", error);
    }
  }

  async addCardToFireStore(card: ICard) {
    try {
      if (!authStore.uid) return;
      const cardsRef = doc(db, "user_cards", authStore.uid, "cards", card.id);
      await setDoc(cardsRef, Object.assign({}, card), { merge: true });
    } catch (error) {
      console.error(error);
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
  cards: ICard[] = [];
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

  async addCardToFireStore(card: ICard) {
    this.firebaseService.addCardToFireStore(card);
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

  deleteCardTag(id: string, tag: string) {
    this.cardService.deleteCardTag(id, tag);
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
