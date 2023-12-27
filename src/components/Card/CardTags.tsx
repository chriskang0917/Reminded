import { Chip, Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ICard, cardStore } from "../../store/cardStore";

const CardTags = observer(({ card }: { card: ICard }) => {
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [isTagInputShow, setIsTagInputShow] = useState<boolean>(false);

  useEffect(() => {
    if (isTagInputShow) tagInputRef.current?.focus();
  }, [isTagInputShow]);

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tagInputRef.current) return;
    const newTag = tagInputRef.current?.value;
    const updatedTags = [...card.tags, newTag];
    cardStore.updateCard(card.id, { tags: updatedTags });
    cardStore.updateCardToFirebase(card.id, { tags: updatedTags });
    setIsTagInputShow(false);
  };

  const handleDeleteTag = (tag: string) => {
    const updatedTags = card.tags.filter((t) => t !== tag);
    cardStore.updateCard(card.id, { tags: updatedTags });
    cardStore.updateCardToFirebase(card.id, { tags: updatedTags });
  };

  const textTruncate = (text: string, length: number) => {
    if (text.length > length) return text.substring(0, length) + "...";
    return text;
  };

  return (
    <div className="flex flex-wrap items-center justify-start gap-2">
      {card.tags.map((tag: string) => (
        <Chip
          size="sm"
          key={tag}
          className="select-none px-2"
          onClose={() => handleDeleteTag(tag)}
        >
          {textTruncate(tag, 20)}
        </Chip>
      ))}
      {!isTagInputShow && (
        <IoIosAddCircleOutline
          className="h-4 w-4 cursor-pointer"
          onClick={() => setIsTagInputShow(!isTagInputShow)}
        />
      )}
      {isTagInputShow && (
        <form
          onSubmit={handleTagSubmit}
          className="flex h-5 items-center overflow-y-hidden"
        >
          <Input
            ref={tagInputRef}
            size="sm"
            variant="underlined"
            placeholder="新增標籤..."
            className="w-20"
            onBlur={() => setIsTagInputShow(!isTagInputShow)}
          />
          <button type="submit"></button>
        </form>
      )}
    </div>
  );
});

export default CardTags;
