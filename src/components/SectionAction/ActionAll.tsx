import { Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { CardsType, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { ActionCard } from "../Card";

const Title = "所有行動";

export const ActionAll = observer(() => {
  const actionTodoCards = cardStore.getFilteredCardsWith(CardsType.ActionTodo);
  const actionCards = cardStore.getFilteredCardsWith(CardsType.ActionAll);
  const executedActionCards = cardStore.executedActionCards;

  useEffect(() => {
    cardStore.getExecutedActionCards();
  }, [cardStore.executedActionCards.length]);

  const actionAllList = [
    { label: "化為待辦的行動", cards: actionTodoCards },
    { label: "所有行動", cards: actionCards },
    { label: "已完成的行動", cards: executedActionCards },
  ];

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        <Divider />
        <Spacer y={5} />
        <ul className="w-full">
          {actionAllList.map((list) => (
            <li key={list.label} className="flex w-full flex-col items-center">
              <div className="flex w-full justify-between">
                <h2 className={style.subTitle}>{list.label}</h2>
              </div>
              <Divider />
              <div className="grid w-full gap-3">
                <ul className="mt-5 grid w-full gap-3">
                  {list.cards.map((card) => (
                    <li key={card.id}>
                      <ActionCard card={card} />
                    </li>
                  ))}
                </ul>
              </div>
              <Spacer y={10} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
