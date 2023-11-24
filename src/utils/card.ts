import { addDays, format, isSameISOWeek, parseISO } from "date-fns";
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

export const filterCard = {
  getIsToday(date: string) {
    const dateFormat = "yyyy-MM-dd";
    const dueDate = parseISO(date);
    const today = format(Date.now(), dateFormat);

    return format(dueDate, dateFormat) === today;
  },
  getThisWeekCardsWith(weekStartsOn: WeekStartsOn) {
    return cardStore.cards.filter((card) => {
      const adjustedDate = addDays(parseISO(card.createdTime), -weekStartsOn);
      isSameISOWeek(new Date(), adjustedDate);
    });
  },
};
