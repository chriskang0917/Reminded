import { Button } from "@nextui-org/react";
import { parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ICard, cardStore } from "../../../store/cardStore";

interface DatePickerProps {
  card: ICard;
  date: string | null;
  setDate: (date: Date | null) => void;
}

function DatePicker({ card, date, setDate }: DatePickerProps) {
  const handleRemoveDate = () => {
    cardStore.updateDueDate(card.id, null);
    setDate(null);
  };

  const datePickerFooter = (
    <div className="flex justify-center">
      <Button size="sm" variant="light" onPress={handleRemoveDate}>
        移除到期日
      </Button>
    </div>
  );

  const parsedDate = date ? parseISO(date) : undefined;

  return (
    <DayPicker
      className="bg-gray"
      mode="single"
      selected={parsedDate}
      onSelect={setDate as (date: Date | undefined) => void}
      footer={datePickerFooter}
    />
  );
}

export default DatePicker;
