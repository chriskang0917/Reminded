import { useDroppable } from "@dnd-kit/core";
import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { authStore } from "../../../store/authStore";
import {
  ActionAllCards,
  TodoAndActionTomorrowCards,
  cardStore,
} from "../../../store/cardStore";
import { style } from "../../../utils/style";
import { initTutorial, todoSteps } from "../../../utils/tutorial";
import { TodoCard } from "../../Card";
import EmptyCard from "../../Card/EmptyCard";
import { Heading, HeadingDivider } from "../../Heading";
import { TodoInput } from "../../Input";
import SectionShadow from "../SectionShadow";

const title = "明日待辦";
const subtitle = "待辦";
const todoPlaceholder = "享受你的個人時光吧！";
const actionPlaceholder = "繼續累積你的行動吧！";

export const TodoTomorrow = observer(() => {
  const todoAndActionAll = cardStore.getFilteredCardsWith(
    new TodoAndActionTomorrowCards(),
  );

  useEffect(() => {
    const isTutorialDone = authStore.tutorialProgress.todo;
    if (isTutorialDone !== undefined && !isTutorialDone)
      initTutorial(todoSteps, {
        onDestroyed: () => authStore.updateTutorialProgress("todo"),
      });
  }, [authStore.tutorialProgress?.todo]);

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
      <SectionShadow className="h-[calc(50svh-120px)] pt-0">
        <div ref={todoTomorrowRef} className="w-full">
          {todoAndActionAll.length === 0 && (
            <EmptyCard placeholder={todoPlaceholder} />
          )}
        </div>
        <ul id="tutorial-todo-2" className="grid w-full gap-3">
          {todoAndActionAll.map((card) => (
            <li key={card.id}>
              <TodoCard card={card} />
            </li>
          ))}
        </ul>
      </SectionShadow>
      <Spacer y={10} />
      <section className="mb-12 w-full">
        <div id="tutorial-todo-1" className="flex w-full flex-col">
          <h2 className={style.pageSubtitle}>所有行動</h2>
          <HeadingDivider />
          <SectionShadow className="h-[calc(50svh-200px)]">
            <div ref={actionRef} className="flex w-full flex-col gap-3">
              {actionCards.length !== 0 ? (
                actionCards.map((card) => (
                  <TodoCard key={card.id} card={card} />
                ))
              ) : (
                <EmptyCard placeholder={actionPlaceholder} />
              )}
            </div>
          </SectionShadow>
        </div>
      </section>
    </>
  );
});
