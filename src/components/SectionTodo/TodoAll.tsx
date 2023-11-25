import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";

const Title = "所有待辦";

export const TodoAll = observer(() => {
  const todoCards = cardStore.cards.filter((card) => card.status === "todo");
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
