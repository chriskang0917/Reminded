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
    setIsTagInputShow(false);
  };

  return (
    <>
      {card.tags[0] !== "" &&
        card.tags.map((tag: string) => (
          <Chip
            size="sm"
            key={tag}
            className="mt-2 px-2"
            onClose={() => cardStore.deleteCardTag(card.id, tag)}
          >
            {tag}
          </Chip>
        ))}
      {!isTagInputShow && (
        <IoIosAddCircleOutline
          className="mt-2 h-4 w-4 cursor-pointer"
          onClick={() => setIsTagInputShow(!isTagInputShow)}
        />
      )}
      {isTagInputShow && (
        <form onSubmit={handleTagSubmit}>
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
    </>
  );
});

export default CardTags;
