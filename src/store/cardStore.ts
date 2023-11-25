import { addDays, isSameISOWeek, parseISO } from "date-fns";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { nanoid } from "nanoid";
import { db } from "../config/firebase";
import { WeekStartsOn } from "../utils/cardUtils";
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

interface ICardService {
  getAllTags: string[];
  getCards: ICard[];
  getFilteredCardsWith: (status: cardStatus) => ICard[];
  getThisWeekCardsWith: (weekStartsOn: WeekStartsOn) => ICard[];
  addCard: (newCard: NewCard) => void;
  addCardTag: (id: string, tag: string) => void;
  updateCardContent: (id: string, content: string) => void;
  updateCardStatus: (id: string, status: cardStatus) => void;
  updateDueDate: (id: string, date: string | null) => void;
  archiveCard: (id: string) => void;
  completeCard: (id: string) => void;
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
    this.createdTime = currentDate;
    this.updatedTime = currentDate;
    this.dueDate = status === "todo" ? currentDate : null;
  }
}

class CardService implements ICardService {
  get getAllTags() {
    const tags = cardStore.cards.map((card) => card.tags).flat() || [];
    if (!tags) return [];
    return [...new Set(tags)];
  }

  get getCards() {
    return cardStore.cards;
  }

  getFilteredCardsWith(status: cardStatus) {
    return cardStore.cards.filter((card) => card.status === status);
  }

  getThisWeekCardsWith(weekStartsOn: WeekStartsOn) {
    return cardStore.cards.filter((card) => {
      const adjustedDate = addDays(parseISO(card.createdTime), -weekStartsOn);
      isSameISOWeek(new Date(), adjustedDate);
    });
  }

  addCard(newCard: NewCard) {
    cardStore.cards.push(newCard);
  }

  updateCard(id: string, updateCard: IUpdateCard) {
    cardStore.cards = cardStore.cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          ...updateCard,
        };
      }
      return card;
    });
  }

  addCardTag(id: string, tag: string) {
    cardStore.cards = cardStore.cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          tags: [...card.tags, tag],
        };
      }
      return card;
    });
  }

  updateCardContent(id: string, content: string) {
    const trimmedContent = content.trim();
    cardStore.cards = cardStore.cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          content: trimmedContent,
          updatedTime: new Date().toISOString(),
        };
      }
      return card;
    });
  }

  updateCardStatus(id: string, status: cardStatus) {
    cardStore.cards = cardStore.cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          status,
          updatedTime: new Date().toISOString(),
        };
      }
      return card;
    });
  }

  updateDueDate(id: string, date: string | null) {
    cardStore.cards = cardStore.cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          dueDate: date,
          updatedTime: new Date().toISOString(),
        };
      }
      return card;
    });
  }

  archiveCard(id: string) {
    cardStore.cards = cardStore.cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          isArchived: true,
          updatedTime: new Date().toISOString(),
        };
      }
      return card;
    });
  }

  completeCard(id: string) {
    cardStore.cards = cardStore.cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          isArchived: true,
          updatedTime: new Date().toISOString(),
        };
      }
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
  getLocalCards() {
    const localCards = JSON.parse(localStorage.getItem("cards") || "");
    if (localCards) runInAction(() => (cardStore.cards = localCards));
  }

  async initActiveCards() {
    try {
      const uid = authStore.uid;
      if (!uid) return;

      this.getLocalCards();

      const cardsRef = collection(db, "user_cards", uid, "cards");
      const q = query(cardsRef, where("isArchived", "==", false));

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
      const uid = authStore.uid;
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

  get getCards() {
    return this.cardService.getCards;
  }

  getThisWeekCardsWith(weekStartsOn: WeekStartsOn) {
    return this.cardService.getThisWeekCardsWith(weekStartsOn);
  }

  getFilteredCardsWith(status: cardStatus) {
    return this.cardService.getFilteredCardsWith(status);
  }

  addCard(newCard: NewCard) {
    this.cardService.addCard(newCard);
  }

  addCardTag(id: string, tag: string) {
    this.cardService.addCardTag(id, tag);
  }

  updateCard(id: string, updateCard: IUpdateCard) {
    this.cardService.updateCard(id, updateCard);
  }

  updateCardContent(id: string, content: string) {
    this.cardService.updateCardContent(id, content);
  }

  updateCardStatus(id: string, status: cardStatus) {
    this.cardService.updateCardStatus(id, status);
  }

  updateDueDate(id: string, date: string | null) {
    this.cardService.updateDueDate(id, date);
  }

  archiveCard(id: string) {
    this.cardService.archiveCard(id);
  }

  completeCard(id: string) {
    this.cardService.completeCard(id);
  }

  deleteCard(id: string) {
    this.cardService.deleteCard(id);
  }

  deleteCardTag(id: string, tag: string) {
    this.cardService.deleteCardTag(id, tag);
  }
}

const cardService = new CardService();
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
