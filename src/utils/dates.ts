import {
  addDays,
  endOfWeek,
  format,
  isBefore,
  isWithinInterval,
  parseISO,
  startOfWeek,
} from "date-fns";

export const enum WeekStartsOn {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export const dates = {
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
    const today = parseISO(format(Date.now(), this.dateFormat));
    return isBefore(parseISO(date), today) && !this.isToday(date);
  },
  generateTomorrowDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  },
};
