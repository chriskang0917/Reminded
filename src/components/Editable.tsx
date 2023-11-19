import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { cardStore } from "../store/cardStore";

interface EditableProps {
  id: string;
  text: string;
  placeholder: string;
  children: React.ReactNode;
  childRef: React.RefObject<HTMLInputElement>;
  className?: string;
  [key: string]: any;
}

const Editable = observer(
  ({ id, text, placeholder, children, childRef }: EditableProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const currentText = childRef.current?.value || text;

    useEffect(() => {
      if (isEditing && childRef) childRef.current?.focus();
      if (currentText !== text) cardStore.updateCardContent(id, currentText);
    }, [isEditing, childRef, currentText]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key: keyDown } = event;
      const keys = ["Escape", "Tab", "Enter"];
      if (keys.includes(keyDown)) setIsEditing(false);
    };

    return (
      <section>
        {isEditing ? (
          <div onBlur={() => setIsEditing(false)} onKeyDown={handleKeyDown}>
            {children}
          </div>
        ) : (
          <div onClick={() => setIsEditing(true)}>
            <div>{text || placeholder || "請輸入您的內容..."}</div>
          </div>
        )}
      </section>
    );
  },
);

export default Editable;
