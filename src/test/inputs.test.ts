import { describe, expect, it } from "vitest";
import { inputs } from "../utils/inputs";

describe("getPlainText", () => {
  const { getPlainText } = inputs;

  const testCases = [
    {
      input: "#新 #[娛樂](娛樂) 哈哈 #[新增 123](123) 你好",
      expected: "#新 哈哈 你好",
    },
    {
      input: "這是一個 #[測試](測試) 用的句子",
      expected: "這是一個 用的句子",
    },
    {
      input: "#[測試123](測試123) 這也是另一個#測試 句子",
      expected: "這也是另一個#測試 句子",
    },
    {
      input: "#ABC #[DEF](GHI) 這個句子排除了 #[不需要的文字](123)",
      expected: "#ABC 這個句子排除了",
    },
  ];

  testCases.forEach((testCase, index) => {
    it(`Case ${index + 1}: should remove hashtags and markdown links`, () => {
      const text = testCase.input;
      const result = getPlainText(text);
      expect(result).to.equal(testCase.expected);
    });
  });
});
