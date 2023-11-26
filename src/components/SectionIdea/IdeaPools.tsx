import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { CardsType, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card";

const Title = "所有靈感";

export const IdeaPools = observer(() => {
  const ideaCardsAll = cardStore.getFilteredCardsWith(CardsType.IdeaAll);

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        <Divider />
        <ul className="mt-5 grid w-full gap-3">
          {ideaCardsAll.map((card) => (
            <li key={card.id}>
              <IdeaCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
