import { Button, cn } from "@nextui-org/react";
import { Editor } from "@tiptap/react";
import { Fragment } from "react";
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
      className: editor?.isActive("bold") ? "bg-fourth" : "",
    },
    {
      label: "P",
      onPress: () => editor?.chain().focus().setParagraph().run(),
      className: editor?.isActive("paragraph") ? "bg-fourth" : "",
    },
    {
      label: "H1",
      onPress: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      className: editor?.isActive("heading", { level: 1 }) ? "bg-fourth" : "",
    },
    {
      label: "H2",
      onPress: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      className: editor?.isActive("heading", { level: 2 }) ? "bg-fourth" : "",
    },
    {
      label: "H3",
      onPress: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      className: editor?.isActive("heading", { level: 3 }) ? "bg-fourth" : "",
    },
    {
      label: "Blockquote",
      onPress: () => editor?.chain().focus().toggleBlockquote().run(),
      className: editor?.isActive("blockquote") ? "bg-fourth" : "",
      icon: <LuQuote />,
    },
    {
      label: "OrderedList",
      onPress: () => editor?.chain().focus().toggleOrderedList().run(),
      className: editor?.isActive("orderedList") ? "bg-fourth" : "",
      icon: <AiOutlineOrderedList />,
    },
    {
      label: "BulletList",
      onPress: () => editor?.chain().focus().toggleBulletList().run(),
      className: editor?.isActive("bulletList") ? "bg-fourth" : "",
      icon: <AiOutlineUnorderedList />,
    },
  ];

  return (
    <div className="relative flex flex-wrap justify-start gap-2 md:right-6 md:justify-end md:p-2">
      {ButtonList.map((btn) => (
        <Fragment key={btn.label}>
          <Button
            size="sm"
            variant="bordered"
            radius="sm"
            className={cn(
              "text-md min-w-[40px] border-none p-0 text-secondary",
              btn.className,
            )}
            onClick={btn.onPress}
            isDisabled={btn.isDisabled}
          >
            {btn.icon ? btn.icon : btn.label}
          </Button>
        </Fragment>
      ))}
    </div>
  );
};
