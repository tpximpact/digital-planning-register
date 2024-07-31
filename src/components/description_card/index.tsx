"use client";
import React, { useRef, useEffect, useState } from "react";

/**
 * This component displays the description passed to it
 * Max description length is 640 characters
 * if theres a map then the max is 350 characters
 * @param descrption
 * @returns
 */
const DescriptionCard = ({ description }: any) => {
  const commentContainerRef = useRef<HTMLDivElement>(null);
  const [newDescription, setNewDescription] = useState(description);
  const [continuedText, setContinuedText] = useState<any>();

  useEffect(() => {
    const checkOverflow = () => {
      const current = commentContainerRef.current;
      if (current) {
        const getMap = current
          ?.closest(".govuk-grid-row")
          ?.querySelector(".landing-map");
        const getMapHeight = getMap?.clientHeight ?? 0;
        const isOverflow = current.scrollHeight > getMapHeight;
        const currDescription =
          current.querySelector("span")?.textContent ?? "";
        if (isOverflow && currDescription?.length > 350) {
          setNewDescription(
            currDescription
              ?.slice(0, getMapHeight > 250 ? 640 : 350)
              .trim()
              .concat(`...`),
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
      <span>{newDescription}</span> {continuedText}
    </p>
  );
};

export default DescriptionCard;
