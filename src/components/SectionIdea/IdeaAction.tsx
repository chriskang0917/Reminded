import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { AllCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card";

const Title = "已轉換靈感";

export const IdeaAction = observer(() => {
  const transformedCards = cardStore
    .getFilteredCardsWith(new AllCards())
    .filter((card) => card.isTransformed);

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.mainTitle}>{Title}</h1>
      <Divider />
      <ul className="mt-5 grid w-full gap-3">
        {transformedCards.map((card) => (
          <li key={card.id}>
            <IdeaCard card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
});
