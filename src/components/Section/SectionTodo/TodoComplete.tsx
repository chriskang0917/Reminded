import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { TodoCompletedCards, cardStore } from "../../../store/cardStore";
import { TodoCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import SectionShadow from "../SectionShadow";

const title = "已完成待辦";
const subtitle = "待辦";

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
        <ul className="grid w-full gap-3">
          {todoComplete.map((card) => (
            <li key={card.id}>
              <TodoCard card={card} />
            </li>
          ))}
        </ul>
      </SectionShadow>
    </>
  );
});
