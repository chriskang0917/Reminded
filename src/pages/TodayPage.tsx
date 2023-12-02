import { observer } from "mobx-react-lite";

import { Tab, Tabs } from "@nextui-org/react";
import { Key, useState } from "react";
import { IdeaInput } from "../components/Input";
import {
  TodayIdea,
  TodayReminder,
  TodayTodo,
} from "../components/SectionToday";

const Homepage = observer(() => {
  const [selectedKey, setSelectedKey] = useState<Key>("todo");

  return (
    <div className="-ml-20 flex w-full flex-col items-center">
      <div className="fixed left-0 top-0 ml-20 h-[100svh] w-full rounded-[40px] bg-white" />
      <IdeaInput />
      <Tabs
        aria-label="Today's todo, ideas, and reminders"
        fullWidth
        variant="underlined"
        selectedKey={selectedKey as string}
        onSelectionChange={(key) => setSelectedKey(key as Key)}
      >
        <Tab className="w-full" key="todo" title="今日待辦">
          <TodayTodo />
        </Tab>
        <Tab className="w-full" key="idea" title="今日靈感">
          <TodayIdea />
        </Tab>
        <Tab className="w-full" key="reminder" title="今日提醒">
          <TodayReminder />
        </Tab>
      </Tabs>
    </div>
  );
});

export default Homepage;
