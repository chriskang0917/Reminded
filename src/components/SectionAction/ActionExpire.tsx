import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { ActionExpiredCards, cardStore } from "../../store/cardStore";
import { ActionCard } from "../Card";
import { Heading, HeadingDivider } from "../Heading";

const title = "過期行動";
const subtitle = "行動過期";

export const ActionExpire = observer(() => {
  const actionTodoCards = cardStore.getFilteredCardsWith(
    new ActionExpiredCards(),
  );

  return (
    <>
      <Heading
        title={title}
        subtitle={subtitle}
        counts={actionTodoCards.length}
      />
      <HeadingDivider />
      <ul className="mt-5 grid w-full gap-3">
        {actionTodoCards.map((card) => (
          <li key={card.id}>
            <ActionCard card={card} />
          </li>
        ))}
      </ul>
      <Spacer y={10} />
    </>
  );
});
