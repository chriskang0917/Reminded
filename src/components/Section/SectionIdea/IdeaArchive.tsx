import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { cardStore } from "../../../store/cardStore";
import { IdeaCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import SectionShadow from "../SectionShadow";

const title = "已封存靈感";
const subtitle = "封存";

export const IdeaArchive = observer(() => {
  useEffect(() => {
    cardStore.getArchivedCards();
  }, [cardStore.archivedCards.length]);

  const counts = cardStore.archivedCards.length;

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={counts} />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        {cardStore.archivedCards.map((card) => (
          <li key={card.id}>
            <IdeaCard card={card} />
          </li>
        ))}
      </SectionShadow>
    </>
  );
});
