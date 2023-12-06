import { Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { ActionAllCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { ActionCard } from "../Card";

const Title = "所有行動";

export const ActionAll = observer(() => {
  const actionCards = cardStore.getFilteredCardsWith(new ActionAllCards());

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.mainTitle}>{Title}</h1>
      <Divider />
      <Spacer y={3} />
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
