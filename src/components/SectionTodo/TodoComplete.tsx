import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { CardsType, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";

const Title = "已完成待辦";

export const TodoComplete = observer(() => {
  const todoComplete = cardStore.getFilteredCardsWith(CardsType.TodoComplete);

  useEffect(() => {
    cardStore.getArchivedCards();
  }, []);

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
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
    </section>
  );
});
