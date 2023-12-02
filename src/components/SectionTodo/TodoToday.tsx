import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { TodoTodayCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";
import { TodoInput } from "../Input";

const Title = "今日待辦";

export const TodoToday = observer(() => {
  const todoTodayCards = cardStore.getFilteredCardsWith(new TodoTodayCards());

  return (
    <section>
      <div className="mx-auto mt-10 flex flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        <TodoInput />
        <Divider />
        <ul className="mt-5 grid w-full gap-3">
          {todoTodayCards.map((card) => (
            <li key={card.id}>
              <TodoCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
