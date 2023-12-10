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

export interface INewNoteObject {
  [id: string]: NewNote;
}

interface ICardService {
  getAllTags: string[];
  getFilteredCardsWith: (cardsStrategy: CardsStrategy) => ICard[];
  getNoteWithId: (noteId: string) => NewNote;
  addCard: (newCard: NewCard, updateCard?: Partial<ICard>) => void;
  addNote: (newNote: NewNote, updateNote?: Partial<ICard>) => void;
  deleteCard: (id: string) => void;
  updateCard: (id: string, updateCard: Partial<ICard>) => void;
}

interface IFirebaseService {
  initActiveCards: () => void;
  getArchivedCards: () => void;
  getExecutedActionCards: () => void;
  updateCardToFirebase: (cardId: string, card: Partial<ICard>) => void;
  addCardToFireStore: (card: ICard, updateCard?: Partial<ICard>) => void;
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

export class NewNote extends NewCard {
  noteTitle: string = "";
  noteHTML: string = "";

  constructor(
    noteTitle: string,
    content: string,
    noteHTML: string,
    tags: string[],
    status: cardStatus = "note",
  ) {
    super(content, tags, status);
    this.noteTitle = noteTitle;
    this.noteHTML = noteHTML;
  }
}

/* ===============================
========  CardsStrategy  =========
=============================== */

interface ICardsStrategy {
  getCards: (cardStore: CardStore) => ICard[] | NewNote[];
}

abstract class CardsStrategy implements ICardsStrategy {
  public cardStore: CardStore;

  constructor() {
    this.cardStore = cardStore;
  }

  getSortedCardsByOrderList() {
    return cardUtils.getSortedCardsByOrderList(
      this.cardStore.cardOrderList,
      this.cardStore.cards,
    );
  }

  getCards() {
    this.cardStore = cardStore;
    // 這裡的 getCards() 會被子類別覆寫，預設回傳全部的卡片
    return this.getSortedCardsByOrderList();
  }
}

export class AllCards extends CardsStrategy {
  getCards() {
    return this.getSortedCardsByOrderList();
  }
}

export class TodoAllCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList().filter(
      (card) =>
        (card.status === "todo" || card.status === "action") &&
        card.dueDate &&
        !card.isArchived,
    );
    const descSortedCards = cardUtils.sortCardsDescBy("dueDate", sortedCards);
    return descSortedCards;
  }
}

export class TodoTodayCards extends CardsStrategy {
  getCards() {
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
}

export class TodoTomorrowCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter((card) => {
      if (!card.dueDate) return false;
      return (
        card.status === "todo" &&
        cardUtils.isTomorrow(card.dueDate) &&
        !card.isArchived
      );
    });
  }
}

export class TodoThisWeekCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    const cards = sortedCards.filter((card) => {
      if (!card.dueDate) return false;
      return (
        card.status === "todo" &&
        cardUtils.isThisWeek(card.dueDate) &&
        !card.isArchived
      );
    });
    const sortedCardsDesc = cardUtils.sortCardsDescBy("dueDate", cards);
    return sortedCardsDesc;
  }
}

export class TodoCompletedCards extends CardsStrategy {
  getCards() {
    return this.cardStore.archivedCards.filter(
      (card) => card.status === "todo" && card.isArchived,
    );
  }
}

export class IdeaAllCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter(
      (card) => card.status === "idea" && !card.isArchived,
    );
  }
}

export class IdeaTodayCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter((card) => {
      return (
        card.status === "idea" &&
        cardUtils.isToday(card.createdTime) &&
        !card.isArchived
      );
    });
  }
}

export class IdeaThisWeekCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter((card) => {
      return (
        card.status === "idea" &&
        cardUtils.isThisWeek(card.createdTime) &&
        !card.isArchived
      );
    });
  }
}

export class ActionAllCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter(
      (card) => card.status === "action" && !card.dueDate && !card.isArchived,
    );
  }
}

export class ActionExpiredCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    if (sortedCards.length === 0) return [];
    return sortedCards.filter(
      (card) =>
        card.status === "action" &&
        card.dueDate &&
        cardUtils.isExceedToday(card.dueDate) &&
        !card.isArchived,
    );
  }
}

export class ActionTodoCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    const cards = sortedCards.filter(
      (card) => card.status === "action" && card.dueDate && !card.isArchived,
    );
    const sortedCardsDesc = cardUtils.sortCardsDescBy("dueDate", cards);
    return sortedCardsDesc;
  }
}

export class TodoAndActionTomorrowCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    const isDateTomorrow = (dueDate: string | null) => {
      if (!dueDate) return null;
      return cardUtils.isTomorrow(dueDate);
    };
    return sortedCards.filter(
      (card) =>
        (card.status === "todo" || card.status === "action") &&
        isDateTomorrow(card.dueDate) &&
        !card.isArchived,
    );
  }
}

export class ActionExecutedCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    const justArchived = sortedCards.filter(
      (card) => card.status === "execute",
    );
    const hasArchived = this.cardStore.archivedCards.filter(
      (card) => card.status === "execute",
    );
    return [...justArchived, ...hasArchived];
  }
}

export class ActionArchiveCards extends CardsStrategy {
  getCards() {
    return this.cardStore.archivedCards.filter(
      (card) => card.status === "action",
    );
  }
}

export class NotesAllCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter((card) => card.status === "note");
  }
}

/* ===============================
=========  CardService  ==========
=============================== */

class CardService implements ICardService {
  public cardStore: CardStore;

  constructor(cardStore: CardStore) {
    this.cardStore = cardStore;
  }

  private getSortedCardsByOrderList() {
    const sortedCards: ICard[] = [];
    this.cardStore.cardOrderList.forEach((id) => {
      if (this.cardStore.cards.hasOwnProperty(id))
        sortedCards.push(this.cardStore.cards[id]);
    });
    return sortedCards;
  }

  get getAllTags() {
    const sortedCards = this.getSortedCardsByOrderList();
    const tags = sortedCards.map((card) => card.tags).flat() || [];
    if (!tags) return [];
    return [...new Set(tags)];
  }

  getFilteredCardsWith(cardStrategy: CardsStrategy) {
    return cardStrategy.getCards();
  }

  getNoteWithId(noteId: string) {
    return this.cardStore.cards[noteId] as NewNote;
  }

  addCard(newCard: NewCard, updateCard?: Partial<ICard>) {
    const updatedCard = { ...newCard, ...updateCard };
    runInAction(() => {
      this.cardStore.cards[newCard.id] = updatedCard;
      this.cardStore.cardOrderList.unshift(newCard.id);
    });
  }

  addNote(newNote: NewNote, updateNote?: Partial<ICard>) {
    const updatedNote = { ...newNote, ...updateNote };
    runInAction(() => {
      this.cardStore.cards[newNote.id] = updatedNote;
      this.cardStore.cardOrderList.unshift(newNote.id);
    });
  }

  updateCard(id: string, updateCard: Partial<ICard>) {
    const card = this.cardStore.cards[id];
    if (!card) return;
    const updatedTime = new Date().toISOString();
    const updatedCard = { ...card, ...updateCard, updatedTime };
    runInAction(() => (this.cardStore.cards[id] = updatedCard));
  }

  updateNote(id: string, updateNote: Partial<NewNote>) {
    const card = cardStore.cards[id];
    if (!card) return;
    const updatedTime = new Date().toISOString();
    const updatedNote = { ...card, ...updateNote, updatedTime };
    runInAction(() => (cardStore.cards[id] = updatedNote));
  }

  deleteCard(id: string) {
    runInAction(() => {
      delete this.cardStore.cards[id];
      this.cardStore.cardOrderList = this.cardStore.cardOrderList.filter(
        (cardId) => cardId !== id,
      );
    });
  }

  updateCardOrderList(cardOrderList: string[]) {
    runInAction(() => (this.cardStore.cardOrderList = cardOrderList));
  }
}

/* ===============================
=======  FirebaseService  ========
=============================== */

class FirebaseService implements IFirebaseService {
  public cardStore: CardStore;

  constructor(cardStore: CardStore) {
    this.cardStore = cardStore;
  }

  private getUid() {
    return authStore.uid || cookie.getCookie("uid");
  }

  private async getCardOrderList() {
    const uid = this.getUid();
    if (!uid) return;

    const cardsOrderListRef = doc(db, "user_cards", uid);
    return onSnapshot(cardsOrderListRef, (doc) => {
      const cardOrderList = doc.data()?.cardOrderList || [];
      runInAction(() => (cardStore.cardOrderList = cardOrderList));
    });
  }

  private async getActiveCards() {
    const uid = this.getUid();
    if (!uid) return;

    const cardsRef = collection(db, "user_cards", uid, "cards");
    const queryArchived = where("isArchived", "==", false);
    const q = query(cardsRef, queryArchived);

    return onSnapshot(q, (querySnapshot) => {
      const cards: ICardObject = {};
      querySnapshot.forEach((doc) => {
        cards[doc.id] = doc.data() as ICard;
      });
      runInAction(() => (this.cardStore.cards = cards || []));
    });
  }

  async initActiveCards() {
    try {
      await this.getCardOrderList();
      await this.getActiveCards();
      runInAction(() => (this.cardStore.isLoaded = true));
    } catch (error) {
      console.error(error);
    }
  }

  async getArchivedCards() {
    try {
      const uid = this.getUid();
      if (!uid) return;

      const cardsRef = collection(db, "user_cards", uid, "cards");
      const queryActive = where("isArchived", "==", true);
      const q = query(cardsRef, queryActive);

      return onSnapshot(q, (querySnapshot) => {
        const archivedCards: ICard[] = [];
        querySnapshot.forEach((doc) => archivedCards.push(doc.data() as ICard));
        runInAction(() => (this.cardStore.archivedCards = archivedCards || []));
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getExecutedActionCards() {
    const uid = this.getUid();
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
        this.cardStore.executedActionCards = executedActionCards || [];
      });
    });
  }

  async addCardToFireStore(card: ICard, updateCard?: Partial<ICard>) {
    try {
      const uid = this.getUid();
      if (!uid) return;

      const cardsRef = doc(db, "user_cards", uid, "cards", card.id);
      const cardOrderListRef = doc(db, "user_cards", uid);
      await setDoc(cardsRef, Object.assign({}, { ...card, ...updateCard }), {
        merge: true,
      });
      await setDoc(cardOrderListRef, {
        cardOrderList: [...this.cardStore.cardOrderList],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addNoteToFireStore(note: NewNote, updateNote?: Partial<NewNote>) {
    try {
      const uid = this.getUid();
      if (!uid) return;

      const cardsRef = doc(db, "user_cards", uid, "cards", note.id);
      const cardOrderListRef = doc(db, "user_cards", uid);
      await setDoc(cardsRef, Object.assign({}, { ...note, ...updateNote }), {
        merge: true,
      });
      await setDoc(cardOrderListRef, {
        cardOrderList: [...this.cardStore.cardOrderList],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateCardToFirebase(cardId: string, updateCard: Partial<ICard>) {
    try {
      const uid = this.getUid();
      if (!uid) return;

      const cardsRef = doc(db, "user_cards", uid, "cards", cardId);
      await setDoc(cardsRef, { ...updateCard }, { merge: true });
    } catch (error) {
      console.error("update_card_error", error);
    }
  }

  async updateNoteToFirebase(noteId: string, updateNote: Partial<NewNote>) {
    try {
      const uid = this.getUid();
      if (!uid) return;

      const cardsRef = doc(db, "user_cards", uid, "cards", noteId);
      await setDoc(cardsRef, { ...updateNote }, { merge: true });
    } catch (error) {
      console.error("update_note_error", error);
    }
  }

  async updateCardOrderListToFirebase(cardOrderList: string[]) {
    try {
      const uid = this.getUid();
      if (!uid) return;

      const cardOrderListRef = doc(db, "user_cards", uid);
      await setDoc(cardOrderListRef, { cardOrderList });
    } catch (error) {
      console.error("updateCardOrderList_error", error);
    }
  }

  async deleteCardFromFireStore(cardId: string) {
    try {
      const uid = this.getUid();
      if (!uid) return;

      const cardsRef = doc(db, "user_cards", uid, "cards", cardId);
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
  isLoaded: boolean = false;
  cardService: CardService;
  firebaseService: FirebaseService;
  cardOrderList: string[] = [];
  cards: ICardObject = {};
  archivedCards: ICard[] = [];
  executedActionCards: ICard[] = [];

  constructor() {
    this.cardService = new CardService(this);
    this.firebaseService = new FirebaseService(this);
    makeAutoObservable(this);
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

  async addCardToFireStore(card: ICard, updateCard?: Partial<ICard>) {
    this.firebaseService.addCardToFireStore(card, updateCard);
  }

  async addNoteToFireStore(note: NewNote, updateNote?: Partial<NewNote>) {
    this.firebaseService.addNoteToFireStore(note, updateNote);
  }

  async updateCardToFirebase(cardId: string, updateCard: Partial<ICard>) {
    this.firebaseService.updateCardToFirebase(cardId, updateCard);
  }

  async updateNoteToFirebase(noteId: string, updateNote: Partial<NewNote>) {
    this.firebaseService.updateNoteToFirebase(noteId, updateNote);
  }

  async deleteCardFromFireStore(cardId: string) {
    this.firebaseService.deleteCardFromFireStore(cardId);
  }

  async updateCardOrderListToFirebase(cardOrderList: string[]) {
    this.firebaseService.updateCardOrderListToFirebase(cardOrderList);
  }

  get getAllTags() {
    return this.cardService.getAllTags;
  }

  getFilteredCardsWith(cardsStrategy: CardsStrategy) {
    return this.cardService.getFilteredCardsWith(cardsStrategy);
  }

  getNoteWithId(noteId: string) {
    return this.cardService.getNoteWithId(noteId);
  }

  addCard(newCard: NewCard, updateCard?: Partial<ICard>) {
    this.cardService.addCard(newCard, updateCard);
  }

  addNote(newNote: NewNote, updateNote?: Partial<ICard>) {
    this.cardService.addNote(newNote, updateNote);
  }

  updateCard(id: string, updateCard: Partial<ICard>) {
    this.cardService.updateCard(id, updateCard);
  }

  updateNote(id: string, updateNote: Partial<NewNote>) {
    this.cardService.updateNote(id, updateNote);
  }

  deleteCard(id: string) {
    this.cardService.deleteCard(id);
  }

  updateCardOrderList(cardOrderList: string[]) {
    this.cardService.updateCardOrderList(cardOrderList);
  }
}

export const cardStore = new CardStore();
