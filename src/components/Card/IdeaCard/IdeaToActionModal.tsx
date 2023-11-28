import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { ICard, NewCard, cardStore } from "../../../store/cardStore";

interface ActionModalProps {
  card: ICard;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

interface ButtonProps {
  label: "刪除" | "關閉" | "封存" | "轉換";
  color?:
    | "danger"
    | "primary"
    | "warning"
    | "success"
    | "secondary"
    | undefined;
  variant?:
    | "ghost"
    | "shadow"
    | "bordered"
    | "flat"
    | "faded"
    | "solid"
    | "light"
    | undefined;
  onPress: () => void;
}

const toolTipList = [
  {
    label: "轉換",
    content: "轉換行動後保留靈感",
  },
  {
    label: "封存",
    content: "轉換行動後封存靈感",
  },
];

export const IdeaToActionModal = observer(
  ({ card, isOpen, onOpenChange, onClose }: ActionModalProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (!isOpen) return;
      inputRef.current?.focus();
      inputRef.current?.select();
    }, [isOpen]);

    const buttonsList: ButtonProps[] = [
      {
        label: "轉換",
        variant: "ghost",
        color: "warning",
        onPress: () => {
          const ideaToActionInput = inputRef.current?.value || "";
          if (!ideaToActionInput) return toast.error("請輸入內容");
          const newCard = new NewCard(ideaToActionInput, card.tags, "action");
          cardStore.updateCard(card.id, { isTransformed: true });
          cardStore.updateCardToFirebase(card.id, { isTransformed: true });
          cardStore.addCard(newCard);
          cardStore.addCardToFireStore(newCard);
          toast.success("轉換成功");
          onClose();
        },
      },
      {
        label: "封存",
        color: "primary",
        onPress: () => {
          const ideaToActionInput = inputRef.current?.value || "";
          if (!ideaToActionInput) return toast.error("請輸入內容");
          const newCard = new NewCard(ideaToActionInput, card.tags, "action");
          cardStore.updateCard(card.id, {
            isArchived: true,
            isTransformed: true,
          });
          cardStore.updateCardToFirebase(card.id, {
            isArchived: true,
            isTransformed: true,
          });
          cardStore.addCard(newCard);
          cardStore.addCardToFireStore(newCard);
          toast.success("封存成功");
          onClose();
        },
      },
    ];

    const handleDelete = () => {
      onClose();
      cardStore.deleteCard(card.id);
      cardStore.deleteCardFromFireStore(card.id);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      buttonsList[1].onPress();
    };

    const modalHeader = "以動詞開頭，轉換你的行動...";
    const modalExample = (
      <p className="text-sm text-slate-500">
        <strong>範例</strong>：<strong>寫一篇</strong> 500 字的文章、
        <strong>尋找</strong>公司附近的健身房...
      </p>
    );

    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex items-center gap-2">
                <h1>轉換你的靈感</h1>
                <ul className="my-2 flex gap-2 text-sm">
                  {toolTipList.map((toolTip) => (
                    <li key={toolTip.label}>
                      <Tooltip className="px-3" content={toolTip.content}>
                        <Chip size="sm">{toolTip.label}</Chip>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </ModalHeader>
              <ModalBody>
                <h2 className="text-[0.85rem] tracking-wider text-gray-500">
                  {modalHeader}
                </h2>
                <form onSubmit={handleSubmit}>
                  <Input
                    ref={inputRef}
                    defaultValue={card.content}
                    size="sm"
                    variant="bordered"
                  />
                  <button type="submit"></button>
                </form>
                <section>{modalExample}</section>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button size="sm" color="danger" onPress={handleDelete}>
                  刪除
                </Button>
                <div className="flex gap-2">
                  {buttonsList.map((button) => {
                    if (card.isArchived && button.label === "封存") return;
                    return (
                      <Button
                        key={button.label}
                        size="sm"
                        variant={button.variant}
                        color={button.color}
                        onPress={button.onPress}
                      >
                        {button.label}
                      </Button>
                    );
                  })}
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  },
);
