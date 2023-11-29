import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { IdeaThisWeekCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card";

const Title = "本週靈感";

export const IdeaWeek = observer(() => {
  const ideaCardsOfThisWeek = cardStore.getFilteredCardsWith(
    new IdeaThisWeekCards(),
  );

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        <Divider />
        <ul className="mt-5 grid w-full gap-3">
          {ideaCardsOfThisWeek.map((card) => (
            <li key={card.id}>
              <IdeaCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
