import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { AllCards, cardStore } from "../../store/cardStore";
import { cardUtils } from "../../utils/cardUtils";
import { IdeaCard } from "../Card/IdeaCard";

export const TodayIdea = observer(() => {
  const ideaCards = cardStore
    .getFilteredCardsWith(new AllCards())
    .filter((card) => {
      if (!card.createdTime) return false;
      const isIdea = card.status === "idea";
      const isArchived = card.isArchived;
      const isToday = cardUtils.isToday(card.createdTime);
      return isIdea && !isArchived && isToday;
    });

  return (
    <section className="flex w-full flex-col items-center">
      <div className="mt-5 grid w-full gap-3">
        {ideaCards.map((card) => (
          <IdeaCard key={card.id} card={card} />
        ))}
      </div>
      <Spacer y={10} />
    </section>
  );
});
