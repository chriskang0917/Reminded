import { Chip, Input } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ICard, cardStore } from "../../store/cardStore";

const IdeaCardTags = observer(({ card }: { card: ICard }) => {
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [isTagInputShow, setIsTagInputShow] = useState<boolean>(false);

  useEffect(() => {
    if (isTagInputShow) tagInputRef.current?.focus();
  }, [isTagInputShow]);

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tagInputRef.current) return;
    cardStore.addTag(card.id, tagInputRef.current?.value as string);
    setIsTagInputShow(false);
  };

  return (
    <>
      {card.tags.map((tag: string) => (
        <Chip
          size="sm"
          key={tag}
          className="mt-2 px-2"
          onClose={() => cardStore.deleteTag(card.id, tag)}
        >
          {tag}
        </Chip>
      ))}
      {!isTagInputShow && (
        <IoIosAddCircleOutline
          className="mt-2 h-4 w-4"
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

export default IdeaCardTags;
