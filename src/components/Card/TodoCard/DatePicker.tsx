import { Button } from "@nextui-org/react";
import { DayPicker } from "react-day-picker";
import { ICard, cardStore } from "../../../store/cardStore";

interface DatePickerProps {
  card: ICard;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

function DatePicker({ card, date, setDate }: DatePickerProps) {
  const handleRemoveDate = () => {
    cardStore.updateDueDate(card.id, undefined);
    setDate(undefined);
  };

  const datePickerFooter = (
    <div className="flex justify-center">
      <Button size="sm" variant="light" onPress={handleRemoveDate}>
        移除到期日
      </Button>
    </div>
  );

  return (
    <DayPicker
      className="bg-gray"
      mode="single"
      selected={date}
      onSelect={setDate}
      footer={datePickerFooter}
    />
  );
}

export default DatePicker;
