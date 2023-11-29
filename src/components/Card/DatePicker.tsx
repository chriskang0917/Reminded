import { Button } from "@nextui-org/react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import toast from "react-hot-toast";
import { ICard, cardStore } from "../../store/cardStore";

interface DatePickerProps {
  card: ICard;
  date: Date | null;
  setDate: (date: Date | null) => void;
}

function DatePicker({ card, date, setDate }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(date);

  const handleSelectDate = (date: Date | undefined) => {
    const dueDate = date || null;
    setSelectedDate(dueDate);
  };

  const handleReturnToday = () => {
    toast.success("已設定到期日為今日");
    setSelectedDate(new Date());
  };

  const handleConfirmDate = () => {
    if (!selectedDate) return toast.error("請選擇到期日");
    toast.success("已設定到期日");
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
