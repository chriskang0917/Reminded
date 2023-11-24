import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { WeekStartsOn, cardUtils } from "../../utils/cardUtils";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card";

const Title = "本週靈感";

export const IdeaWeek = observer(() => {
  const cardsOfThisWeek = cardUtils.getThisWeekCardsWith(WeekStartsOn.Sunday);

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        <Divider />
        <ul className="mt-5 grid w-full gap-3">
          {cardsOfThisWeek.map((card) => (
            <li key={card.id}>
              <IdeaCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
