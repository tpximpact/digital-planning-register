/**
 * What our comments look like
 * A mix of BOPS and DPR
 */
export interface DprDocument {
  url: string;
  title: string;
  /**
   * Optional because of the need to insert fake application form document
   */
  created_at?: string;
  metadata?: {
    byteSize?: number;
    contentType?: string;
  };
}

// what documents look like in future BOPS endpooints
// {
//   "name": "Proposed Front Elevation.PDF",
//   "url": "https://camden.bops-staging.services/api/v1/planning_applications/2613/documents/9768",
//   "type": [
//     {
//       "value": "elevations.proposed",
//       "description": "Elevations - proposed"
//     }
//   ],
//   "createdAt": "2024-05-02T16:14:54.250+01:00",
//   "applicantDescription": null,
//   "metadata": {
//     "byteSize": 399237,
//     "contentType": "application/pdf"
//   }
// },

// what they currently look like (in BOPS) with the soon to be deprecated endpoint
// {
//   "url": "https://camden.bops-staging.services/api/v1/planning_applications/2613/documents/9768",
//   "created_at": "2024-05-02T16:14:54.250+01:00",
//   "tags": [
//     "elevations.proposed"
//   ],
//   "numbers": "Proposed Front Elevation",
//   "applicant_description": null
// },
