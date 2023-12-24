import { Tab, Tabs } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { Key, useState } from "react";
import { IdeaInput } from "../components/Input";
import { TodayIdea, TodayTodo } from "../components/Section/SectionToday";
import CountBadge from "../components/Section/SectionToday/CountBadge";
import useDocTitle from "../hooks/useDocTitle";
import useTutorial from "../hooks/useTutorial";
import { IdeaTodayCards, TodoTodayCards, cardStore } from "../store/cardStore";
import { TutorialType } from "../utils/tutorial";

const Homepage = observer(() => {
  const [selectedKey, setSelectedKey] = useState<Key>("idea");

  useDocTitle("Reminded | 今日");
  useTutorial(TutorialType.today);

  const countTodo = cardStore.getFilteredCardsWith(new TodoTodayCards()).length;
  const countIdea = cardStore.getFilteredCardsWith(new IdeaTodayCards()).length;

  return (
    <div className="flex w-full flex-col items-center md:-ml-20">
      <div className="fixed left-0 top-0 h-[100svh] w-full rounded-[40px] bg-white md:ml-20" />
      <IdeaInput />
      <Tabs
        id="tutorial-today-2"
        aria-label="Today's todo, ideas, and reminders"
        fullWidth
        variant="underlined"
        selectedKey={selectedKey as string}
        onSelectionChange={(key) => setSelectedKey(key as Key)}
      >
        <Tab
          className="h-12 w-full"
          key="idea"
          title={
            <div className="flex items-center gap-2">
              今日靈感
              <CountBadge num={countIdea} />
            </div>
          }
        >
          <TodayIdea />
        </Tab>
        <Tab
          className="h-12 w-full"
          key="todo"
          title={
            <div className="flex items-center gap-2">
              今日待辦
              <CountBadge num={countTodo} />
            </div>
          }
        >
          <TodayTodo />
        </Tab>
      </Tabs>
    </div>
  );
});

export default Homepage;
