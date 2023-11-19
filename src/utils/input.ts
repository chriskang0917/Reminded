import { cardStore } from "../store/cardStore";

export const getFilteredTags = (tagInput: string) => {
  const tags = cardStore.getAllTags();
  const emptyTagPlaceholder = [`新增 ${tagInput}`];
  const filteredTags = tags.filter(
    (tag) =>
      tag.toLowerCase().includes(tagInput.toLowerCase()) && tag.length > 0,
  );

  if (filteredTags.length === 0) return emptyTagPlaceholder;
  return filteredTags;
};
