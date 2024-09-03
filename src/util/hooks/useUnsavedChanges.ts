import { useState, useEffect } from "react";

const useUnsavedChanges = (initialUnsavedState = false) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] =
    useState(initialUnsavedState);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        return;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return [hasUnsavedChanges, setHasUnsavedChanges] as const;
};

export default useUnsavedChanges;
