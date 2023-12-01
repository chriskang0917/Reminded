import { Card, Divider } from "@nextui-org/react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { observer } from "mobx-react-lite";
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
  }),
];

interface NoteEditorProps {
  content?: string;
}

const NoteEditor = observer(({ content }: NoteEditorProps) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "p-2 outline-none",
      },
    },
  });

  return (
    <>
      {editor && (
        <Card className="mx-10 max-w-[500px] p-4">
          <>
            <input
              className="mt-5 py-2 pl-2 text-xl font-bold tracking-wider outline-0"
              type="text"
              placeholder="筆記標題"
            />
            <div className="py-2">
              <EditorContent editor={editor} />
              <Divider className="my-4" />
            </div>
            <AfterMenu editor={editor} />
          </>
        </Card>
      )}
    </>
  );
});

export default NoteEditor;
