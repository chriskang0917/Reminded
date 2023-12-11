import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ActionExecutedCards, cardStore } from "../../../store/cardStore";
import { ActionCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import SectionShadow from "../SectionShadow";

const title = "已執行行動";
const subtitle = "已執行";

export const ActionExecute = observer(() => {
  const actionTodoCards = cardStore.getFilteredCardsWith(
    new ActionExecutedCards(),
  );

  useEffect(() => {
    cardStore.getArchivedCards();
  }, [cardStore.archivedCards.length]);

  return (
    <>
      <Heading
        title={title}
        subtitle={subtitle}
        counts={actionTodoCards.length}
      />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        {actionTodoCards.map((card) => (
          <li key={card.id}>
            <ActionCard card={card} />
          </li>
        ))}
      </SectionShadow>
    </>
  );
});
