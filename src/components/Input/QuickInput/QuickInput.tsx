import { observer } from "mobx-react-lite";
import { Mention, MentionsInput } from "react-mentions";
import { cardStore } from "../../../store/cardStore";

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
      zIndex: 99999,
      position: "relative",
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

interface QuickInputProps {
  input: string;
  onInputChange: (input: string) => void;
  onClose?: () => void;
}

export const QuickInput = observer((props: QuickInputProps) => {
  const { input, onInputChange, onClose } = props;
  const tags = cardStore.getAllTags.map((tag) => ({ id: tag, display: tag }));

  const handleInputChange = (e: { target: { value: string } }) => {
    onInputChange(e.target.value);
  };

  return (
    <div className="relative w-full rounded-lg border-2 px-3 py-2">
      <MentionsInput
        autoFocus
        singleLine
        className="tracking-wider"
        style={inputStyle}
        value={input || ""}
        placeholder="輸入你的靈感或待辦"
        onChange={handleInputChange}
        onBlur={onClose}
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
