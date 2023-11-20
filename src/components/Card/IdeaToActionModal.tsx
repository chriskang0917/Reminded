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
import { ICard } from "../../store/cardStore";

interface ActionModalProps {
  card: ICard;
  isOpen: boolean;
  onOpenChange: () => void;
}

export const IdeaToActionModal = ({
  card,
  isOpen,
  onOpenChange,
}: ActionModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-2">
              <h1>轉換你的靈感</h1>
              <ul className="my-2 flex gap-2 text-sm">
                <li>
                  <Tooltip className="px-3" content="轉換行動後封存靈感">
                    <Chip size="sm">封存</Chip>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip className="px-3" content="轉換行動後保存靈感">
                    <Chip size="sm">轉換</Chip>
                  </Tooltip>
                </li>
              </ul>
            </ModalHeader>
            <ModalBody>
              <h2 className="text-[0.85rem] tracking-wider text-gray-500">
                以動詞開頭，轉換你的行動...
              </h2>
              <Input defaultValue={card.content} size="sm" variant="bordered" />
              <section className="">
                <p className="text-sm text-slate-500">
                  <strong>範例</strong>：<strong>寫一篇</strong> 500 字的文章、
                  <strong>尋找</strong>公司附近的健身房...
                </p>
              </section>
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button size="sm" color="danger">
                刪除
              </Button>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onPress={onClose}>
                  關閉
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  color="warning"
                  onPress={onClose}
                >
                  封存
                </Button>
                <Button size="sm" color="primary" onPress={onClose}>
                  轉換
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
