import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { AllCards, cardStore } from "../../../store/cardStore";
import { IdeaCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "已轉換靈感";
const subtitle = "轉換";

export const IdeaAction = observer(() => {
  const transformedCards = cardStore
    .getFilteredCardsWith(new AllCards())
    .filter((card) => card.isTransformed);
  const archivedCards = cardStore.archivedCards.filter(
    (card) => card.isTransformed,
  );

  const cards = [...transformedCards, ...archivedCards];

  useEffect(() => {
    if (cardStore.archivedCards.length !== 0) return;
    cardStore.getArchivedCards();
  }, []);

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={cards.length} />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        <MotionList>
          {cards.map((card) => (
            <MotionItem key={card.id}>
              <IdeaCard card={card} />
            </MotionItem>
          ))}
        </MotionList>
      </SectionShadow>
    </>
  );
});
