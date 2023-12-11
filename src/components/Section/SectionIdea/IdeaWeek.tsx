import { observer } from "mobx-react-lite";
import { IdeaThisWeekCards, cardStore } from "../../../store/cardStore";
import { IdeaCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import SectionShadow from "../SectionShadow";

const title = "本週靈感";
const subtitle = "靈感";

export const IdeaWeek = observer(() => {
  const ideaCardsOfThisWeek = cardStore.getFilteredCardsWith(
    new IdeaThisWeekCards(),
  );

  const counts = ideaCardsOfThisWeek.length;

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={counts} />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        {ideaCardsOfThisWeek.map((card) => (
          <li key={card.id}>
            <IdeaCard card={card} />
          </li>
        ))}
      </SectionShadow>
    </>
  );
});
