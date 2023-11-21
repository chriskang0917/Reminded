import { makeAutoObservable, runInAction } from "mobx";
import { nanoid } from "nanoid";

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

export class CardStore {
  cards: ICard[] = [];
  favoriteIdeaTags: string[] = [];
  favoriteActionTags: string[] = [];
  favoriteTodoTags: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getCards() {
    try {
      const response = await fetch("http://localhost:3004/cards");
      const data = await response.json();
      runInAction(() => {
        this.cards = data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserSettings() {
    try {
      const response = await fetch("http://localhost:3004/user_setting");
      const data = await response.json();
      runInAction(() => {
        this.favoriteIdeaTags = data.favoriteIdeaTags;
      });
    } catch (error) {
      console.log(error);
    }
  }

  getAllTags() {
    const tags = this.cards.map((card) => card.tags).flat();
    return [...new Set(tags)];
  }

  getFilteredCardsWith(status: cardStatus) {
    return this.cards.filter((card) => card.status === status);
  }

  addCard(status: cardStatus, content: string, tags: string[]) {
    const isTodo = status === "todo";
    const currentDate = new Date().toISOString();

    this.cards.push({
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
    });
  }

  addTag(id: string, tag: string) {
    this.cards = this.cards.map((card) => {
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
    this.cards = this.cards.map((card) => {
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
    this.cards = this.cards.map((card) => {
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
    this.cards = this.cards.map((card) => {
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
      this.favoriteIdeaTags.push(tag);
    }
    if (type === "todo") {
      this.favoriteTodoTags.push(tag);
    }
    if (type === "action") {
      this.favoriteActionTags.push(tag);
    }
  }

  archiveCard(id: string) {
    this.cards = this.cards.map((card) => {
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
    this.cards = this.cards.map((card) => {
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
    this.cards = this.cards.filter((card) => card.id !== id);
  }

  deleteCardTag(id: string, tag: string) {
    this.cards = this.cards.map((card) => {
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
      this.favoriteIdeaTags = this.favoriteIdeaTags.filter(
        (item) => item !== tag,
      );
    }
    if (type === "todo") {
      this.favoriteTodoTags = this.favoriteTodoTags.filter(
        (item) => item !== tag,
      );
    }
    if (type === "action") {
      this.favoriteActionTags = this.favoriteActionTags.filter(
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
