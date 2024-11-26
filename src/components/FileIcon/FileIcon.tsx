import { FileIcons } from "./FileIcons";
import "./FileIcon.scss";

export interface FileIconProps {
  fileType?: "html" | "jpg" | "png" | "pdf";
}

export const validFileTypes = ["html", "jpg", "png", "pdf"];

export const FileIcon = ({ fileType }: FileIconProps) => {
  if (fileType && validFileTypes.includes(fileType) && FileIcons[fileType]) {
    const FileIcon = FileIcons[fileType];
    return (
      <>
        <div className="test-1"></div>
        <div className="test-2"></div>
        <FileIcon />
      </>
    );
  } else {
    return null;
  }
};
