import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { cardStore } from "../store/cardStore";

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
      if (keys.includes(keyDown)) setIsEditing(false);
      if (keyDown === "Backspace" && metaKey) {
        cardStore.deleteCard(id);
        cardStore.deleteCardFromFireStore(id);
      }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsEditing(false);
    };

    return (
      <section>
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsEditing(false)}
          >
            {children}
            <button type="submit"></button>
          </form>
        ) : (
          <div onClick={() => setIsEditing(true)}>
            <div className="w-[300px] tracking-wide">
              {text || placeholder || "請輸入您的內容..."}
            </div>
          </div>
        )}
      </section>
    );
  },
);

export default Editable;
