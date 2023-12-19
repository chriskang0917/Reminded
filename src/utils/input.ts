import Fuse from "fuse.js";
import { cardStore } from "../store/cardStore";
import { ICard } from "./../store/cardStore";

export const getObjectFilteredTags = (tagInput: string) => {
  const tags = cardStore.getAllTags;
  const filteredTags = tags.filter((tag) => {
    const lowercaseTag = tag?.toLowerCase();
    const lowercaseTagInput = tagInput?.toLowerCase();
    return lowercaseTag?.includes(lowercaseTagInput) && tag !== "";
  });
  if (filteredTags.length === 0)
    return [{ value: tagInput, label: tagInput, isExisted: false }];
  const objectifiedTags = filteredTags.map((tag) => {
    return { value: tag, label: tag, isExisted: true };
  });

  return objectifiedTags;
};

export const getFusedResults = (ideaCards: ICard[], searchText: string) => {
  const fuseOptions = {
    includeMatches: true,
    findAllMatches: true,
    shouldSort: true,
    keys: ["content", "tags", "noteTitle", "noteHTML"],
  };
  const fuse = new Fuse(ideaCards, fuseOptions);
  return fuse.search(searchText);
};

export const getPlainText = (text: string) => {
  return text.replace(/#\[[^\]]+\]\([^)]+\)\s*/g, "") || "";
};

export const getFilteredTags = (text: string) => {
  const regex = /\(([^)]+)\)/g;
  const matches = text.match(regex) || [];

  const filteredMatches = matches.map((match) => {
    let innerRegex = /\(([^)]+)\)/;
    let innerMatch = innerRegex.exec(match);
    return innerMatch ? innerMatch[1] : "";
  });
  return filteredMatches.length > 0 ? filteredMatches : [];
};
