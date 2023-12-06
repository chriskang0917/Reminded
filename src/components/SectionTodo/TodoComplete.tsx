import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { TodoCompletedCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";

const Title = "已完成待辦";

export const TodoComplete = observer(() => {
  const todoComplete = cardStore.getFilteredCardsWith(new TodoCompletedCards());

  useEffect(() => {
    cardStore.getArchivedCards();
  }, [cardStore.archivedCards.length]);

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.mainTitle}>{Title}</h1>
      <Divider />
      <ul className="mt-5 grid w-full gap-3">
        {todoComplete.map((card) => (
          <li key={card.id}>
            <TodoCard card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
});
