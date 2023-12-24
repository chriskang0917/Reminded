import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Key, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";
import { NewCard } from "../../models/NewCard";
import { cardStore } from "../../store/cardStore";
import { uiStore } from "../../store/uiStore";
import { getObjectFilteredTags } from "../../utils/input";

const tabs = [
  { label: "靈感", id: "idea" },
  { label: "待辦", id: "todo" },
];

export const IdeaInput = observer(() => {
  const inputRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const [selectedTab, setSelectedTab] = useState<"idea" | "todo">("idea");
  const [input, setInput] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleTagSelectChange = (select: Key) => setTagInput(select as string);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input === "") return;
    const tagArray = tagInput ? [tagInput] : [];
    const newCard = new NewCard(input, tagArray, selectedTab);
    cardStore.addCard(newCard);
    cardStore.addCardToFireStore(newCard);
    inputRef.current?.blur();
    tagRef.current?.blur();
    setInput("");
    setTagInput("");
    toast.success(
      `已新增至下方的 今日${selectedTab === "idea" ? `靈感` : `待辦`}！`,
    );
  };

  const handleTab = (key: string) => {
    key === "idea" ? setSelectedTab("todo") : setSelectedTab("idea");
  };

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (e.key === "i" && e.metaKey) inputRef.current?.focus();
      if (e.key === "o" && e.metaKey) handleTab(selectedTab);
      if (e.key === "Escape") {
        inputRef.current?.blur();
        tagRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTab, input, tagInput]);

  const filteredTags = getObjectFilteredTags(tagInput);
  const placeholder =
    selectedTab === "idea" ? "捕捉您的靈感..." : "新增待辦...";
  const AddIcon = (
    <IoIosAdd className="cursor-pointer" onClick={handleSubmit} />
  );

  return (
    <section id="tutorial-today-1" className="mb-8 flex flex-col items-center">
      <Tabs
        className="z-10 mb-5"
        size="lg"
        onSelectionChange={(key) => setSelectedTab(key as "idea" | "todo")}
        selectedKey={selectedTab}
        items={tabs}
      >
        {(item) => <Tab key={item.id} title={item.label} />}
      </Tabs>
      <form
        onSubmit={handleSubmit}
        className="mx-3 flex justify-between gap-2 md:items-center md:gap-4"
      >
        <Input
          value={input}
          name={selectedTab}
          ref={inputRef}
          size="sm"
          onFocus={() => uiStore.setInputEditing()}
          onBlur={() => uiStore.stopInputEditing()}
          placeholder={placeholder}
          endContent={AddIcon}
          onChange={handleInputChange}
        />
        <Autocomplete
          label="標籤"
          variant="bordered"
          inputValue={tagInput || ""}
          selectedKey={tagInput}
          allowsCustomValue
          className="w-25"
          size="sm"
          onFocus={() => uiStore.setInputEditing()}
          onBlur={() => uiStore.stopInputEditing()}
          items={filteredTags}
          onInputChange={(input) => setTagInput(input)}
          onSelectionChange={handleTagSelectChange}
        >
          {(tag) => (
            <AutocompleteItem key={tag.label} textValue={tag.label}>
              {!tag.isExisted ? `新增 ${tag.label || ""}` : tag.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <button type="submit"></button>
      </form>
    </section>
  );
});
