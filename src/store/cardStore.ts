import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { makeAutoObservable, runInAction, toJS } from "mobx";
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

  async getCardsWithFireStore() {
    const getData = new GetData();
    getData.getCardsWithFireStore();
  }

  async getUserSettings() {
    const getData = new GetData();
    getData.getUserSettings();
  }

  async uploadCardsToFireStore() {
    const uploadData = new UploadData();
    uploadData.uploadCardsToFireStore();
  }

  get getAllTags() {
    const getData = new GetData();
    return getData.getAllTags();
  }

  get getCards() {
    return this.cards;
  }

  getFilteredCardsWith(status: cardStatus) {
    const getData = new GetData();
    return getData.getFilteredCardsWith(status);
  }

  addCard(status: cardStatus, content: string, tags: string[]) {
    const addData = new UpdateCard();
    addData.addCard(status, content, tags);
  }

  addCardTag(id: string, tag: string) {
    const addData = new UpdateCard();
    addData.addCardTag(id, tag);
  }

  updateCardContent(id: string, content: string) {
    const updateData = new UpdateCard();
    updateData.updateCardContent(id, content);
  }

  updateCardStatus(id: string, status: cardStatus) {
    const updateData = new UpdateCard();
    updateData.updateCardStatus(id, status);
  }

  updateDueDate(id: string, date: string | undefined) {
    const updateData = new UpdateCard();
    updateData.updateDueDate(id, date);
  }

  updateFavoriteTags(type: "idea" | "todo" | "action", tag: string) {
    const updateData = new UpdateCard();
    updateData.updateFavoriteTags(type, tag);
  }

  archiveCard(id: string) {
    const updateData = new UpdateCard();
    updateData.archiveCard(id);
  }

  completeCard(id: string) {
    const updateData = new UpdateCard();
    updateData.completeCard(id);
  }

  deleteCard(id: string) {
    const updateData = new UpdateCard();
    updateData.deleteCard(id);
  }

  deleteCardTag(id: string, tag: string) {
    const updateData = new UpdateCard();
    updateData.deleteCardTag(id, tag);
  }

  deleteFavoriteTag(type: "idea" | "todo" | "action", tag: string) {
    const updateData = new UpdateCard();
    updateData.deleteFavoriteTag(type, tag);
  }
}

class GetData {
  async getCardsWithFireStore() {
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

  async getUserSettings() {
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

  getAllTags() {
    const tags = cardStore.cards.map((card) => card.tags).flat() || [];
    if (!tags) return [];
    return [...new Set(tags)];
  }

  getFilteredCardsWith(status: cardStatus) {
    return cardStore.cards.filter((card) => card.status === status);
  }
}

class UploadData {
  async uploadCardsToFireStore() {
    try {
      const cardsRef = doc(db, "cards", cardStore.userId);
      const clonedCards = toJS(cardStore.getCards);
      await setDoc(cardsRef, { cards: clonedCards });
    } catch (error) {
      console.error(error);
    }
  }
}

class UpdateCard {
  addCard(status: cardStatus, content: string, tags: string[]) {
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

  updateDueDate(id: string, date: string | undefined) {
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

  updateFavoriteTags(type: "idea" | "todo" | "action", tag: string) {
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

  deleteFavoriteTag(type: "idea" | "todo" | "action", tag: string) {
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
