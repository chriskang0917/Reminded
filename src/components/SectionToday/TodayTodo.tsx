import { Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { IoFilterOutline } from "react-icons/io5";
import { cardStore } from "../../store/cardStore";
import { cardUtils } from "../../utils/cardUtils";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";

export const TodayTodo = observer(() => {
  const todoCards = cardStore.cards.filter((card) => {
    if (!card.dueDate) return false;
    const isTodo = card.status === "todo";
    const isArchived = card.isArchived;
    const isToday = cardUtils.getIsToday(card.dueDate);
    return isTodo && !isArchived && isToday;
  });

  return (
    <section className="flex w-full flex-col items-center">
      <div className="flex w-full items-center justify-between">
        <h1 className={style.mainTitle}>Today's Task</h1>
        <IoFilterOutline className="text-lg" />
      </div>
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
