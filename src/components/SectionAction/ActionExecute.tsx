import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ActionExecutedCards, cardStore } from "../../store/cardStore";
import { ActionCard } from "../Card";
import { Heading, HeadingDivider } from "../Heading";

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
      <ul className="grid w-full gap-3">
        {actionTodoCards.map((card) => (
          <li key={card.id}>
            <ActionCard card={card} />
          </li>
        ))}
      </ul>
      <Spacer y={10} />
    </>
  );
});
