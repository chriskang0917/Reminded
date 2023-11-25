import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { WeekStartsOn, cardUtils } from "../../utils/cardUtils";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";

const Title = "已完成";

export const TodoComplete = observer(() => {
  const cardsOfThisWeek = cardUtils.getThisWeekCardsWith(WeekStartsOn.Sunday);
  const todoCardOfThisWeek = cardsOfThisWeek.filter(
    (card) => card.status === "todo",
  );

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        <Divider />
        <ul className="mt-5 grid w-full gap-3">
          {todoCardOfThisWeek.map((card) => (
            <li key={card.id}>
              <TodoCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
