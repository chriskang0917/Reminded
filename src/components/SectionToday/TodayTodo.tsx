import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { TodoTodayCards, cardStore } from "../../store/cardStore";
import { TodoCard } from "../Card";
import EmptyCard from "../Card/EmptyCard";

export const TodayTodo = observer(() => {
  const todoCards = cardStore.getFilteredCardsWith(new TodoTodayCards());

  if (todoCards.length === 0) {
    return (
      <section className="flex flex-col items-center">
        <EmptyCard />
        <Spacer y={10} />
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col items-center">
      <div className="mt-5 flex w-full flex-col gap-3">
        {todoCards.map((card) => (
          <TodoCard key={card.id} card={card} />
        ))}
      </div>
      <Spacer y={10} />
    </section>
  );
});
