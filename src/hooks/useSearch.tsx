import { useState } from "react";
import { AllCards, cardStore } from "../store/cardStore";
import { getFusedResults } from "../utils/input";

type searchType = "idea" | "action" | "todo" | "note";

const cardType = {
  idea: "靈感",
  action: "行動",
  todo: "待辦",
  note: "筆記",
};

export const useSearch = (type: searchType) => {
  const [searchText, setSearchText] = useState("");

  const filteredCards = cardStore
    .getFilteredCardsWith(new AllCards())
    .filter((card) => card.status === type);
  const results = getFusedResults(filteredCards, searchText);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const searchType = cardType[type];
  const totalCountsText = filteredCards.length
    ? `你已累積 ${filteredCards.length} 個${searchType}`
    : `嘗試記錄你的${searchType}吧！`;

  const searchCountsText = `共有 ${results.length} 個結果符合`;

  return {
    text: searchText,
    searchCountsText,
    total: filteredCards.length,
    totalCountsText,
    setText: setSearchText,
    onSearch: handleSearch,
    results,
  };
};
