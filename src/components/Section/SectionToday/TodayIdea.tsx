import { observer } from "mobx-react-lite";
import { IdeaTodayCards, cardStore } from "../../../store/cardStore";
import { IdeaCard } from "../../Card/IdeaCard";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

export const TodayIdea = observer(() => {
  const ideaCards = cardStore.getFilteredCardsWith(new IdeaTodayCards());

  return (
    <section className="flex w-full flex-col items-center">
      <SectionShadow className="h-[calc(100svh-313px)]">
        <MotionList>
          {ideaCards.map((card) => (
            <MotionItem key={card.id}>
              <IdeaCard card={card} />
            </MotionItem>
          ))}
        </MotionList>
      </SectionShadow>
    </section>
  );
});
