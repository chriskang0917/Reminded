import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { FormEvent, useEffect, useState } from "react";
import { BsListTask } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { QuickInput } from ".";
import { NewCard, cardStore } from "../../../store/cardStore";
import { uiStore } from "../../../store/uiStore";
import { getFilteredTags, getPlainText } from "../../../utils/input";

export const QuickInputModal = observer(() => {
  const [input, setInput] = useState<string>("");
  const [isSelected, setSelected] = useState<boolean>(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleKeyDown = (e: KeyboardEvent) => {
    const EscapeKeys = ["Escape"];
    const openKeys = ["N", "n", "ㄙ"];
    const switchKeys = ["I", "i", "ㄛ"];
    const cmdKeys = e.metaKey;

    if (uiStore.getIsInputEditing) return;
    if (isOpen && EscapeKeys.includes(e.key)) onClose();

    if (openKeys.includes(e.key)) onOpen();
    if (switchKeys.includes(e.key) && cmdKeys) setSelected(!isSelected);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSelected]);

  useEffect(() => {
    const timeId = setTimeout(() => setInput(""), 0);
    () => clearTimeout(timeId);
  }, [isOpen]);

  const handleInputChange = (input: string) => {
    setInput(input);
  };

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const filteredTags = getFilteredTags(input);
    const content = getPlainText(input);
    const newCard = new NewCard(content, filteredTags, "idea");
    cardStore.addCard(newCard);
    cardStore.addCardToFireStore(newCard);
    onClose();
  };

  const extractTags = (): { id: string; display: string }[] => {
    return cardStore.getAllTags.map((tag) => ({ id: tag, display: tag }));
  };

  const getCurrentHashTag = (input: string): string => {
    const regex = /#[^\s\[\]]+(?![^\[]*\])/g;
    const matches = input.match(regex);
    return matches ? matches[0].substring(1) : "";
  };

  const isNewTagValid = (
    newTag: string,
    tags: { id: string; display: string }[],
  ): boolean => {
    return newTag !== "" && tags.every((tag) => tag.id !== newTag);
  };

  const getUpdatedTags = (
    hasNewTag: boolean,
    newTag: string,
    tags: { id: string; display: string }[],
  ): { id: string; display: string }[] => {
    return hasNewTag
      ? [{ id: newTag, display: `新增 ${newTag}` }, ...tags]
      : tags;
  };

  const getInputType = (isSelected: boolean): string => {
    return isSelected ? "靈感" : "待辦";
  };

  const tags = extractTags();
  const plainInput = getPlainText(input);
  const newTag = getCurrentHashTag(plainInput);
  const hasHash = plainInput.includes("#");
  const hasNewTag = isNewTagValid(newTag, tags);
  const newTags = getUpdatedTags(hasNewTag, newTag, tags);
  const inputType = getInputType(isSelected as boolean);

  const SwitchButton = () => (
    <Card
      className={cn(
        "h-10 w-10",
        "flex items-center justify-center",
        "rounded-lg drop-shadow-md hover:bg-fourthDark",
        "transition-all",
        isSelected ? "bg-fourthDark" : "bg-fourth",
      )}
    >
      {isSelected ? <FaRegLightbulb /> : <BsListTask />}
    </Card>
  );

  return (
    <Modal
      className="top-8 overflow-visible drop-shadow-xl md:fixed md:right-[calc(50vw-360px)] md:max-w-xl"
      classNames={{
        backdrop: "backdrop-blur-lg backdrop-opacity-30",
      }}
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="top"
      hideCloseButton={true}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalBody className="pt-5">
            <h1 className="text-lg font-bold tracking-wider text-third">
              新增 {inputType}
            </h1>
            <div className="flex items-center gap-3">
              <SwitchButton />
              <QuickInput
                input={input}
                tags={hasHash && hasNewTag ? newTags : tags}
                onInputChange={handleInputChange}
                onClose={onClose}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" size="sm" variant="shadow">
              新增
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});
