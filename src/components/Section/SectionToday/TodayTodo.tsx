import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { TodoTodayCards, cardStore } from "../../../store/cardStore";
import { TodoCard } from "../../Card";
import EmptyCard from "../../Card/EmptyCard";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const placeholder = "享受你的個人時光吧！";

export const TodayTodo = observer(() => {
  const todoCards = cardStore.getFilteredCardsWith(new TodoTodayCards());

  if (todoCards.length === 0) {
    return (
      <section className="flex flex-col items-center px-2">
        <EmptyCard placeholder={placeholder} />
        <Spacer y={10} />
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col items-center">
      <SectionShadow className="h-[calc(100svh-313px)]">
        <MotionList>
          {todoCards.map((card) => (
            <MotionItem key={card.id}>
              <TodoCard card={card} />
            </MotionItem>
          ))}
        </MotionList>
      </SectionShadow>
    </section>
  );
});
