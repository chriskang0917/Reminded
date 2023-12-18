import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { QuickInput } from ".";

export const QuickInputModal = observer(() => {
  const [input, setInput] = useState<string>("Hi");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "i") onOpen();
  };

  const handleInputChange = (input: string) => {
    setInput(input);
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setTimeout(() => setInput(""), 0);
  }, [isOpen]);

  return (
    <Modal
      className="overflow-visible"
      classNames={{
        wrapper: "w-[100vw]",
      }}
      isOpen={isOpen}
      onClose={onClose}
      backdrop="opaque"
      placement="center"
      hideCloseButton={true}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalBody className="pt-5">
          <QuickInput
            input={input}
            onInputChange={handleInputChange}
            onClose={onClose}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>新增</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
