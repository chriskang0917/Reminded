import { Divider } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useSearch } from "../../hooks/useSearch";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card";
import { IdeaSearchInput } from "../Input";

export const IdeaSearch = observer(() => {
  const { text, totalCountsText, searchCountsText, onSearch, results } =
    useSearch("idea");

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.pageTitle}>Search Your Idea</h1>
      <p className={style.infoTitle}>{totalCountsText}</p>
      <IdeaSearchInput searchText={text} onSearch={onSearch} />
      <h2 className={style.pageSubtitle}>Results</h2>
      <Divider />
      <p className={style.infoTitle}>{searchCountsText}</p>
      <ul className="mt-5 grid w-full gap-3">
        {results.map((card) => (
          <li key={card.item.id}>
            <IdeaCard card={card.item} />
          </li>
        ))}
      </ul>
    </div>
  );
});
