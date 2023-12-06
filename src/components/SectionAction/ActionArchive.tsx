import { Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { ActionArchiveCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { ActionCard } from "../Card";

const Title = "已封存的行動";

export const ActionArchive = observer(() => {
  const actionTodoCards = cardStore.getFilteredCardsWith(
    new ActionArchiveCards(),
  );

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.mainTitle}>{Title}</h1>
      <Divider />
      <Spacer y={5} />
      <div className="grid w-full gap-3">
        <ul className="mt-5 grid w-full gap-3">
          {actionTodoCards.map((card) => (
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
