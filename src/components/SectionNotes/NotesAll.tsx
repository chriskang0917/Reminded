import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { NotesAllCards, cardStore } from "../../store/cardStore";
import { style } from "../../utils/style";
import { NoteCard } from "../Card/NoteCard";

const Title = "所有筆記";

export const NotesAll = observer(() => {
  const cards = cardStore.getFilteredCardsWith(new NotesAllCards());

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.mainTitle}>{Title}</h1>
      <Divider />
      <ul className="mt-5 grid w-full gap-3">
        {cards.map((card) => (
          <li key={card.id}>
            <NoteCard card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
});
