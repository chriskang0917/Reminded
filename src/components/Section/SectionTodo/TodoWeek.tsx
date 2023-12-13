import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { TodoThisWeekCards, cardStore } from "../../../store/cardStore";
import { TodoCard } from "../../Card";
import EmptyCard from "../../Card/EmptyCard";
import { Heading, HeadingDivider } from "../../Heading";
import { TodoInput } from "../../Input";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "本週待辦";
const subtitle = "待辦";
const placeholder = "享受你的個人時光吧！";

export const TodoWeek = observer(() => {
  const todoThisWeek = cardStore.getFilteredCardsWith(new TodoThisWeekCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={todoThisWeek.length} />
      <TodoInput />
      <HeadingDivider />
      <SectionShadow>
        <MotionList>
          {todoThisWeek.map((card) => (
            <MotionItem key={card.id}>
              <TodoCard card={card} />
            </MotionItem>
          ))}
          {!todoThisWeek.length && (
            <section className="flex flex-col items-center">
              <EmptyCard placeholder={placeholder} />
              <Spacer y={10} />
            </section>
          )}
        </MotionList>
      </SectionShadow>
    </>
  );
});
