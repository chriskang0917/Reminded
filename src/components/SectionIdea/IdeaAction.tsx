import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { AllCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card";

const Title = "已轉換靈感";

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
      <h1 className={style.mainTitle}>{Title}</h1>
      <Divider />
      <ul className="mt-5 grid w-full gap-3">
        {cards.map((card) => (
          <li key={card.id}>
            <IdeaCard card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
});
