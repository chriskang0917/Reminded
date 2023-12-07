import { observer } from "mobx-react-lite";
import { useSearch } from "../../hooks/useSearch";
import { IdeaCard } from "../Card";
import { Heading, HeadingDivider } from "../Heading";
import { IdeaSearchInput } from "../Input";

const title = "搜尋行動";
const subtitle = "行動";

export const ActionSearch = observer(() => {
  const { text, total, searchCountsText, onSearch, results } =
    useSearch("action");

  return (
    <>
      <Heading title={title} subtitle={subtitle} counts={total} />
      <IdeaSearchInput searchText={text} onSearch={onSearch} placeholder="" />
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
