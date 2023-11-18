import { Input, Tab, Tabs } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { cardStore } from "../../store/cardStore";
import Editable from "../Editable";

type tabType = "idea" | "todo";

export const IdeaInput = observer(() => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<tabType>("idea");

  useEffect(() => {
    const handleSelectTab = (key: string) => {
      key === "idea" ? setSelectedTab("todo") : setSelectedTab("idea");
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") cardStore.addCard(selectedTab, input, []);
      if (e.key === "i" && e.metaKey) handleSelectTab(selectedTab);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input, selectedTab]);

  const placeholder = "捕捉您的靈感...";

  return (
    <section>
      <div className="flex min-w-[500px] items-center gap-4">
        <Tabs selectedKey={selectedTab}>
          <Tab key="idea" title="靈感" />
          <Tab key="todo" title="待辦" />
        </Tabs>
        <Editable text={input} placeholder={placeholder} childRef={inputRef}>
          <Input
            value={input}
            ref={inputRef}
            name={selectedTab}
            placeholder="捕捉您的靈感..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
          />
        </Editable>
      </div>
    </section>
  );
});
