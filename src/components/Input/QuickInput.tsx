import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { cardStore } from "../../store/cardStore";

const inputStyle = {
  "&singleLine": {
    input: {
      background: "transparent",
      border: "none",
      outline: "none",
    },
  },
  suggestions: {
    list: {
      padding: "4px",
      borderRadius: "0.5rem",
      backgroundColor: "#fff",
      boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.3)",
    },
    item: {
      borderRadius: "0.5rem",
      color: "#32435F",
      padding: "1px 8px",
      transition: "all 0.1s ease",
      "&focused": {
        backgroundColor: "#E1DCD9",
      },
    },
  },
};

const mentionStyle = {
  backgroundColor: "#E1DCD9",
};

export const QuickInput = observer(() => {
  const [input, setInput] = useState<string>("");
  const tags = cardStore.getAllTags.map((tag) => ({ id: tag, display: tag }));

  const handleInputChange = (e: { target: { value: string } }) => {
    setInput(e.target.value);
  };

  return (
    <div className="relative w-full">
      <MentionsInput
        singleLine
        className="tracking-wider"
        style={inputStyle}
        value={input}
        placeholder="輸入你的靈感或待辦"
        onChange={handleInputChange}
      >
        <Mention
          trigger="#"
          className="inline-block rounded-md bg-fourth tracking-wider"
          style={mentionStyle}
          appendSpaceOnAdd
          displayTransform={(display) => ` #${display} `}
          data={tags}
        />
      </MentionsInput>
    </div>
  );
});
