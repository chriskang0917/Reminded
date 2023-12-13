import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { TodoCompletedCards, cardStore } from "../../../store/cardStore";
import { TodoCard } from "../../Card";
import EmptyCard from "../../Card/EmptyCard";
import { Heading, HeadingDivider } from "../../Heading";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "已完成待辦";
const subtitle = "待辦";
const placeholder = "享受你的個人時光吧！";

export const TodoComplete = observer(() => {
  const todoComplete = cardStore.getFilteredCardsWith(new TodoCompletedCards());

  useEffect(() => {
    cardStore.getArchivedCards();
  }, [cardStore.archivedCards.length]);

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={todoComplete.length} />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-180px)]">
        <MotionList>
          {todoComplete.map((card) => (
            <MotionItem key={card.id}>
              <TodoCard card={card} />
            </MotionItem>
          ))}
          {!todoComplete.length && (
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
