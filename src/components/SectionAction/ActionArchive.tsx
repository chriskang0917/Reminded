import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { ActionArchiveCards, cardStore } from "../../store/cardStore";
import { ActionCard } from "../Card";
import { Heading, HeadingDivider } from "../Heading";

const title = "已封存行動";
const subtitle = "已封存";

export const ActionArchive = observer(() => {
  const actionTodoCards = cardStore.getFilteredCardsWith(
    new ActionArchiveCards(),
  );

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <Heading
        title={title}
        subtitle={subtitle}
        counts={actionTodoCards.length}
      />
      <HeadingDivider />
      <ul className="grid w-full gap-3">
        {actionTodoCards.map((card) => (
          <li key={card.id}>
            <ActionCard card={card} />
          </li>
        ))}
      </ul>
      <Spacer y={10} />
    </div>
  );
});
