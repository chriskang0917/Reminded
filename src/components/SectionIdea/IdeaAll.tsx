import { observer } from "mobx-react-lite";
import { IdeaAllCards, cardStore } from "../../store/cardStore";
import { IdeaCard } from "../Card";
import { Heading, HeadingDivider } from "../Heading";

const title = "所有靈感";
const subtitle = "靈感";

export const IdeaAll = observer(() => {
  const ideaCardsAll = cardStore.getFilteredCardsWith(new IdeaAllCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={ideaCardsAll.length} />
      <HeadingDivider />
      <ul className="grid w-full gap-3">
        {ideaCardsAll.map((card) => (
          <li key={card.id}>
            <IdeaCard card={card} />
          </li>
        ))}
      </ul>
    </>
  );
});
