import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { IdeaAllCards, cardStore } from "../../../store/cardStore";
import { IdeaCard } from "../../Card";
import EmptyCard from "../../Card/EmptyCard";
import { Heading, HeadingDivider } from "../../Heading";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "所有靈感";
const subtitle = "靈感";
const placeholder = "從轉換你的靈感開始吧！";

export const IdeaAll = observer(() => {
  const ideaCardsAll = cardStore.getFilteredCardsWith(new IdeaAllCards());

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={ideaCardsAll.length} />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        <MotionList>
          {ideaCardsAll.map((card) => (
            <MotionItem key={card.id}>
              <IdeaCard card={card} />
            </MotionItem>
          ))}
          {!ideaCardsAll.length && (
            <section className="flex flex-col items-center">
              <EmptyCard placeholder={placeholder} />
              <Spacer y={10} />
            </section>
          )}
        </MotionList>
      </SectionShadow>
    </>
  );
});
