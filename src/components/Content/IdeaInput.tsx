import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { cardStore } from "../../store/cardStore";

const tabs = [
  { label: "靈感", id: "idea" },
  { label: "todo", id: "todo" },
];

export const IdeaInput = observer(() => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<"idea" | "todo">("idea");

  useEffect(() => {
    const handleTab = (key: string) => {
      key === "idea" ? setSelectedTab("todo") : setSelectedTab("idea");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        cardStore.addCard(selectedTab, input, [tagInput]);
        setInput("");
      }
      if (e.key === "i" && e.metaKey && e.shiftKey) handleTab(selectedTab);
      if (e.key === "i" && e.metaKey) inputRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input, selectedTab]);

  const getFilteredTags = (tagInput: string) => {
    const tags = cardStore.getTags();
    const emptyTagPlaceholder = [`新增 ${tagInput}`];
    const filteredTags = tags.filter((tag) =>
      tag.toLowerCase().includes(tagInput.toLowerCase()),
    );

    if (filteredTags.length === 0) return emptyTagPlaceholder;
    return filteredTags;
  };

  const filteredTags = getFilteredTags(tagInput);
  const placeholder =
    selectedTab === "idea" ? "捕捉您的靈感..." : "新增待辦...";

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
      <div className="flex items-center gap-4">
        <Input
          size="sm"
          value={input}
          name={selectedTab}
          ref={inputRef}
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        <Autocomplete
          className="w-30"
          variant="bordered"
          label="標籤"
          size="sm"
          allowsCustomValue
          onInputChange={setTagInput}
        >
          {filteredTags.map((tag, index) => (
            <AutocompleteItem key={index}>{tag}</AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
    </section>
  );
});
