import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { TodoCompletedCards, cardStore } from "../../../store/cardStore";
import { TodoCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";

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
      <ul className="grid w-full gap-3">
        {todoComplete.map((card) => (
          <li key={card.id}>
            <TodoCard card={card} />
          </li>
        ))}
      </ul>
    </>
  );
});
