import { observer } from "mobx-react-lite";
import { IdeaAllCards, cardStore } from "../../../store/cardStore";
import { IdeaCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import SectionShadow from "../SectionShadow";

const title = "所有靈感";
const subtitle = "靈感";

export const IdeaAll = observer(() => {
  const ideaCardsAll = cardStore.getFilteredCardsWith(new IdeaAllCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={ideaCardsAll.length} />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        {ideaCardsAll.map((card) => (
          <li key={card.id}>
            <IdeaCard card={card} />
          </li>
        ))}
      </SectionShadow>
    </>
  );
});
