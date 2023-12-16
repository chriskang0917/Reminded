import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { TodoTodayCards, cardStore } from "../../../store/cardStore";
import { TodoCard } from "../../Card";
import EmptyCard from "../../Card/EmptyCard";
import { Heading, HeadingDivider } from "../../Heading";
import { TodoInput } from "../../Input";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "今日待辦";
const subtitle = "待辦";
const placeholder = "享受你的個人時光吧！";

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
          {!todoTodayCards.length && (
            <section className="flex flex-col items-center">
              <EmptyCard placeholder={placeholder} />
              <Spacer y={10} />
            </section>
          )}
        </MotionList>
      </SectionShadow>
    </>
  );
});
