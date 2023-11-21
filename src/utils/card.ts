import { format, parseISO } from "date-fns";

export const getIsToday = (date: string) => {
  const dateFormat = "yyyy-MM-dd";
  const dueDate = parseISO(date);
  const today = format(Date.now(), dateFormat);

  return format(dueDate, dateFormat) === today;
};
