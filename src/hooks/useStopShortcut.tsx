import { useEffect, useRef } from "react";
import { uiStore } from "../store/uiStore";

export const useStopShortcut = (isOpen: boolean) => {
  const prevIsOpen = useRef<boolean | null>(null);

  useEffect(() => {
    if (prevIsOpen.current && !isOpen) uiStore.stopInputEditing();
    prevIsOpen.current = isOpen;
  }, [isOpen, prevIsOpen.current]);
};
