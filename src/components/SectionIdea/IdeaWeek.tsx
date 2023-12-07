import { observer } from "mobx-react-lite";
import { IdeaThisWeekCards, cardStore } from "../../store/cardStore";
import { IdeaCard } from "../Card";
import { Heading, HeadingDivider } from "../Heading";

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
      <ul className="grid w-full gap-3">
        {ideaCardsOfThisWeek.map((card) => (
          <li key={card.id}>
            <IdeaCard card={card} />
          </li>
        ))}
      </ul>
    </>
  );
});
