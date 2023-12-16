import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { IdeaThisWeekCards, cardStore } from "../../../store/cardStore";
import { IdeaCard } from "../../Card";
import EmptyCard from "../../Card/EmptyCard";
import { Heading, HeadingDivider } from "../../Heading";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "本週靈感";
const subtitle = "靈感";
const placeholder = "從轉換你的靈感開始吧！";

export const IdeaWeek = observer(() => {
  const ideaCardsOfThisWeek = cardStore.getFilteredCardsWith(
    new IdeaThisWeekCards(),
  );

  const counts = ideaCardsOfThisWeek.length;

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={counts} />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        <MotionList>
          {ideaCardsOfThisWeek.map((card) => (
            <MotionItem key={card.id}>
              <IdeaCard card={card} />
            </MotionItem>
          ))}
          {!ideaCardsOfThisWeek.length && (
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
