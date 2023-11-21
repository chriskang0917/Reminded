import { Divider } from "@nextui-org/react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { cardStore } from "../../store/cardStore";
import { getFusedResults } from "../../utils/input";
import { style } from "../../utils/style";
import { IdeaCard } from "../Card";
import { IdeaSearchInput } from "../Input";

export const Search = observer(() => {
  const [searchText, setSearchText] = useState("");

  const ideaCards = cardStore.getFilteredCardsWith("idea");
  const results = getFusedResults(ideaCards, searchText);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const ideaCounts = ideaCards.length
    ? `你已累積 ${ideaCards.length} 個靈感`
    : `嘗試記錄你的靈感吧！`;
  const searchCounts = `共有 ${results.length} 個結果符合`;

  return (
    <section className="ml-52">
      <div className="mx-auto mt-10 flex max-w-[500px] flex-col items-center">
        <h1 className={style.mainTitle}>Search Your Idea</h1>
        <p className={style.infoTitle}>{ideaCounts}</p>
        <IdeaSearchInput searchText={searchText} onSearch={handleSearch} />
        <h2 className={style.subTitle}>Results</h2>
        <Divider />
        <p className={cn(style.infoTitle, "mt-2")}>{searchCounts}</p>
        <ul className="mt-5 grid w-full gap-3">
          {results.map((card) => (
            <li key={card.item.id}>
              <IdeaCard card={card.item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
