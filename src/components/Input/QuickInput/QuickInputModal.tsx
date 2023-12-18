import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { FormEvent, useEffect, useState } from "react";
import { QuickInput } from ".";
import { NewCard, cardStore } from "../../../store/cardStore";
import { getFilteredTags, getPlainText } from "../../../utils/input";

export const QuickInputModal = observer(() => {
  const [input, setInput] = useState<string>("");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const tags = cardStore.getAllTags.map((tag) => ({ id: tag, display: tag }));
  const newTag = input.split("#")[input.split("#").length - 1];
  const hasHash = input.includes("#");
  const hasNewTag = newTag !== "" && tags.every((tag) => tag.id !== newTag);
  const newTags = hasNewTag
    ? [{ id: newTag, display: `新增 ${newTag}` }, ...tags]
    : tags;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "n" || e.key === "N" || e.key === "ㄙ") onOpen();
  };

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

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setTimeout(() => setInput(""), 0);
  }, [isOpen]);

  return (
    <Modal
      className="fixed top-20 overflow-visible drop-shadow-xl md:max-w-2xl"
      isOpen={isOpen}
      onClose={onClose}
      backdrop="transparent"
      placement="top"
      isDismissable={false}
      hideCloseButton={true}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalBody className="pt-5">
            <QuickInput
              input={input}
              tags={hasHash && hasNewTag ? newTags : tags}
              onInputChange={handleInputChange}
              onClose={onClose}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit">新增</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});
