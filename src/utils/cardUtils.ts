import {
  addDays,
  endOfWeek,
  format,
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
  sortCardsByDueDateDesc(cards: ICard[]) {
    return cards.sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      return 0;
    });
  },
};
