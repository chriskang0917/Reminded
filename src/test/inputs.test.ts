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

  it("Case1: should get '#新 哈哈 你好' from '#新 #[娛樂](娛樂) 哈哈 #[新增 123](123) 你好'", () => {
    const result = getPlainText(testCases[0].input);
    expect(result).to.equal(testCases[0].expected);
  });

  it("Case2: should get '這是一個 用的句子' from '這是一個 #[測試](測試) 用的句子'", () => {
    const result = getPlainText(testCases[1].input);
    expect(result).to.equal(testCases[1].expected);
  });

  it("Case3: should get '#ABC 這個句子排除了' from '#ABC #[DEF](GHI) 這個句子排除了 #[不需要的文字](123)'", () => {
    const result = getPlainText(testCases[2].input);
    expect(result).to.equal(testCases[2].expected);
  });

  it("Case4: should get '這也是另一個#測試 句子' from '#[測試123](測試123) 這也是另一個#測試 句子'", () => {
    const result = getPlainText(testCases[3].input);
    expect(result).to.equal(testCases[3].expected);
  });
});

describe("getFilteredTags", () => {
  const { getFilteredTags } = inputs;

  const testCases = [
    {
      input: "一個 #[測試](測試) 文本",
      expected: ["測試"],
    },
    {
      input: " #[測試](測試) 這是一個 #[測試](測試) 文本(連續##@#$)",
      expected: ["測試"],
    },
    {
      input: "你好 #[測試](測試) 這是一個文本 #[測試2](測試2) (123)",
      expected: ["測試", "測試2"],
    },
    {
      input:
        "#[測試2](測試2) 你好 #[測試](測試) 這是一個文本 #[測試2](測試2) (123) #[測試3](測試3)",
      expected: ["測試2", "測試", "測試3"],
    },
  ];

  it("Case1: should get ['測試'] from '這是一個 #[測試](測試) 文本", () => {
    const result = getFilteredTags(testCases[0].input);
    expect(result).toStrictEqual(testCases[0].expected);
  });

  it("Case2: should get ['測試'] from ' #[測試](測試) 這是一個 #[測試](測試) 文本(連續##@#$)", () => {
    const result = getFilteredTags(testCases[1].input);
    expect(result).toStrictEqual(testCases[1].expected);
  });

  it("Case3: should get ['測試', '測試2'] from '你好 #[測試](測試) 這是一個文本 #[測試2](測試2) (123)", () => {
    const result = getFilteredTags(testCases[2].input);
    expect(result).toStrictEqual(testCases[2].expected);
  });

  it("Case4: should get ['測試', '測試2'] from '#[測試2](測試2) 你好 #[測試](測試) 這是一個文本 #[測試2](測試2) (123) #[測試3](測試3)", () => {
    const result = getFilteredTags(testCases[3].input);
    expect(result).toStrictEqual(testCases[3].expected);
  });
});
