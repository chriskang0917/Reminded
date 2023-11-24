import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { nanoid } from "nanoid";
import { db } from "../config/firebase";
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
  isImportant: boolean;
  createdTime: string;
  updatedTime: string;
  dueDate: string | null;
  reminderStartDate: number | null;
  reminderEndDate: number | null;
}

interface ICardService {
  getAllTags: string[];
  getCards: ICard[];
  getFilteredCardsWith: (status: cardStatus) => ICard[];
  addCard: (status: cardStatus, content: string, tags: string[]) => void;
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
  init: () => void;
  uploadCardsToFireStore: () => void;
}

/* ===============================
==========  Implement  ===========
=============================== */

class NewCard implements ICard {
  id: string;
  content: string;
  tags: string[];
  status: cardStatus;
  isArchived: boolean = false;
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
    this.tags = tags;
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

  addCard(status: cardStatus, content: string, tags: string[]) {
    const newCard = new NewCard(content, tags, status);
    cardStore.cards.push(newCard);
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
  init() {
    try {
      if (!authStore.uid) return;
      const cardsRef = doc(db, "user_cards", authStore.uid);
      console.log(authStore.uid);
      return onSnapshot(cardsRef, (doc) => {
        const data = doc.data();
        localStorage.setItem("cards", JSON.stringify(data?.cards || []));
        runInAction(() => {
          if (doc.exists()) cardStore.cards = data?.cards || [];
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  async uploadCardsToFireStore() {
    try {
      if (!authStore.uid) return;
      const cardsRef = doc(db, "cards", authStore.uid);
      const clonedCards = toJS(cardStore.getCards);
      await setDoc(cardsRef, { cards: clonedCards });
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

  constructor(cardService: CardService, firebaseService: FirebaseService) {
    makeAutoObservable(this);
    this.cardService = cardService;
    this.firebaseService = firebaseService;
  }

  async init() {
    this.firebaseService.init();
  }

  async uploadCardsToFireStore() {
    this.firebaseService.uploadCardsToFireStore();
  }

  get getAllTags() {
    return this.cardService.getAllTags;
  }

  get getCards() {
    return this.cardService.getCards;
  }

  getFilteredCardsWith(status: cardStatus) {
    return this.cardService.getFilteredCardsWith(status);
  }

  addCard(status: cardStatus, content: string, tags: string[]) {
    this.cardService.addCard(status, content, tags);
  }

  addCardTag(id: string, tag: string) {
    this.cardService.addCardTag(id, tag);
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
