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
  createdTime: number;
  updatedTime: number;
  dueDate: Date | undefined; // null if not exist
  reminderStartDate: number | undefined; // null if not exist
  reminderEndDate: number | undefined; // null if not exist
}

export class CardStore {
  cards: ICard[] = [];
  selectedTab: cardStatus = "idea";

  constructor() {
    makeAutoObservable(this);
  }

  async getCards() {
    try {
      const response = await fetch("http://localhost:3004/cards");
      const data = await response.json();
      runInAction(() => {
        this.cards = data.map((card: ICard) => ({
          ...card,
          dueDate: card.dueDate ? new Date(card.dueDate) : undefined,
        }));
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
    this.cards.push({
      id: nanoid(),
      status,
      content,
      tags,
      isArchived: false,
      isImportant: false,
      createdTime: Date.now(),
      updatedTime: Date.now(),
      dueDate: undefined,
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
          updatedTime: Date.now(),
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
          updatedTime: Date.now(),
        };
      }
      return card;
    });
  }

  updateDueDate(id: string, date: Date | undefined) {
    this.cards = this.cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          dueDate: date,
          updatedTime: Date.now(),
        };
      }
      return card;
    });
  }

  archiveCard(id: string) {
    this.cards = this.cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          isArchived: true,
          updatedTime: Date.now(),
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
          updatedTime: Date.now(),
        };
      }
      return card;
    });
  }

  deleteCard(id: string) {
    this.cards = this.cards.filter((card) => card.id !== id);
  }

  deleteTag(id: string, tag: string) {
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
