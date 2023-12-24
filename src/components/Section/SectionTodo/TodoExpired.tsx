import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { TodoExpiredCards, cardStore } from "../../../store/cardStore";
import { TodoCard } from "../../Card";
import EmptyCard from "../../Card/EmptyCard";
import { Heading, HeadingDivider } from "../../Heading";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "過期待辦";
const subtitle = "過期";
const placeholder = "享受你的個人時光吧！";

export const TodoExpired = observer(() => {
  const expiredCards = cardStore.getFilteredCardsWith(new TodoExpiredCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={expiredCards.length} />
      <HeadingDivider />
      <SectionShadow>
        <MotionList>
          {expiredCards.map((card) => (
            <MotionItem key={card.id}>
              <TodoCard card={card} />
            </MotionItem>
          ))}
          {!expiredCards.length && (
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
