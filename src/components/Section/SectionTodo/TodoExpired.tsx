import { observer } from "mobx-react-lite";
import { TodoExpiredCards, cardStore } from "../../../store/cardStore";
import { TodoCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import { TodoInput } from "../../Input";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "過期待辦";
const subtitle = "過期";

export const TodoExpired = observer(() => {
  const expiredCards = cardStore.getFilteredCardsWith(new TodoExpiredCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={expiredCards.length} />
      <TodoInput />
      <HeadingDivider />
      <SectionShadow>
        <MotionList>
          {expiredCards.map((card) => (
            <MotionItem key={card.id}>
              <TodoCard card={card} />
            </MotionItem>
          ))}
        </MotionList>
      </SectionShadow>
    </>
  );
});
