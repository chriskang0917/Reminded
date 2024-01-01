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

export const QuickInput = (props: QuickInputProps) => {
  const { input, tags, onInputChange } = props;

  const handleInputChange = (e: { target: { value: string } }) => {
    onInputChange(e.target.value);
  };

  return (
    <div className="relative mr-2 w-full rounded-lg border-2 px-3 py-2 md:max-w-[465px]">
      <MentionsInput
        autoFocus
        singleLine
        className="tracking-wider transition-all"
        style={inputStyle}
        value={input || ""}
        placeholder={"+  按下 'Enter' 以新增卡片"}
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
};
