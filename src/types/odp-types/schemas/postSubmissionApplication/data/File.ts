import { DateTime } from "../../../shared/utils";
import { PrototypeFileType as FileType } from "../../prototypeApplication/enums/FileType";

/**
 * @id #File
 * @description File uploaded and labeled by the user to support the application
 */
export interface PostSubmissionFile {
  name: string;
  type?: FileType[];
  description?: string;
  url: string;
  metadata: FileMetadata;
}

/**
 * @description Metadata about the file
 */
interface FileMetadata {
  byteSize: number;
  mimeType: string;
  createdAt: DateTime;
  uploadedAt: DateTime;
}
