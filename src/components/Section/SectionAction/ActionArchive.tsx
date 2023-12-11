import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ActionArchiveCards, cardStore } from "../../../store/cardStore";
import { ActionCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import SectionShadow from "../SectionShadow";

const title = "已封存行動";
const subtitle = "已封存";

export const ActionArchive = observer(() => {
  const actionTodoCards = cardStore.getFilteredCardsWith(
    new ActionArchiveCards(),
  );

  useEffect(() => {
    cardStore.getArchivedCards();
  }, []);

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
