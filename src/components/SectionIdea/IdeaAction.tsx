import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { AllCards, cardStore } from "../../store/cardStore";
import { IdeaCard } from "../Card";
import { Heading, HeadingDivider } from "../Heading";

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
    <div className="mx-auto mt-10 flex flex-col items-center">
      <Heading title={title} subtitle={subtitle} counts={cards.length} />
      <HeadingDivider />
      <ul className="grid w-full gap-3">
        {cards.map((card) => (
          <li key={card.id}>
            <IdeaCard card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
});
