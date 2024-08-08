export interface BopsDocumentsMetadata {
  results: number;
  totalResults: number;
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

/**
 * this goes along with the older endpoint's we're deprecating
 * @deprecated
 */
export interface BopsNonStandardDocument {
  url: string;
  /**
   * Optional because of the need to insert fake application form document
   */
  created_at?: string;
  tags: string[];
  numbers: string;
  applicant_description: string | null;

  /**
   * @warning This field is only used by the 'fake' document for application form
   */
  metadata?: {
    contentType: string;
  };
}
