import { observer } from "mobx-react-lite";

import { Toaster } from "react-hot-toast";
import { IdeaInput } from "../components/Input";
import {
  TodayIdea,
  TodayReminder,
  TodayTodo,
} from "../components/SectionToday";

const Homepage = observer(() => {
  return (
    <main className="ml-20 mt-10">
      <Toaster position="top-center" />
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
