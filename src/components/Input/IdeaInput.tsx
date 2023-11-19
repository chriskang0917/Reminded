import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Key, useEffect, useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { cardStore } from "../../store/cardStore";
import {
  getObjectFilteredTags,
  isLastCharacterChinese,
} from "../../utils/input";

const tabs = [
  { label: "靈感", id: "idea" },
  { label: "待辦", id: "todo" },
];

export const IdeaInput = observer(() => {
  const inputRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const inputValue = inputRef.current?.value || "";
  const tagValue = tagRef.current?.value || "";

  const [selectedTab, setSelectedTab] = useState<"idea" | "todo">("idea");
  const [input, setInput] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [isChineseEditing, setIsChineseEditing] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleTagSelectChange = (select: Key) => {
    setTagInput(select as string);
  };

  const handleAddCard = () => {
    if (inputValue === "") return;

    if (
      !isLastCharacterChinese(inputValue) &&
      !isLastCharacterChinese(tagValue)
    ) {
      cardStore.addCard(selectedTab, inputValue, [tagInput]);
      inputRef.current?.blur();
      tagRef.current?.blur();
      setInput("");
      setTagInput("");
      setIsChineseEditing(false);
      return;
    }

    if (!isChineseEditing) return setIsChineseEditing(true);

    cardStore.addCard(selectedTab, inputValue, [tagInput]);
    inputRef.current?.blur();
    tagRef.current?.blur();

    setInput("");
    setTagInput("");
    setIsChineseEditing(false);
  };

  const handleTab = (key: string) => {
    key === "idea" ? setSelectedTab("todo") : setSelectedTab("idea");
  };

  const handleKeyDown = (
    e: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") handleAddCard();
    if (e.key === "Escape") {
      inputRef.current?.blur();
      tagRef.current?.blur();
    }
    if (e.key === "i" && e.metaKey) inputRef.current?.focus();
    if (e.key === "i" && e.metaKey && e.shiftKey) handleTab(selectedTab);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTab, input, tagInput, isChineseEditing]);

  const filteredTags = getObjectFilteredTags(tagInput);
  const placeholder =
    selectedTab === "idea" ? "捕捉您的靈感..." : "新增待辦...";
  const AddIcon = (
    <IoIosAdd className="cursor-pointer" onClick={handleAddCard} />
  );

  return (
    <section className="mb-8 flex flex-col items-center">
      <Tabs
        className="mb-5"
        size="lg"
        onSelectionChange={(key) => setSelectedTab(key as "idea" | "todo")}
        selectedKey={selectedTab}
        items={tabs}
      >
        {(item) => <Tab key={item.id} title={item.label} />}
      </Tabs>
      <form
        onSubmit={() => {
          console.log("submit");
        }}
        className="flex items-center gap-4"
      >
        <Input
          value={input}
          name={selectedTab}
          ref={inputRef}
          size="sm"
          placeholder={placeholder}
          endContent={AddIcon}
          onChange={handleInputChange}
        />
        <Autocomplete
          label="標籤"
          variant="bordered"
          inputValue={tagInput}
          allowsCustomValue
          className="w-25"
          size="sm"
          items={filteredTags}
          ref={tagRef}
          onInputChange={(input) => setTagInput(input)}
          onSelectionChange={handleTagSelectChange}
          onKeyDown={handleKeyDown}
        >
          {(tag) => (
            <AutocompleteItem key={tag.label} textValue={tag.label}>
              {tag.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </form>
    </section>
  );
});
