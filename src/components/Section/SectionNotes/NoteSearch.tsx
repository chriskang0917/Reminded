import { observer } from "mobx-react-lite";
import { useSearch } from "../../../hooks/useSearch";
import { NewNote } from "../../../store/cardStore";
import { NoteCard } from "../../Card/NoteCard";
import { Heading, HeadingDivider } from "../../Heading";
import { IdeaSearchInput } from "../../Input";
import MotionItem from "../../Motion/MotionItem";
import MotionList from "../../Motion/MotionList";

const title = "搜尋筆記";
const subtitle = "筆記";

export const NoteSearch = observer(() => {
  const { text, total, searchCountsText, onSearch, results } =
    useSearch("note");

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={total} />
      <IdeaSearchInput searchText={text} onSearch={onSearch} />
      <p className="self-start text-sm text-gray-400">{searchCountsText}</p>
      <HeadingDivider />
      <MotionList>
        <ul className="mt-5 grid w-full gap-3">
          {results.map((card) => (
            <MotionItem key={card.item.id}>
              <NoteCard note={card.item as NewNote} />
            </MotionItem>
          ))}
        </ul>
      </MotionList>
    </>
  );
});
