import {
  addDays,
  endOfWeek,
  format,
  isSameISOWeek,
  isWithinInterval,
  parseISO,
  startOfWeek,
} from "date-fns";
import { cardStore } from "../store/cardStore";

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
  weekStartsOn: WeekStartsOn.Monday,
  getIsToday(date: string) {
    const today = format(Date.now(), this.dateFormat);
    return format(parseISO(date), this.dateFormat) === today;
  },
  getIsTomorrow(date: string) {
    const tomorrow = format(addDays(Date.now(), 1), this.dateFormat);
    return format(parseISO(date), this.dateFormat) === tomorrow;
  },
  getIsThisWeek(date: string) {
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
  getThisWeekIdeaCardsWith(weekStartsOn: WeekStartsOn) {
    return cardStore.cards.filter((card) => {
      const adjustedDate = addDays(parseISO(card.createdTime), -weekStartsOn);
      return isSameISOWeek(new Date(), adjustedDate);
    });
  },
  getThisWeekTodoCardsWith(weekStartsOn: WeekStartsOn) {
    return cardStore.cards.filter((card) => {
      if (!card.dueDate) return false;
      const adjustedDate = addDays(parseISO(card.dueDate), -weekStartsOn);
      return isSameISOWeek(new Date(), adjustedDate);
    });
  },
};
