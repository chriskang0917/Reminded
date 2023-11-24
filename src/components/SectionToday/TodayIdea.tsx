import { Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { IoFilterOutline } from "react-icons/io5";
import { cardStore } from "../../store/cardStore";
import { filterCard } from "../../utils/card";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card/IdeaCard";

export const TodayIdea = observer(() => {
  const ideaCards = cardStore.cards.filter((card) => {
    if (!card.createdTime) return false;
    const isIdea = card.status === "idea";
    const isArchived = card.isArchived;
    const isToday = filterCard.getIsToday(card.createdTime);
    return isIdea && !isArchived && isToday;
  });

  return (
    <section className="flex w-full flex-col items-center">
      <div className="flex w-full justify-between">
        <h2 className={style.subTitle}>Today's ideas</h2>
        <IoFilterOutline className="text-lg" />
      </div>
      <Divider />
      <div className="mt-5 grid w-full gap-3">
        {ideaCards.map((card) => (
          <IdeaCard key={card.id} card={card} />
        ))}
      </div>
      <Spacer y={10} />
    </section>
  );
});
