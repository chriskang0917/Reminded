import { Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { TodoTodayCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";

export const TodayTodo = observer(() => {
  const todoCards = cardStore.getFilteredCardsWith(new TodoTodayCards());

  return (
    <section className="flex w-full flex-col items-center">
      <h1 className={style.mainTitle}>Today's Task</h1>
      <Divider />
      <div className="mt-5 grid w-full gap-3">
        {todoCards.map((card) => (
          <TodoCard key={card.id} card={card} />
        ))}
      </div>
      <Spacer y={10} />
    </section>
  );
});
