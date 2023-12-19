import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  VisuallyHidden,
  useDisclosure,
  useSwitch,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { FormEvent, useEffect, useRef, useState } from "react";
import { QuickInput } from ".";
import { NewCard, cardStore } from "../../../store/cardStore";
import { getFilteredTags, getPlainText } from "../../../utils/input";

export const QuickInputModal = observer(() => {
  const [input, setInput] = useState<string>("");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch();
  const switchRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "n" || e.key === "N" || e.key === "ㄙ") onOpen();
    if (e.key === "i" && e.metaKey) switchRef.current?.click();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setTimeout(() => setInput(""), 0);
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

  const tags = cardStore.getAllTags.map((tag) => ({ id: tag, display: tag }));
  const newTag = input.split("#")[input.split("#").length - 1];
  const hasHash = input.includes("#");
  const hasNewTag = newTag !== "" && tags.every((tag) => tag.id !== newTag);
  const newTags = hasNewTag
    ? [{ id: newTag, display: `新增 ${newTag}` }, ...tags]
    : tags;

  return (
    <Modal
      className="fixed right-[calc(50vw-360px)] top-8 overflow-visible drop-shadow-xl md:max-w-xl"
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
              新增靈感
            </h1>
            <div className="flex">
              <Component {...getBaseProps()}>
                <VisuallyHidden>
                  <input {...getInputProps()} />
                </VisuallyHidden>
                <div
                  {...getWrapperProps()}
                  ref={switchRef}
                  className={slots.wrapper({
                    class: [
                      "h-10 w-10",
                      "flex items-center justify-center",
                      "rounded-lg hover:bg-fourthDark",
                      "group-data-[selected=true]:bg-fourthDark",
                    ],
                  })}
                >
                  {isSelected ? "✓" : "✕"}
                </div>
              </Component>
              <QuickInput
                input={input}
                tags={hasHash && hasNewTag ? newTags : tags}
                onInputChange={handleInputChange}
                onClose={onClose}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" size="sm" variant="ghost">
              新增
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});
