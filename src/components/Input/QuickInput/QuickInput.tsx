import { observer } from "mobx-react-lite";
import { Mention, MentionsInput } from "react-mentions";

const inputStyle = {
  control: {
    borderRadius: "0.5rem",
  },

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
      boxShadow: "0 0 0.5rem 1px rgba(0, 0, 0, 0.3)",
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
  tags: { id: string; display: string }[];
  onInputChange: (input: string) => void;
  onClose?: () => void;
}

export const QuickInput = observer((props: QuickInputProps) => {
  const { input, tags, onInputChange } = props;

  const handleInputChange = (e: { target: { value: string } }) => {
    onInputChange(e.target.value);
  };

  return (
    <div className="relative w-full rounded-lg border-2 px-3 py-2">
      <MentionsInput
        autoFocus
        singleLine
        className="tracking-wider transition-all"
        style={inputStyle}
        value={input || ""}
        placeholder="輸入你的靈感或待辦"
        onChange={handleInputChange}
      >
        <Mention
          trigger="#"
          data={tags}
          className="inline-block rounded-md bg-fourth tracking-wider"
          style={mentionStyle}
          appendSpaceOnAdd
          markup="#[__display__](__id__)"
          displayTransform={(display) => ` #${display} `}
        />
      </MentionsInput>
    </div>
  );
});