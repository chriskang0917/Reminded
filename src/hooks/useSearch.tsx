import { useState } from "react";
import { AllCards, cardStore } from "../store/cardStore";
import { getFusedResults } from "../utils/input";

type searchType = "idea" | "action" | "todo";

export const useSearch = (type: searchType) => {
  const [searchText, setSearchText] = useState("");

  const filteredCards = cardStore
    .getFilteredCardsWith(new AllCards())
    .filter((card) => card.status === type);
  const results = getFusedResults(filteredCards, searchText);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const searchType = type === "idea" ? "靈感" : "行動";
  const ideaCountsText = filteredCards.length
    ? `你已累積 ${filteredCards.length} 個${searchType}`
    : `嘗試記錄你的${searchType}吧！`;

  const searchCountsText = `共有 ${results.length} 個結果符合`;

  return {
    text: searchText,
    searchCountsText,
    ideaCountsText,
    setText: setSearchText,
    onSearch: handleSearch,
    results,
  };
};
