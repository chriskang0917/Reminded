import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { authStore } from "../../store/authStore";
import { cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card";

const Title = "已封存靈感";

export const IdeaArchive = observer(() => {
  useEffect(() => {
    cardStore.getArchivedCards();
  }, [authStore.uid]);

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>{Title}</h1>
        <Divider />
        <ul className="mt-5 grid w-full gap-3">
          {cardStore.archivedCards.map((card) => (
            <li key={card.id}>
              <IdeaCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
