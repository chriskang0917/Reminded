import { Divider, cn } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useSearch } from "../../hooks/useSearch";
import { NewNote } from "../../store/cardStore";
import { style } from "../../utils/style";
import { NoteCard } from "../Card/NoteCard";
import { IdeaSearchInput } from "../Input";

export const NoteSearch = observer(() => {
  const { text, totalCountsText, searchCountsText, onSearch, results } =
    useSearch("note");

  return (
    <div className="relative mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.pageTitle}>Search Your Notes</h1>
      <p className={style.infoTitle}>{totalCountsText}</p>
      <IdeaSearchInput searchText={text} onSearch={onSearch} />
      <h2 className={style.pageSubtitle}>Results</h2>
      <Divider />
      <p className={cn(style.infoTitle, "mt-2")}>{searchCountsText}</p>
      <ul className="mt-5 grid w-full gap-3">
        {results.map((card) => (
          <li key={card.item.id}>
            <NoteCard note={card.item as NewNote} />
          </li>
        ))}
      </ul>
    </div>
  );
});
