import { Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { IoFilterOutline } from "react-icons/io5";
import { cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card/IdeaCard";

export const TodayIdea = observer(() => {
  const ideaCards = cardStore.cards.filter((card) => card.status === "idea");

  return (
    <section className="flex w-[500px] flex-col items-center">
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
