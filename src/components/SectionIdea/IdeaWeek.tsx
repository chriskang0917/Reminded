import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { WeekStartsOn, cardUtils } from "../../utils/cardUtils";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card";

const Title = "本週靈感";

export const IdeaWeek = observer(() => {
  const cardsOfThisWeek = cardUtils.getThisWeekIdeaCardsWith(
    WeekStartsOn.Sunday,
  );
  const IdeaCardOfThisWeek = cardsOfThisWeek.filter(
    (card) => card.status === "idea",
  );

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        <Divider />
        <ul className="mt-5 grid w-full gap-3">
          {IdeaCardOfThisWeek.map((card) => (
            <li key={card.id}>
              <IdeaCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
