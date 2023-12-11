import { observer } from "mobx-react-lite";
import { useSearch } from "../../../hooks/useSearch";
import { IdeaCard } from "../../Card";
import { Heading, HeadingDivider } from "../../Heading";
import { IdeaSearchInput } from "../../Input";

const title = "搜尋靈感";
const subtitle = "靈感";

export const IdeaSearch = observer(() => {
  const { text, total, searchCountsText, onSearch, results } =
    useSearch("idea");

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={total} />
      <IdeaSearchInput searchText={text} onSearch={onSearch} />
      <p className="self-start text-sm text-gray-400">{searchCountsText}</p>
      <HeadingDivider />
      <ul className="mt-5 grid w-full gap-3">
        {results.map((card) => (
          <li key={card.item.id}>
            <IdeaCard card={card.item} />
          </li>
        ))}
      </ul>
    </>
  );
});