import { Divider } from "@nextui-org/react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { useSearch } from "../../hooks/useSearch";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card";
import { IdeaSearchInput } from "../Input";

export const ActionSearch = observer(() => {
  const { text, ideaCountsText, searchCountsText, onSearch, results } =
    useSearch("action");

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <h1 className={style.mainTitle}>Search Your Actions</h1>
      <p className={style.infoTitle}>{ideaCountsText}</p>
      <IdeaSearchInput searchText={text} onSearch={onSearch} />
      <h2 className={style.subTitle}>Results</h2>
      <Divider />
      <p className={cn(style.infoTitle, "mt-2")}>{searchCountsText}</p>
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
