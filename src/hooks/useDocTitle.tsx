import { useEffect } from "react";

function useDocTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocTitle;
