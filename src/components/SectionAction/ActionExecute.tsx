import { Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { CardsType, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { ActionCard } from "../Card";

const Title = "已執行的行動";

export const ActionExecute = observer(() => {
  const actionTodoCards = cardStore.getFilteredCardsWith(
    CardsType.ExecutedAction,
  );

  useEffect(() => {
    cardStore.getArchivedCards();
  }, [cardStore.archivedCards.length]);

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
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
    </section>
  );
});
