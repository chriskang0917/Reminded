import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { IdeaTodayCards, cardStore } from "../../store/cardStore";
import { IdeaCard } from "../Card/IdeaCard";

export const TodayIdea = observer(() => {
  const ideaCards = cardStore.getFilteredCardsWith(new IdeaTodayCards());

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
