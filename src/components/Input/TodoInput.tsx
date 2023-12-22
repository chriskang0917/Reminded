import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Key, useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import toast from "react-hot-toast";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { NewCard } from "../../models/NewCard";
import { cardStore } from "../../store/cardStore";
import { uiStore } from "../../store/uiStore";
import { getObjectFilteredTags } from "../../utils/input";

interface IInput {
  content: string;
  tag: string;
  date: Date | undefined;
}

export const TodoInput = observer(() => {
  const location = useLocation();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const isTomorrow = location.pathname === "/todo/tomorrow";
  const tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1));
  const todayDate = new Date();

  const inputRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState<IInput>({
    date: isTomorrow ? tomorrowDate : todayDate,
    content: "",
    tag: "",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "i" && e.metaKey) {
        inputRef.current?.focus();
        tagRef.current?.blur();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        tagRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.content === "") return;
    const newCard = new NewCard(input.content, [input.tag], "todo");
    const dueDate = input.date?.toISOString() || null;
    cardStore.addCard(newCard, { dueDate: dueDate });
    cardStore.addCardToFireStore(newCard, { dueDate });
    setInput((prev) => ({ ...prev, content: "", tag: "", date: tomorrowDate }));
  };

  const handleInputChange = (value: string) => {
    setInput((prev) => ({ ...prev, content: value }));
  };

  const handleTagInputChange = (value: string) => {
    setInput((prev) => ({ ...prev, tag: value }));
  };

  const handleTagSelectChange = (select: Key) => {
    setInput((prev) => ({ ...prev, tag: select as string }));
  };

  const handleReturnToday = () => {
    toast.success("已設定到期日為今日");
    setInput((prev) => ({ ...prev, date: todayDate }));
  };

  const handleConfirmDate = () => {
    if (!input.date) return toast.error("請選擇到期日");
    setInput((prev) => ({ ...prev, date: tomorrowDate }));
    setIsDatePickerOpen(false);
  };

  const DatePickerFooter = (
    <div className="flex justify-center">
      <Button size="sm" variant="light" onPress={handleReturnToday}>
        今天
      </Button>
      <Button size="sm" variant="ghost" onPress={handleConfirmDate}>
        確認日期
      </Button>
    </div>
  );

  const filteredTags = getObjectFilteredTags(input.tag);
  const AddButton = (
    <IoIosAdd className="cursor-pointer" onClick={handleSubmit} />
  );

  return (
    <form
      className="my-4 flex w-full items-center justify-center gap-2"
      onSubmit={handleSubmit}
    >
      <Input
        ref={inputRef}
        value={input.content}
        onValueChange={handleInputChange}
        placeholder="新增待辦事項"
        endContent={AddButton}
        onFocus={() => uiStore.setInputEditing()}
        onBlur={() => uiStore.stopInputEditing()}
        size="sm"
        variant="bordered"
      />
      <Autocomplete
        ref={tagRef}
        label="標籤"
        variant="bordered"
        inputValue={input.tag}
        selectedKey={input.tag}
        allowsCustomValue
        className="w-25"
        size="sm"
        onFocus={() => uiStore.setInputEditing()}
        onBlur={() => uiStore.stopInputEditing()}
        items={filteredTags}
        onInputChange={handleTagInputChange}
        onSelectionChange={handleTagSelectChange}
      >
        {(tag) => (
          <AutocompleteItem key={tag.label} textValue={tag.label}>
            {!tag.isExisted ? `新增 ${tag.label || ""}` : tag.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Popover
        placement="bottom"
        isOpen={isDatePickerOpen}
        onOpenChange={() => setIsDatePickerOpen(!isDatePickerOpen)}
      >
        <PopoverTrigger>
          <button onClick={() => setIsDatePickerOpen(true)}>
            <CiCalendarDate className="h-7 w-7" />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <DayPicker
            className="bg-gray"
            mode="single"
            selected={input.date as Date}
            onSelect={(date) => setInput((prev) => ({ ...prev, date }))}
            modifiersStyles={{
              today: {
                color: "#fff",
                backgroundColor: "#E1DCD9",
              },
              selected: {
                color: "#fff",
                backgroundColor: "#A67F78",
              },
            }}
            footer={DatePickerFooter}
          />
        </PopoverContent>
      </Popover>
      <button type="submit"></button>
    </form>
  );
});
