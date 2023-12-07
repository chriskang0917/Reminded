import { Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { ActionAllCards, cardStore } from "../../store/cardStore";
import { ActionCard } from "../Card";
import { Heading, HeadingDivider } from "../Heading";

const title = "所有行動";
const subtitle = "行動";

export const ActionAll = observer(() => {
  const actionCards = cardStore.getFilteredCardsWith(new ActionAllCards());

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <Heading title={title} subtitle={subtitle} counts={actionCards.length} />
      <HeadingDivider />
      <div className="grid w-full gap-3">
        <ul className="mt-5 grid w-full gap-3">
          {actionCards.map((card) => (
            <li key={card.id}>
              <ActionCard card={card} />
            </li>
          ))}
        </ul>
      </div>
      <Spacer y={10} />
    </div>
  );
});
