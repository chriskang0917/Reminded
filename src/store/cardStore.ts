import {
  FieldValue,
  Timestamp,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { db } from "../config/firebase";
import { NewCard } from "../models/NewCard";
import { NewNote } from "../models/NewNote";
import { cardUtils } from "../utils/cardUtils";
import { database, getUid } from "../utils/database";
import { debounceCardsOrderList } from "../utils/debounce";
import { local } from "../utils/local";

export type cardStatus = "idea" | "action" | "todo" | "note" | "execute";

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
  getAllTags: () => string[];
  getFilteredCardsWith: (cardsStrategy: CardsStrategy) => ICard[];
  getNoteWithId: (noteId: string) => NewNote;
  addCard: (newCard: NewCard, updateCard?: Partial<ICard>) => void;
  addNote: (newNote: NewNote, updateNote?: Partial<ICard>) => void;
  deleteCard: (id: string) => void;
  updateCard: (id: string, updateCard: Partial<ICard>) => void;
  updateNote: (id: string, updateNote: Partial<NewNote>) => void;
  updateCardOrderList: (cardOrderList: string[]) => void;
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

  protected getSortedCardsByOrderList() {
    return cardUtils.getSortedCardsByOrderList(
      this.cardStore.cardOrderList,
      this.cardStore.cards,
    );
  }

  getCards() {
    this.cardStore = cardStore;
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
    const sortedCards = this.getSortedCardsByOrderList().filter((card) => {
      const isDueAction = card.dueDate && card.status === "action";
      return (isDueAction || card.status === "todo") && !card.isArchived;
    });
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
      const isTodoOrAction = card.status === "todo" || card.status === "action";
      const isThisWeek = cardUtils.isThisWeek(card.dueDate);

      return isTodoOrAction && isThisWeek && !card.isArchived;
    });
    const sortedCardsDesc = cardUtils.sortCardsDescBy("dueDate", cards);
    return sortedCardsDesc;
  }
}

export class TodoExpiredCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    if (sortedCards.length === 0) return [];
    return sortedCards.filter((card) => {
      if (!card.dueDate) return false;
      const isExceedToday = cardUtils.isExceedToday(card.dueDate);
      const isTodoOrAction = card.status === "todo" || card.status === "action";

      return isTodoOrAction && isExceedToday && !card.isArchived;
    });
  }
}

export class TodoCompletedCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    const totalCards = [...sortedCards, ...this.cardStore.archivedCards];
    const filteredCards = totalCards.filter((card) => {
      const isTodoOrExecute =
        card.status === "todo" || card.status === "execute";
      return isTodoOrExecute && card.isArchived;
    });
    const sortedCardsDesc = cardUtils.sortCardsDescBy("dueDate", filteredCards);
    return sortedCardsDesc;
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
      const isToday = cardUtils.isToday(card.createdTime);
      return card.status === "idea" && isToday && !card.isArchived;
    });
  }
}

export class IdeaThisWeekCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter((card) => {
      const isThisWeek = cardUtils.isThisWeek(card.createdTime);
      return card.status === "idea" && isThisWeek && !card.isArchived;
    });
  }
}

export class ActionAllCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    return sortedCards.filter((card) => {
      return card.status === "action" && !card.dueDate && !card.isArchived;
    });
  }
}

export class ActionExpiredCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    if (sortedCards.length === 0) return [];
    return sortedCards.filter((card) => {
      if (!card.dueDate) return false;
      const isExceedToday = cardUtils.isExceedToday(card.dueDate);
      return card.status === "action" && isExceedToday && !card.isArchived;
    });
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
    const justArchived = sortedCards.filter((card) => {
      return card.status === "execute";
    });
    const hasArchived = this.cardStore.archivedCards.filter((card) => {
      return card.status === "execute";
    });
    return [...justArchived, ...hasArchived];
  }
}

export class ActionArchiveCards extends CardsStrategy {
  getCards() {
    const sortedCards = this.getSortedCardsByOrderList();
    const justArchived = sortedCards.filter((card) => {
      return card.status === "action" && card.isArchived;
    });
    const hasArchived = this.cardStore.archivedCards.filter((card) => {
      return card.status === "action";
    });
    const sortedCardsDesc = cardUtils.sortCardsDescBy("updatedTime", [
      ...justArchived,
      ...hasArchived,
    ]);
    return sortedCardsDesc;
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

  public getAllTags() {
    const sortedCards = this.getSortedCardsByOrderList();
    const tags = sortedCards.map((card) => card.tags).flat() || [];
    if (!tags) return [];
    return [...new Set(tags)];
  }

  public getFilteredCardsWith(cardStrategy: CardsStrategy) {
    return cardStrategy.getCards();
  }

  public getNoteWithId(noteId: string) {
    return this.cardStore.cards[noteId] as NewNote;
  }

  public addCard(newCard: NewCard, updateCard?: Partial<ICard>) {
    const updatedCard = { ...newCard, ...updateCard };
    runInAction(() => {
      this.cardStore.cards[newCard.id] = updatedCard;
      this.cardStore.cardOrderList.unshift(newCard.id);
    });
    local.set("cardOrderList", this.cardStore.cardOrderList);
  }

  public addNote(newNote: NewNote, updateNote?: Partial<ICard>) {
    const updatedNote = { ...newNote, ...updateNote };
    runInAction(() => {
      this.cardStore.cards[newNote.id] = updatedNote;
      this.cardStore.cardOrderList.unshift(newNote.id);
    });
    local.set("cardOrderList", this.cardStore.cardOrderList);
  }

  public updateCard(id: string, updateCard: Partial<ICard>) {
    const card = this.cardStore.cards[id];
    if (!card) return;
    const updatedTime = new Date().toISOString();
    const updatedCard = { ...card, ...updateCard, updatedTime };
    runInAction(() => (this.cardStore.cards[id] = updatedCard));
  }

  public updateNote(id: string, updateNote: Partial<NewNote>) {
    const card = cardStore.cards[id];
    if (!card) return;
    const updatedTime = new Date().toISOString();
    const updatedNote = { ...card, ...updateNote, updatedTime };
    runInAction(() => (cardStore.cards[id] = updatedNote));
  }

  public deleteCard(id: string) {
    runInAction(() => {
      delete this.cardStore.cards[id];
      this.cardStore.cardOrderList = this.cardStore.cardOrderList.filter(
        (cardId) => cardId !== id,
      );
    });
    local.set("cardOrderList", this.cardStore.cardOrderList);
  }

  public updateCardOrderList(cardOrderList: string[]) {
    runInAction(() => (this.cardStore.cardOrderList = cardOrderList));
    local.set("cardOrderList", this.cardStore.cardOrderList);
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

  public async initActiveCards() {
    try {
      await this.getCardOrderList();
      await this.getActiveCards();
      runInAction(() => (this.cardStore.isLoaded = true));
    } catch (error) {
      console.error(error);
    }
  }

  private async getCardOrderList() {
    const uid = getUid();
    if (!uid) return;

    const cardOrderList = local.get("cardOrderList");
    if (cardOrderList) {
      database.setDoc(undefined, { cardOrderList });
      return runInAction(() => (this.cardStore.cardOrderList = cardOrderList));
    }
    const data = await database.getDoc();
    if (!data?.cardOrderList) return local.set("cardOrderList", []);

    runInAction(() => {
      const cardOrderList = data?.cardOrderList || [];
      this.cardStore.cardOrderList = cardOrderList;
      local.set("cardOrderList", cardOrderList);
    });
  }

  private async getActiveCards() {
    const uid = getUid();
    if (!uid) return;
    return onSnapshot(this.getCardsQueryWith("active"), (querySnapshot) => {
      const cards: ICardObject = {};
      querySnapshot.forEach((doc) => (cards[doc.id] = doc.data() as ICard));
      runInAction(() => (this.cardStore.cards = cards || []));
    });
  }

  public async getArchivedCards() {
    try {
      const uid = getUid();
      if (!uid) return;
      return onSnapshot(this.getCardsQueryWith("archived"), (querySnapshot) => {
        const archivedCards: ICard[] = [];
        querySnapshot.forEach((doc) => archivedCards.push(doc.data() as ICard));
        runInAction(() => (this.cardStore.archivedCards = archivedCards || []));
      });
    } catch (error) {
      console.error(error);
    }
  }

  private getCardsQueryWith(status: "active" | "archived") {
    const statusMapper = { active: false, archived: true };
    const cardsRef = collection(db, "user_cards", getUid(), "cards");
    const queryArchived = where("isArchived", "==", statusMapper[status]);
    return query(cardsRef, queryArchived);
  }

  public async getExecutedActionCards() {
    const uid = getUid();
    if (!uid) return;

    return onSnapshot(this.getOneWeekCardsQuery(), (querySnapshot) => {
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

  private getOneWeekCardsQuery() {
    const oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    const serverTimestamp = Timestamp.fromDate(new Date(oneWeekAgo));
    const q = query(
      collection(db, "user_cards", getUid(), "cards"),
      where("serverTimestamp", ">=", serverTimestamp),
    );
    return q;
  }

  public async addCardToFireStore(card: ICard, updateCard?: Partial<ICard>) {
    try {
      const uid = getUid();
      if (!uid) return;
      const updatedDetails = Object.assign({}, { ...card, ...updateCard });
      const cardOrderList = [...this.cardStore.cardOrderList];
      database.setDoc(["user_cards", uid, "cards", card.id], updatedDetails);
      database.setDoc(undefined, { cardOrderList });
    } catch (error) {
      console.error(error);
    }
  }

  async addNoteToFireStore(note: NewNote, updateNote?: Partial<NewNote>) {
    try {
      const uid = getUid();
      if (!uid) return;
      const updatedDetails = Object.assign({}, { ...note, ...updateNote });
      const cardOrderList = [...this.cardStore.cardOrderList];
      database.setDoc(["user_cards", uid, "cards", note.id], updatedDetails);
      database.setDoc(undefined, { cardOrderList });
    } catch (error) {
      console.error(error);
    }
  }

  async updateCardToFirebase(cardId: string, updateCard: Partial<ICard>) {
    try {
      const uid = getUid();
      if (!uid) return;
      database.setDoc(["user_cards", uid, "cards", cardId], { ...updateCard });
    } catch (error) {
      console.error("update_card_error", error);
    }
  }

  async updateNoteToFirebase(noteId: string, updateNote: Partial<NewNote>) {
    try {
      const uid = getUid();
      if (!uid) return;
      database.setDoc(["user_cards", uid, "cards", noteId], { ...updateNote });
    } catch (error) {
      console.error("update_note_error", error);
    }
  }

  async updateCardOrderListToFirebase(cardOrderList: string[]) {
    try {
      debounceCardsOrderList(cardOrderList);
      local.set("cardOrderList", cardOrderList);
    } catch (error) {
      console.error("updateCardOrderList_error", error);
    }
  }

  async deleteCardFromFireStore(cardId: string) {
    try {
      const uid = getUid();
      if (!uid) return;
      database.deleteDoc(["user_cards", uid, "cards", cardId]);
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
    return this.cardService.getAllTags();
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
