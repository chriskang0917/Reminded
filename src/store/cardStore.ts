import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";

type cardStatus = "idea" | "action" | "todo" | "remind" | "note" | "execute";

interface Card {
  id: string;
  content: string;
  tags: string[];
  status: cardStatus;
  isArchived: boolean;
  isImportant: boolean;
  createdTime: number;
  updatedTime: number;
  dueDate: number | null; // null if not exist
  reminderStartDate: number | null; // null if not exist
  reminderEndDate: number | null; // null if not exist
}

export class CardStore {
  cards: Card[] = [];

  constructor() {
    makeAutoObservable(this);
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
      dueDate: null,
      reminderStartDate: null,
      reminderEndDate: null,
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
