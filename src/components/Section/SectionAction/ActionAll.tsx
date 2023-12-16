import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { ActionAllCards, cardStore } from "../../../store/cardStore";
import { ActionCard } from "../../Card";
import EmptyCard from "../../Card/EmptyCard";
import { Heading, HeadingDivider } from "../../Heading";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "所有行動";
const subtitle = "行動";
const placeholder = "從轉換你的靈感開始吧！";

export const ActionAll = observer(() => {
  const actionCards = cardStore.getFilteredCardsWith(new ActionAllCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={actionCards.length} />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        <MotionList>
          {actionCards.map((card) => (
            <MotionItem key={card.id}>
              <ActionCard card={card} />
            </MotionItem>
          ))}
          {!actionCards.length && (
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
