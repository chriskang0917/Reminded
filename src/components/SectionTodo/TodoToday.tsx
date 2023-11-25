import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { cardStore } from "../../store/cardStore";
import { cardUtils } from "../../utils/cardUtils";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";

const Title = "今日待辦";

export const TodoToday = observer(() => {
  const todoCards = cardStore.cards.filter((card) => {
    if (!card.dueDate) return false;
    const isTodo = card.status === "todo";
    const isArchived = card.isArchived;
    const isToday = cardUtils.getIsToday(card.dueDate);
    return isTodo && !isArchived && isToday;
  });

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        <Divider />
        <ul className="mt-5 grid w-full gap-3">
          {todoCards.map((card) => (
            <li key={card.id}>
              <TodoCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
