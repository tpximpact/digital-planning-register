import { useEffect } from "react";

const useUnsavedChanges = (currentPage: number) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (currentPage > 1 && currentPage < 6) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentPage]);
};

export default useUnsavedChanges;
