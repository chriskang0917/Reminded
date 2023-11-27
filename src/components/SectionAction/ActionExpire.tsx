import { Divider, Spacer } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { CardsType, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { ActionCard } from "../Card";

const Title = "已過期的行動待辦";

export const ActionExpire = observer(() => {
  const actionTodoCards = cardStore.getFilteredCardsWith(
    CardsType.ActionExpired,
  );

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
