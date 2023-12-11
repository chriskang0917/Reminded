import { observer } from "mobx-react-lite";
import { IdeaTodayCards, cardStore } from "../../../store/cardStore";
import { IdeaCard } from "../../Card/IdeaCard";
import SectionShadow from "../SectionShadow";

export const TodayIdea = observer(() => {
  const ideaCards = cardStore.getFilteredCardsWith(new IdeaTodayCards());

  return (
    <section className="flex w-full flex-col items-center">
      <SectionShadow className="h-[calc(100svh-313px)]">
        {ideaCards.map((card) => (
          <li>
            <IdeaCard key={card.id} card={card} />
          </li>
        ))}
      </SectionShadow>
    </section>
  );
});
