import {
  Button,
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
import { useStopShortcut } from "../../../hooks/useStopShortcut";
import { NewCard } from "../../../models/NewCard";
import { ICard, cardStore } from "../../../store/cardStore";

interface ActionModalProps {
  card: ICard;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

interface ButtonProps {
  label: string;
  tooltip?: string;
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

export const IdeaToActionModal = observer(
  ({ card, isOpen, onOpenChange, onClose }: ActionModalProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useStopShortcut(isOpen);
    useEffect(() => {
      if (!isOpen) return;
      inputRef.current?.focus();
      inputRef.current?.select();
    }, [isOpen]);

    const buttonsList: ButtonProps[] = [
      {
        label: "保留靈感",
        variant: "ghost",
        color: "warning",
        tooltip: "新增行動後，會「保留此靈感卡片」在原處",
        onPress: () => {
          const ideaToActionInput = inputRef.current?.value || "";
          if (!ideaToActionInput) return toast.error("請輸入內容");
          const newCard = new NewCard(ideaToActionInput, card.tags, "action");
          cardStore.updateCard(card.id, { isTransformed: true });
          cardStore.updateCardToFirebase(card.id, { isTransformed: true });
          cardStore.addCard(newCard);
          cardStore.addCardToFireStore(newCard);
          toast.success("已新增行動卡片");
          onClose();
        },
      },
      {
        label: "轉換行動",
        color: "primary",
        tooltip: "新增行動後，會「移動此卡片」至封存靈感區",
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
          toast.success("已新增行動卡片");
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

    const modalHeader = (
      <h2 className="text-[0.85rem] tracking-wider text-gray-500">
        以<strong> 動詞 </strong>開頭，將靈感轉換成你的行動...
      </h2>
    );
    const modalExample = (
      <p className="text-slate-500 text-sm">
        <strong>範例</strong>：<strong>寫一篇</strong> 500 字的文章、
        <strong>尋找</strong>公司附近的健身房...
      </p>
    );

    const renderButtons = () => {
      return (
        <>
          <Button size="sm" color="danger" onPress={handleDelete}>
            刪除
          </Button>
          <div className="flex gap-2">
            {buttonsList.map((button) => {
              if (card.isArchived && button.label === "封存") return;
              return (
                <Tooltip
                  key={button.label}
                  content={button.tooltip}
                  placement="bottom"
                  delay={300}
                  closeDelay={100}
                >
                  <Button
                    size="sm"
                    variant={button.variant}
                    color={button.color}
                    onPress={button.onPress}
                  >
                    {button.label}
                  </Button>
                </Tooltip>
              );
            })}
          </div>
        </>
      );
    };

    return (
      <Modal
        className="mx-2 mt-20"
        placement="top-center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex items-center gap-2">
                <h1 className="tracking-wide text-primary">轉換你的靈感</h1>
              </ModalHeader>
              <ModalBody>
                {modalHeader}
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
                {renderButtons()}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  },
);
