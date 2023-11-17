import { useEffect, useRef, useState } from "react";

interface EditableProps {
  text: string;
  placeholder: string;
  children: React.ReactNode;
  childRef: React.RefObject<HTMLDivElement>;
  className?: string;
  [key: string]: any;
}

const Editable = ({ text, placeholder, children, childRef }: EditableProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing && childRef) childRef.current?.focus();
  }, [isEditing, childRef]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
    }
  }, [isEditing, text]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key: keyDown } = event;

    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];

    if (allKeys.includes(keyDown)) setIsEditing(false);
  };

  return (
    <section>
      {isEditing ? (
        <div onBlur={() => setIsEditing(false)} onKeyDown={handleKeyDown}>
          {children}
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <div ref={inputRef}>{text || placeholder || "請輸入您的內容..."}</div>
        </div>
      )}
    </section>
  );
};

export default Editable;
