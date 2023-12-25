import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { IdeaTodayCards, cardStore } from "../../../store/cardStore";
import EmptyCard from "../../Card/EmptyCard";
import { IdeaCard } from "../../Card/IdeaCard";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const placeholder = "嘗試記錄生活中的靈感吧！";

export const TodayIdea = observer(() => {
  const ideaCards = cardStore.getFilteredCardsWith(new IdeaTodayCards());

  if (ideaCards.length === 0) {
    return (
      <section className="flex flex-col items-center px-2">
        <EmptyCard placeholder={placeholder} />
        <Spacer y={10} />
      </section>
    );
  }

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
