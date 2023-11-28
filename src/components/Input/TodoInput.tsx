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
import { CiCalendarDate } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { NewCard, cardStore } from "../../store/cardStore";
import { getObjectFilteredTags } from "../../utils/input";

interface IInput {
  content: string;
  tag: string;
  date: Date | undefined;
}

export const TodoInput = observer(() => {
  const location = useLocation();
  const isTomorrow = location.pathname === "/todo/tomorrow";

  const inputRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<IInput>({
    content: "",
    tag: "",
    date: isTomorrow
      ? new Date(new Date().setDate(new Date().getDate() + 1))
      : new Date(),
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
    setInput((prev) => ({ ...prev, content: "", tag: "" }));
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

  const handleRemoveDate = () => {
    setInput((prev) => ({ ...prev, date: new Date() }));
  };

  const DatePickerFooter = (
    <div className="mt-2 flex justify-center gap-2">
      <Button size="sm" variant="light" onPress={handleRemoveDate}>
        返回今天
      </Button>
      <Button size="sm" variant="light" onPress={handleRemoveDate}>
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
      <Popover placement="bottom">
        <PopoverTrigger>
          <button>
            <CiCalendarDate className="h-7 w-7" />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <DayPicker
            className="bg-gray"
            mode="single"
            selected={input.date as Date}
            onSelect={(date) => setInput((prev) => ({ ...prev, date }))}
            footer={DatePickerFooter}
          />
        </PopoverContent>
      </Popover>
      <button type="submit"></button>
    </form>
  );
});
