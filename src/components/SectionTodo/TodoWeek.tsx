import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { CardsType, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";
import { TodoInput } from "../Input";

const Title = "本週待辦";

export const TodoWeek = observer(() => {
  const todoThisWeek = cardStore.getFilteredCardsWith(CardsType.TodoThisWeek);

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        <TodoInput />
        <Divider />
        <ul className="mt-5 grid w-full gap-3">
          {todoThisWeek.map((card) => (
            <li key={card.id}>
              <TodoCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
