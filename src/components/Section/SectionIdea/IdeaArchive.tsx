import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { cardStore } from "../../../store/cardStore";
import { IdeaCard } from "../../Card";
import EmptyCard from "../../Card/EmptyCard";
import { Heading, HeadingDivider } from "../../Heading";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "已封存靈感";
const subtitle = "封存";
const placeholder = "您尚未封存任何靈感！";

export const IdeaArchive = observer(() => {
  useEffect(() => {
    cardStore.getArchivedCards();
  }, [cardStore.archivedCards.length]);

  const counts = cardStore.archivedCards.length;

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={counts} />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        <MotionList>
          {cardStore.archivedCards.map((card) => (
            <MotionItem key={card.id}>
              <IdeaCard card={card} />
            </MotionItem>
          ))}
          {!cardStore.archivedCards.length && (
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
