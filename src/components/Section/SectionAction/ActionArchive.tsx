import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ActionArchiveCards, cardStore } from "../../../store/cardStore";
import { ActionCard } from "../../Card";
import EmptyCard from "../../Card/EmptyCard";
import { Heading, HeadingDivider } from "../../Heading";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";
import SectionShadow from "../SectionShadow";

const title = "已封存行動";
const subtitle = "已封存";
const placeholder = "從轉換你的靈感開始吧！";

export const ActionArchive = observer(() => {
  const actionTodoCards = cardStore.getFilteredCardsWith(
    new ActionArchiveCards(),
  );

  useEffect(() => {
    cardStore.getArchivedCards();
  }, []);

  return (
    <>
      <Heading
        title={title}
        subtitle={subtitle}
        counts={actionTodoCards.length}
      />
      <HeadingDivider />
      <SectionShadow className="h-[calc(100svh-170px)]">
        <MotionList>
          {actionTodoCards.map((card) => (
            <MotionItem key={card.id}>
              <ActionCard card={card} />
            </MotionItem>
          ))}
          {!actionTodoCards.length && (
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
