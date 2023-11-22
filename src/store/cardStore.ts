import { doc, onSnapshot } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { nanoid } from "nanoid";
import { db } from "../config/firebase";

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
  dueDate: string | undefined;
  reminderStartDate: number | undefined;
  reminderEndDate: number | undefined;
}

/* ===============================
==========  CardStore  ===========
=============================== */

export class CardStore {
  userId: string = "oaT4NJfE22Atv4VskZQk";
  cards: ICard[] = [];
  favoriteIdeaTags: string[] = [];
  favoriteActionTags: string[] = [];
  favoriteTodoTags: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getCards() {
    return await _getCardWithFireStore();
  }

  async getUserSettings() {
    return await _getUserSettings();
  }

  getAllTags() {
    return _getAllTags();
  }

  getFilteredCardsWith(status: cardStatus) {
    return _getFilteredCardsWith(status);
  }

  addCard(status: cardStatus, content: string, tags: string[]) {
    return _addCard(status, content, tags);
  }

  addCardTag(id: string, tag: string) {
    return _addCardTag(id, tag);
  }

  updateCardContent(id: string, content: string) {
    return _updateCardContent(id, content);
  }

  updateCardStatus(id: string, status: cardStatus) {
    return _updateCardStatus(id, status);
  }

  updateDueDate(id: string, date: string | undefined) {
    return _updateDueDate(id, date);
  }

  updateFavoriteTags(type: "idea" | "todo" | "action", tag: string) {
    return _updateFavoriteTags(type, tag);
  }

  archiveCard(id: string) {
    return _archiveCard(id);
  }

  completeCard(id: string) {
    return _completeCard(id);
  }

  deleteCard(id: string) {
    return _deleteCard(id);
  }

  deleteCardTag(id: string, tag: string) {
    return _deleteCardTag(id, tag);
  }

  deleteFavoriteTag(type: "idea" | "todo" | "action", tag: string) {
    return _deleteFavoriteTag(type, tag);
  }
}

async function _getCardWithFireStore() {
  try {
    const cardsRef = doc(db, "cards", cardStore.userId);
    return onSnapshot(cardsRef, (doc) => {
      runInAction(() => {
        if (doc.exists()) cardStore.cards = doc.data()?.cards || [];
      });
    });
  } catch (error) {
    console.error(error);
  }
}

async function _getUserSettings() {
  try {
    const response = await fetch("http://localhost:3004/user_setting");
    const userSetting = await response.json();
    runInAction(() => {
      cardStore.favoriteIdeaTags = userSetting.favoriteIdeaTags;
      cardStore.favoriteActionTags = userSetting.favoriteActionTags;
      cardStore.favoriteTodoTags = userSetting.favoriteTodoTags;
    });
  } catch (error) {
    console.log(error);
  }
}

function _getAllTags() {
  const tags = cardStore.cards.map((card) => card.tags).flat();
  return [...new Set(tags)];
}

function _getFilteredCardsWith(status: cardStatus) {
  return cardStore.cards.filter((card) => card.status === status);
}

function _addCard(status: cardStatus, content: string, tags: string[]) {
  const isTodo = status === "todo";
  const currentDate = new Date().toISOString();
  const newCard = {
    id: nanoid(),
    status,
    content,
    tags,
    isArchived: false,
    isImportant: false,
    createdTime: currentDate,
    updatedTime: currentDate,
    dueDate: isTodo ? currentDate : undefined,
    reminderStartDate: undefined,
    reminderEndDate: undefined,
  };

  cardStore.cards.push(newCard);
}

function _addCardTag(id: string, tag: string) {
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

function _updateCardContent(id: string, content: string) {
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

function _updateCardStatus(id: string, status: cardStatus) {
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

function _updateDueDate(id: string, date: string | undefined) {
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

function _updateFavoriteTags(type: "idea" | "todo" | "action", tag: string) {
  if (type === "idea") {
    cardStore.favoriteIdeaTags.push(tag);
  }
  if (type === "todo") {
    cardStore.favoriteTodoTags.push(tag);
  }
  if (type === "action") {
    cardStore.favoriteActionTags.push(tag);
  }
}

function _archiveCard(id: string) {
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

function _completeCard(id: string) {
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

function _deleteCard(id: string) {
  cardStore.cards = cardStore.cards.filter((card) => card.id !== id);
}

function _deleteCardTag(id: string, tag: string) {
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

function _deleteFavoriteTag(type: "idea" | "todo" | "action", tag: string) {
  if (type === "idea") {
    cardStore.favoriteIdeaTags = cardStore.favoriteIdeaTags.filter(
      (item) => item !== tag,
    );
  }
  if (type === "todo") {
    cardStore.favoriteTodoTags = cardStore.favoriteTodoTags.filter(
      (item) => item !== tag,
    );
  }
  if (type === "action") {
    cardStore.favoriteActionTags = cardStore.favoriteActionTags.filter(
      (item) => item !== tag,
    );
  }
}

export const cardStore = new CardStore();

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
