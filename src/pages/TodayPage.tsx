import { observer } from "mobx-react-lite";

import { IdeaInput } from "../components/Input";
import {
  TodayIdea,
  TodayReminder,
  TodayTodo,
} from "../components/SectionToday";

const Homepage = observer(() => {
  return (
    <div className="px-auto mx-auto flex max-w-fit flex-col items-center">
      <IdeaInput />
      <TodayTodo />
      <TodayIdea />
      <TodayReminder />
    </div>
  );
});

export default Homepage;
