import Fuse from "fuse.js";
import { cardStore } from "../store/cardStore";
import { ICard } from "./../store/cardStore";

export const getObjectFilteredTags = (tagInput: string) => {
  const tags = cardStore.getAllTags;
  const filteredTags = tags.filter((tag) => {
    const lowercaseTag = tag?.toLowerCase();
    const lowercaseTagInput = tagInput?.toLowerCase();
    return lowercaseTag.includes(lowercaseTagInput) && tag.length > 0;
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
    keys: ["content", "tags"],
  };
  const fuse = new Fuse(ideaCards, fuseOptions);
  return fuse.search(searchText);
};
