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
import { IoMdAddCircle } from "react-icons/io";
import { QuickInput } from ".";
import { NewCard } from "../../../models/NewCard";
import { cardStore } from "../../../store/cardStore";
import { uiStore } from "../../../store/uiStore";
import { inputs } from "../../../utils/inputs";

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

export const QuickInputModal = observer(() => {
  const [input, setInput] = useState<string>("");
  const [isIdeaInput, setSelected] = useState<boolean>(true);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleKeyDown = (e: KeyboardEvent) => {
    const EscapeKeys = ["Escape"];
    const openKeys = ["N", "n", "ㄙ"];
    const switchKeys = ["I", "i", "ㄛ"];
    const cmdKeys = e.metaKey;

    if (uiStore.getIsInputEditing) return;
    if (isOpen && EscapeKeys.includes(e.key)) onClose();
    if (openKeys.includes(e.key)) onOpen();
    if (switchKeys.includes(e.key) && cmdKeys) setSelected(!isIdeaInput);
  };

  const handleInputChange = (input: string) => {
    setInput(input);
  };

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const filteredTags = inputs.getFilteredTags(input);
    const uniqueTags = [...new Set(filteredTags)];
    const content = inputs.getPlainText(input);
    const status = isIdeaInput ? "idea" : "todo";
    const newCard = new NewCard(content, uniqueTags, status);
    cardStore.addCard(newCard);
    cardStore.addCardToFireStore(newCard);
    onClose();
  };

  const handleShowModal = () => onOpen();
  const handleSwitchInputType = () => {
    setSelected(!isIdeaInput);
    console.log(isIdeaInput);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isIdeaInput]);

  useEffect(() => {
    const timeId = setTimeout(() => setInput(""), 0);
    return () => clearTimeout(timeId);
  }, [isOpen]);

  const tags = cardStore.getAllTags.map((tag) => ({ id: tag, display: tag }));
  const plainInput = inputs.getPlainText(input);
  const newTag = getCurrentHashTag(plainInput);
  const hasHash = plainInput.includes("#");
  const hasNewTag = isNewTagValid(newTag, tags);
  const newTags = getUpdatedTags(hasNewTag, newTag, tags);
  const inputType = getInputType(isIdeaInput as boolean);

  const SwitchButton = () => (
    <Card
      className={cn(
        "h-10 w-10",
        "rounded-lg drop-shadow-md hover:bg-thirdDark",
        "cursor-pointer transition-all",
        isIdeaInput ? "bg-fourthDark" : "bg-fourth",
      )}
    >
      <div
        className="flex h-full w-full items-center justify-center"
        onClick={handleSwitchInputType}
      >
        {isIdeaInput ? <FaRegLightbulb /> : <BsListTask />}
      </div>
    </Card>
  );

  const renderMobileInputToggle = () => {
    return (
      <button
        className="fixed bottom-4 right-7 z-50 block cursor-pointer md:hidden"
        onClick={handleShowModal}
      >
        <IoMdAddCircle className="h-12 w-12 text-third transition-colors hover:text-third" />
      </button>
    );
  };

  return (
    <>
      <Modal
        className="fixed top-20 max-w-[90%] overflow-visible drop-shadow-xl md:right-[calc(50vw-360px)] md:top-8 md:max-w-xl"
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
      {renderMobileInputToggle()}
    </>
  );
});
