import { Button } from "@nextui-org/react";
import { Editor } from "@tiptap/react";
import cn from "classnames";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { BiRedo, BiUndo } from "react-icons/bi";
import { LuQuote } from "react-icons/lu";

interface AfterMenuProps {
  editor: Editor | null;
}

export const AfterMenu = ({ editor }: AfterMenuProps) => {
  const ButtonList = [
    {
      label: "Undo",
      onPress: () => editor?.chain().focus().undo().run(),
      isDisabled: !editor?.can().chain().undo().run(),
      icon: <BiUndo />,
    },
    {
      label: "Redo",
      onPress: () => editor?.chain().focus().redo().run(),
      isDisabled: !editor?.can().chain().redo().run(),
      icon: <BiRedo />,
    },
    {
      label: "B",
      onPress: () => editor?.chain().focus().toggleBold().run(),
      className: editor?.isActive("bold") ? "bg-gray-200" : "",
    },
    {
      label: "P",
      onPress: () => editor?.chain().focus().setParagraph().run(),
      className: editor?.isActive("paragraph") ? "bg-gray-200" : "",
    },
    {
      label: "H1",
      onPress: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      className: editor?.isActive("heading", { level: 1 }) ? "bg-gray-200" : "",
    },
    {
      label: "H2",
      onPress: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      className: editor?.isActive("heading", { level: 2 }) ? "bg-gray-200" : "",
    },
    {
      label: "H3",
      onPress: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      className: editor?.isActive("heading", { level: 3 }) ? "bg-gray-200" : "",
    },
    {
      label: "Blockquote",
      onPress: () => editor?.chain().focus().toggleBlockquote().run(),
      className: editor?.isActive("blockquote") ? "bg-gray-200" : "",
      icon: <LuQuote />,
    },
    {
      label: "OrderedList",
      onPress: () => editor?.chain().focus().toggleOrderedList().run(),
      className: editor?.isActive("orderedList") ? "bg-gray-200" : "",
      icon: <AiOutlineOrderedList />,
    },
    {
      label: "BulletList",
      onPress: () => editor?.chain().focus().toggleBulletList().run(),
      className: editor?.isActive("bulletList") ? "bg-gray-200" : "",
      icon: <AiOutlineUnorderedList />,
    },
  ];

  return (
    <div className="relative right-6 flex flex-wrap justify-end gap-2 p-2">
      {ButtonList.map((btn) => (
        <>
          <Button
            size="sm"
            variant="bordered"
            radius="sm"
            className={cn(
              btn.className,
              "text-md min-w-[40px] border-none p-0",
            )}
            key={btn.label}
            onClick={btn.onPress}
            isDisabled={btn.isDisabled}
          >
            {btn.icon ? btn.icon : btn.label}
          </Button>
        </>
      ))}
    </div>
  );
};
