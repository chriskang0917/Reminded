import { DayPicker } from "react-day-picker";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

function DatePicker({ date, setDate }: DatePickerProps) {
  const datePickerFooter = <p>選擇預計的到期日</p>;

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
