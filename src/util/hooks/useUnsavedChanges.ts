import { useState, useEffect } from "react";

const useUnsavedChanges = (initialUnsavedState = false, currentPage = 0) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] =
    useState(initialUnsavedState);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (
        (currentPage > 1 && currentPage < 6) ||
        (currentPage > 1 && currentPage < 6 && hasUnsavedChanges)
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges, currentPage]);

  return [hasUnsavedChanges, setHasUnsavedChanges] as const;
};

export default useUnsavedChanges;
