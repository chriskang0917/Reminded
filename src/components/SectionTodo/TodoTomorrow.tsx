import { useDroppable } from "@dnd-kit/core";
import { Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import {
  ActionAllCards,
  TodoAndActionAllCards,
  cardStore,
} from "../../store/cardStore";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";
import EmptyCard from "../Card/EmptyCard";
import { TodoInput } from "../Input";

const Title = "明日待辦";
const todoPlaceholder = "享受你的個人時光吧！";
const actionPlaceholder = "繼續累積你的行動吧！";

export const TodoTomorrow = observer(() => {
  const todoAndActionAll = cardStore.getFilteredCardsWith(
    new TodoAndActionAllCards(),
  );
  const actionCards = cardStore.getFilteredCardsWith(new ActionAllCards());

  const { setNodeRef } = useDroppable({
    id: "todo-tomorrow",
  });

  const { setNodeRef: setNodeRef2 } = useDroppable({
    id: "action",
  });

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.mainTitle}>{Title}</h1>
      <TodoInput />
      <Divider />
      <div ref={setNodeRef} className="w-full">
        {todoAndActionAll.length === 0 && (
          <EmptyCard placeholder={todoPlaceholder} />
        )}
      </div>
      <ul className="mt-5 grid w-full gap-3">
        {todoAndActionAll.map((card) => (
          <li key={card.id}>
            <TodoCard card={card} />
          </li>
        ))}
      </ul>
      <Spacer y={10} />
      <section className="mb-12 w-full">
        <div className="flex w-full flex-col">
          <h2 className={style.subTitle}>所有行動</h2>
          <Divider className="mb-5" />
          <div ref={setNodeRef2} className="flex w-full flex-col gap-3">
            {actionCards.length !== 0 ? (
              actionCards.map((card) => <TodoCard key={card.id} card={card} />)
            ) : (
              <EmptyCard placeholder={actionPlaceholder} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
});
