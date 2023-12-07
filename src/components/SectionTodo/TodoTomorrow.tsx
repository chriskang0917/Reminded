import { useDroppable } from "@dnd-kit/core";
import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import {
  ActionAllCards,
  TodoAndActionTomorrowCards,
  cardStore,
} from "../../store/cardStore";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";
import EmptyCard from "../Card/EmptyCard";
import { Heading, HeadingDivider } from "../Heading";
import { TodoInput } from "../Input";

const title = "明日待辦";
const subtitle = "待辦";
const todoPlaceholder = "享受你的個人時光吧！";
const actionPlaceholder = "繼續累積你的行動吧！";

export const TodoTomorrow = observer(() => {
  const todoAndActionAll = cardStore.getFilteredCardsWith(
    new TodoAndActionTomorrowCards(),
  );
  const actionCards = cardStore.getFilteredCardsWith(new ActionAllCards());

  const { setNodeRef: todoTomorrowRef } = useDroppable({
    id: "todo_tomorrow_section",
  });

  const { setNodeRef: actionRef } = useDroppable({
    id: "action_section",
  });

  return (
    <>
      <Heading
        title={title}
        subtitle={subtitle}
        counts={todoAndActionAll.length}
      />
      <TodoInput />
      <HeadingDivider />
      <div ref={todoTomorrowRef} className="w-full">
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
          <h2 className={style.pageSubtitle}>所有行動</h2>
          <HeadingDivider />
          <div ref={actionRef} className="flex w-full flex-col gap-3">
            {actionCards.length !== 0 ? (
              actionCards.map((card) => <TodoCard key={card.id} card={card} />)
            ) : (
              <EmptyCard placeholder={actionPlaceholder} />
            )}
          </div>
        </div>
      </section>
    </>
  );
});
