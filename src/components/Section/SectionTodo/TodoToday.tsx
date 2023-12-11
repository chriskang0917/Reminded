import { observer } from "mobx-react-lite";
import { TodoTodayCards, cardStore } from "../../../store/cardStore";
import { TodoCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import { TodoInput } from "../../Input";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "今日待辦";
const subtitle = "待辦";

export const TodoToday = observer(() => {
  const todoTodayCards = cardStore.getFilteredCardsWith(new TodoTodayCards());

  return (
    <>
      <Heading
        title={title}
        subtitle={subtitle}
        counts={todoTodayCards.length}
      />
      <TodoInput />
      <HeadingDivider />
      <SectionShadow>
        <MotionList>
          {todoTodayCards.map((card) => (
            <MotionItem key={card.id}>
              <TodoCard card={card} />
            </MotionItem>
          ))}
        </MotionList>
      </SectionShadow>
    </>
  );
});
