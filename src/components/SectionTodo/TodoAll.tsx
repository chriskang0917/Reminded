import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { TodoAllCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";
import { TodoInput } from "../Input";

const Title = "所有待辦";

export const TodoAll = observer(() => {
  const todoCards = cardStore.getFilteredCardsWith(new TodoAllCards());

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.pageTitle}>{Title}</h1>
      <TodoInput />
      <Divider />
      <ul className="mt-5 grid w-full gap-3">
        {todoCards.map((card) => (
          <li key={card.id}>
            <TodoCard card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
});
