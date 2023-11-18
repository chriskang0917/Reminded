import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import {
  IdeaInput,
  TodayIdea,
  TodayReminder,
  TodayTodo,
} from "../components/Section";
import { cardStore } from "../store/cardStore";

const Homepage = observer(() => {
  useEffect(() => {
    cardStore.getCards();
  }, []);

  return (
    <main className="ml-20 mt-10">
      <div className="px-auto mx-auto flex max-w-fit flex-col items-center">
        <IdeaInput />
        <TodayTodo />
        <TodayIdea />
        <TodayReminder />
      </div>
    </main>
  );
});

export default Homepage;
