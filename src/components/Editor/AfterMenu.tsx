import { Button } from "@nextui-org/react";
import { Editor } from "@tiptap/react";

interface AfterMenuProps {
  editor: Editor | null;
}

export const AfterMenu = ({ editor }: AfterMenuProps) => {
  const ButtonList = [
    {
      label: "Undo",
      onPress: () => editor?.chain().focus().undo().run(),
      isDisabled: !editor?.chain().focus().undo().run(),
    },
    {
      label: "Redo",
      onPress: () => editor?.chain().focus().redo().run(),
      isDisabled: !editor?.chain().focus().redo().run(),
    },
    { label: "B", onPress: () => editor?.chain().focus().toggleBold().run() },
    { label: "P", onPress: () => editor?.chain().focus().setParagraph().run() },
    {
      label: "H1",
      onPress: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "H2",
      onPress: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "H3",
      onPress: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-2">
      {ButtonList.map((btn) => (
        <Button
          size="sm"
          variant="bordered"
          className={editor?.isActive("bold") ? "border-gray-50" : ""}
          key={btn.label}
          onPress={btn.onPress}
        >
          {btn.label}
        </Button>
      ))}
    </div>
  );
};
