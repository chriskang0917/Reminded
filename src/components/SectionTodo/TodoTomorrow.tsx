import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { CardsType, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";

const Title = "明日待辦";

export const TodoTomorrow = observer(() => {
  const todoTomorrow = cardStore.getFilteredCardsWith(CardsType.TodoTomorrow);

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        <Divider />
        <ul className="mt-5 grid w-full gap-3">
          {todoTomorrow.map((card) => (
            <li key={card.id}>
              <TodoCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
