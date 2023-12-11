import { observer } from "mobx-react-lite";
import { TodoThisWeekCards, cardStore } from "../../../store/cardStore";
import { TodoCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import { TodoInput } from "../../Input";
import SectionShadow from "../SectionShadow";

const title = "本週待辦";
const subtitle = "待辦";

export const TodoWeek = observer(() => {
  const todoThisWeek = cardStore.getFilteredCardsWith(new TodoThisWeekCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={todoThisWeek.length} />
      <TodoInput />
      <HeadingDivider />
      <SectionShadow>
        <ul className="grid w-full gap-3">
          {todoThisWeek.map((card) => (
            <li key={card.id}>
              <TodoCard card={card} />
            </li>
          ))}
        </ul>
      </SectionShadow>
    </>
  );
});
