import { useDroppable } from "@dnd-kit/core";
import { Divider, Spacer, cn } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import {
  ActionAllCards,
  TodoAndActionAllCards,
  cardStore,
} from "../../store/cardStore";
import { style } from "../../utils/style";
import { TodoCard } from "../Card";
import EmptyCard from "../Card/EmptyCard";
import { SortableProvider } from "../DND";
import { SortableItem } from "../DND/SortableItem";
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
        <SortableProvider>
          <ul
            className={cn(
              "mt-5 grid w-full gap-3",
              `min-h-[${todoAndActionAll.length * 112 + 20}px]`,
            )}
          >
            {todoAndActionAll.map((card) => (
              <li key={card.id}>
                <SortableItem card={card}>
                  <TodoCard card={card} />
                </SortableItem>
              </li>
            ))}
          </ul>
        </SortableProvider>
      </div>
      <Spacer y={10} />
      <section className="w-full">
        <div className="flex w-full flex-col">
          <h2 className={style.subTitle}>所有行動</h2>
          <Divider className="mb-5" />
          <div ref={setNodeRef2} className="flex w-full flex-col gap-3">
            <SortableProvider>
              {actionCards.length === 0 ? (
                <EmptyCard placeholder={actionPlaceholder} />
              ) : (
                actionCards.map((card) => (
                  <TodoCard key={card.id} card={card} />
                ))
              )}
            </SortableProvider>
          </div>
        </div>
      </section>
    </div>
  );
});
