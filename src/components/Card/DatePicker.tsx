import { Button } from "@nextui-org/react";
import { parseISO } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ICard, cardStore } from "../../store/cardStore";

interface DatePickerProps {
  card: ICard;
  date: string | null;
  setDate: (date: Date | null) => void;
}

function DatePicker({ card, date, setDate }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(() =>
    parseISO(date as string),
  );

  const handleSelectDate = (date: Date | undefined) => {
    const dueDate = date || null;
    setSelectedDate(dueDate);
  };

  const handleReturnToday = () => {
    setSelectedDate(new Date());
  };

  const handleConfirmDate = () => {
    setDate(selectedDate);
  };

  const handleRemoveDate = () => {
    cardStore.updateCard(card.id, { dueDate: null });
    cardStore.updateCardToFirebase(card.id, { dueDate: null });
    setSelectedDate(null);
    setDate(null);
  };

  const DatePickerFooter = (
    <div className="flex justify-between">
      <Button size="sm" variant="light" onPress={handleReturnToday}>
        今天
      </Button>
      <Button size="sm" variant="ghost" onPress={handleConfirmDate}>
        確認日期
      </Button>
      <Button size="sm" variant="light" onPress={handleRemoveDate}>
        移除到期
      </Button>
    </div>
  );

  const parsedDate = selectedDate || undefined;

  return (
    <DayPicker
      className="bg-gray"
      mode="single"
      selected={parsedDate}
      onSelect={handleSelectDate as (date: Date | undefined) => void}
      footer={DatePickerFooter}
    />
  );
}

export default DatePicker;
