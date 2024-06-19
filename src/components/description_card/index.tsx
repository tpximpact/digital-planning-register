"use client";
import { useRef, useEffect, useState } from "react";

const DescriptionCard = ({ description }: any) => {
  const commentContainerRef = useRef<HTMLDivElement>(null);
  const [newDescription, setNewDescription] = useState(description);
  const [isOverflow, setIsOverflow] = useState(false);
  const continuedText = (
    <span style={{ fontStyle: "italic" }}>(continued)</span>
  );
  useEffect(() => {
    const checkOverflow = () => {
      const current = commentContainerRef.current;
      if (current) {
        const isOverflow = current.scrollHeight > 25 * 16;
        setIsOverflow(isOverflow);
        if (isOverflow) {
          setNewDescription(
            current?.textContent?.slice(0, 350).trim().concat(`...`),
          );
        }
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [description]);
  return (
    <p className="govuk-body" ref={commentContainerRef}>
      {newDescription} {isOverflow ? continuedText : ""}
    </p>
  );
};

export default DescriptionCard;
