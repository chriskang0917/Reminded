import { cardStore } from "../store/cardStore";

export const getObjectFilteredTags = (tagInput: string) => {
  const tags = cardStore.getAllTags();
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

export const isLastCharacterChinese = (text: string) => {
  // 使用正則表達式檢查最後一個字是否是中文
  const chineseRegex = /[\u4E00-\u9FFF]$/; // 此正則表示中文的範圍
  return chineseRegex.test(text.charAt(text.length - 1));
};
