interface DigitalSiteNotice {
  name: string;
  proposedLandUse: ProposedLandUse;
  height: number;
  constructionTime: string;
  showHousing: boolean;
  housing: Housing;
  showOpenSpace: boolean;
  openSpaceArea: number;
  showJobs: boolean;
  jobs: Jobs;
  showCarbon: boolean;
  carbonEmissions: number;
  showAccess: boolean;
  access: string;
}

interface ProposedLandUse {
  classA: boolean;
  classB: boolean;
  classC: boolean;
  classD: boolean;
  classE: boolean;
}

interface Housing {
  residentialUnits: number;
  affordableResidentialUnits: number;
}

interface Jobs {
  min: number;
  max: number;
}
