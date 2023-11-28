import {
  addDays,
  endOfWeek,
  format,
  isBefore,
  isWithinInterval,
  parseISO,
  startOfWeek,
} from "date-fns";
import { ICard } from "./../store/cardStore";

export const enum WeekStartsOn {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export const cardUtils = {
  dateFormat: "yyyy-MM-dd",
  weekStartsOn: WeekStartsOn.Sunday,
  isToday(date: string) {
    const today = format(Date.now(), this.dateFormat);
    return format(parseISO(date), this.dateFormat) === today;
  },
  isTomorrow(date: string) {
    const tomorrow = format(addDays(Date.now(), 1), this.dateFormat);
    return format(parseISO(date), this.dateFormat) === tomorrow;
  },
  isThisWeek(date: string) {
    const startOfWeekDate = startOfWeek(Date.now(), {
      weekStartsOn: this.weekStartsOn,
    });
    const endOfWeekDate = endOfWeek(Date.now(), {
      weekStartsOn: this.weekStartsOn,
    });
    return isWithinInterval(parseISO(date), {
      start: startOfWeekDate,
      end: endOfWeekDate,
    });
  },
  isExceedToday(date: string) {
    const dueDate = parseISO(format(parseISO(date), this.dateFormat));
    const today = parseISO(format(Date.now(), this.dateFormat));
    return isBefore(dueDate, today);
  },
  sortCardsDescBy(strategy: string, cards: ICard[]) {
    switch (strategy) {
      case "dueDate":
        return cards.sort((a, b) => {
          if (a.dueDate === null) return 1;
          if (b.dueDate === null) return -1;
          if (a.dueDate > b.dueDate) return -1;
          if (a.dueDate < b.dueDate) return 1;
          return 0;
        });
      case "createdTime":
        return cards.sort((a, b) => {
          if (a.createdTime > b.createdTime) return -1;
          if (a.createdTime < b.createdTime) return 1;
          return 0;
        });
      default:
        return cards;
    }
  },
};
