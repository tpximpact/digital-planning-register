"use client";
import { useRef, useEffect, useState } from "react";

const DescriptionCard = ({ description }: any) => {
  const commentContainerRef = useRef<HTMLDivElement>(null);
  const [newDescription, setNewDescription] = useState(description);
  const [continuedText, setContinuedText] = useState<any>();

  useEffect(() => {
    const checkOverflow = () => {
      const current = commentContainerRef.current;
      if (current) {
        const isOverflow = current.scrollHeight > 250;
        if (isOverflow) {
          setNewDescription(
            current?.textContent?.slice(0, 350).trim().concat(`...`),
          );
          setContinuedText(
            <span style={{ fontStyle: "italic" }}>(continued)</span>,
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
      {newDescription} {continuedText}
    </p>
  );
};

export default DescriptionCard;
