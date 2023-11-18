import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { TodayIdea, TodayReminder, TodayTodo } from "../components/Content";
import { cardStore } from "../store/cardStore";

const Homepage = observer(() => {
  useEffect(() => {
    cardStore.fetchCards();
  }, []);

  return (
    <main className="ml-20 flex flex-col items-center">
      <TodayTodo />
      <TodayIdea />
      <TodayReminder />
    </main>
  );
});

export default Homepage;
