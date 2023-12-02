import { ScrollShadow, Spacer } from "@nextui-org/react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { observer } from "mobx-react-lite";
import { ICard } from "../../store/cardStore";
import { AfterMenu } from "./AfterMenu";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: "editor-heading",
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: "tracking-wide leading-7",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-gray-300 pl-3 ml-2 my-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal my-3 ml-2",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "my-3",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "list-style ml-2",
      },
    },
  }),
];

interface NoteEditorProps {
  card: ICard;
  onClose?: () => void;
}

const NoteEditor = observer(({ card }: NoteEditorProps) => {
  const editor = useEditor({
    extensions,
    content: card.content,
    editorProps: {
      attributes: {
        class: "py-2 outline-none min-h-[250px] text-primary",
      },
    },
    // onUpdate: ({ editor }) => {
    //   const html = editor.getHTML();
    //   console.log(html);
    // },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <input
        className="py-2 text-xl font-bold tracking-wider outline-0"
        type="text"
        placeholder="筆記標題"
      />
      <div className="py-2">
        <ScrollShadow hideScrollBar className="h-[250px]">
          <EditorContent editor={editor} />
        </ScrollShadow>
      </div>
      <Spacer y={2} />
      <div className="relative flex justify-between">
        <AfterMenu editor={editor} />
      </div>
    </>
  );
});

export default NoteEditor;
