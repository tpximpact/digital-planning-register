/**
 * #/components/schemas/Documents
 */

import { ApplicationOverview } from "../definitions/application-overview";

export interface Documents {
  metadata: {
    results: number;
    totalResults: number;
  };
  application: ApplicationOverview;
  files: BopsFile[];
  decisionNotice: {
    name: string;
    url: string;
  };
}

export interface BopsFile {
  name: string;
  url: string;
  type: FileType[];
  createdAt: string | null;
  applicantDescription: string | null;
  metadata: {
    byteSize: number;
    contentType: string;
  };
}

interface FileType {
  value: string;
  description: string;
}
