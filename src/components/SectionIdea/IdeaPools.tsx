import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { IdeaAllCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card";

const Title = "所有靈感";

export const IdeaPools = observer(() => {
  const ideaCardsAll = cardStore.getFilteredCardsWith(new IdeaAllCards());

  return (
    <section>
      <div className="mx-auto mt-10 flex flex-col items-center">
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
