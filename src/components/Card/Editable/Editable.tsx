import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { cardStore } from "../../../store/cardStore";
import { uiStore } from "../../../store/uiStore";

interface EditableProps {
  id: string;
  text: string;
  placeholder: string;
  children: React.ReactNode;
  childRef: React.RefObject<HTMLInputElement> | undefined;
  className?: string;
  [key: string]: any;
}

const Editable = observer(
  ({ id, text, placeholder, children, childRef }: EditableProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    if (!childRef) return;
    const currentText = childRef.current?.value.trim() || text;

    useEffect(() => {
      if (isEditing && childRef) childRef.current?.focus();
      if (currentText === text) return;
      cardStore.updateCard(id, { content: currentText });
      cardStore.updateCardToFirebase(id, { content: currentText });
    }, [isEditing, childRef, currentText]);

    const handleKeyDown = ({ key: keyDown, metaKey }: React.KeyboardEvent) => {
      const keys = ["Escape"];
      if (keys.includes(keyDown)) {
        setIsEditing(false);
        uiStore.stopInputEditing();
      }
      if (keyDown === "Backspace" && metaKey) {
        cardStore.deleteCard(id);
        cardStore.deleteCardFromFireStore(id);
        uiStore.stopInputEditing();
        toast.success("刪除成功");
      }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsEditing(false);
      uiStore.stopInputEditing();
    };

    return (
      <>
        {isEditing ? (
          <form
            className="w-full tracking-wide"
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              uiStore.setInputEditing();
              setIsEditing(true);
            }}
            onBlur={() => {
              uiStore.stopInputEditing();
              setIsEditing(false);
            }}
          >
            {children}
            <button type="submit"></button>
          </form>
        ) : (
          <div
            className="w-full cursor-pointer tracking-wide"
            onClick={() => setIsEditing(true)}
          >
            {text || placeholder || "請輸入您的內容..."}
          </div>
        )}
      </>
    );
  },
);

export default Editable;
