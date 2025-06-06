/**
 * Values of `file.type`
 */
export const FileTypes = {
  accessRoadsRightsOfWayDetails:
    'Details of impact on access, roads, and rights of way',
  affordableHousingStatement: 'Affordable housing statement',
  arboriculturistReport: 'Arboriculturist report',
  bankStatement: 'Bank statement',
  basementImpactStatement: 'Basement impact statement',
  bioaerosolAssessment: 'Bio-aerosol assessment',
  birdstrikeRiskManagementPlan: 'Birdstrike risk management plan',
  boreholeOrTrialPitAnalysis: 'Borehole or trial pit analysis',
  buildingControlCertificate: 'Building control certificate',
  conditionSurvey: 'Structural or building condition survey',
  constructionInvoice: 'Construction invoice',
  contaminationReport: 'Contamination report',
  councilTaxBill: 'Council tax bill',
  crimePreventionStrategy: 'Crime prevention strategy',
  designAndAccessStatement: 'Design and Access Statement',
  disabilityExemptionEvidence:
    'Evidence for application fee exemption - disability',
  ecologyReport: 'Ecology report',
  'elevations.existing': 'Elevations - existing',
  'elevations.proposed': 'Elevations - proposed',
  emissionsMitigationAndMonitoringScheme:
    'Scheme for mitigation and monitoring of emissions (dust, odour and vibrations)',
  energyStatement: 'Energy statement',
  environmentalImpactAssessment: 'Environmental Impact Assessment (EIA)',
  externalMaterialsDetails: 'External materials details',
  fireSafetyReport: 'Fire safety report',
  floodRiskAssessment: 'Flood risk assessment (FRA)',
  'floorPlan.existing': 'Floor plan - existing',
  'floorPlan.proposed': 'Floor plan - proposed',
  foulDrainageAssessment: 'Foul drainage assessment',
  geodiversityAssessment: 'Geodiversity assessment',
  hedgerowsInformation:
    'Plans showing the stretches of hedgerows to be removed',
  'hedgerowsInformation.plantingDate':
    'Evidence of the date of planting of the removed hedgerows',
  heritageStatement: 'Heritage Statement',
  hydrologicalAssessment: 'Hydrological and hydrogeological assessment',
  hydrologyReport: 'Hydrology report',
  internalElevations: 'Internal elevations',
  internalSections: 'Internal sections',
  joinersReport: "Joiner's report",
  joinerySections: 'Joinery section report',
  landContaminationAssessment: 'Land contamination assessment',
  landscapeAndVisualImpactAssessment:
    'Landscape and visual impact assessment (LVIA)',
  landscapeStrategy: 'Landscape strategy or landscape plan',
  lightingAssessment: 'Lighting assessment',
  litterVerminAndBirdControlDetails:
    'Details of litter, vermin and bird control',
  locationPlan: 'Location plan',
  methodStatement: 'Method statement',
  mineralsAndWasteAssessment: 'Minerals and waste assessment',
  necessaryInformation:
    'Information the authority considers necessary for the application',
  newDwellingsSchedule: 'New dwellings schedule',
  noiseAssessment: 'Noise assessment',
  openSpaceAssessment: 'Open space assessment',
  otherDocument: 'Other - document',
  otherDrawing: 'Other - drawing',
  otherEvidence: 'Other - evidence or correspondence',
  otherSupporting: 'Other - supporting document',
  parkingPlan: 'Parking plan',
  'photographs.existing': 'Photographs - existing',
  'photographs.proposed': 'Photographs - proposed',
  planningStatement: 'Planning statement',
  recycleWasteStorageDetails: 'Recyclable waste storage details',
  relevantInformation:
    'Information the applicant considers relevant to the application',
  residentialUnitsDetails: 'Residential units details',
  'roofPlan.existing': 'Roof plan - existing',
  'roofPlan.proposed': 'Roof plan - proposed',
  'sections.existing': 'Sections - existing',
  'sections.proposed': 'Sections - proposed',
  'sitePlan.existing': 'Site plan - existing',
  'sitePlan.proposed': 'Site plan - proposed',
  sketchPlan: 'Sketch plan',
  statementOfCommunityInvolvement: 'Statement of community involvement',
  statutoryDeclaration: 'Statutory declaration',
  storageTreatmentAndWasteDisposalDetails:
    'Details of storage treatment or disposal of waste',
  streetScene: 'Street scene drawing',
  subsidenceReport: 'Subsidence report',
  sunlightAndDaylightReport: 'Sunlight and daylight report',
  sustainabilityStatement: 'Sustainability statement',
  technicalEvidence: 'Technical evidence',
  technicalSpecification: 'Technical specification',
  tenancyAgreement: 'Tenancy agreement',
  tenancyInvoice: 'Tenancy invoice',
  townCentreImpactAssessment: 'Town centre uses - Impact assessment',
  townCentreSequentialAssessment: 'Town centre uses - Sequential assessment',
  transportAssessment: 'Transport assessment',
  travelPlan: 'Travel plan',
  treeAndHedgeLocation: 'Location of trees and hedges',
  treeAndHedgeRemovedOrPruned: 'Removed or pruned trees and hedges',
  treeCanopyCalculator: 'Tree canopy calculator',
  treeConditionReport: 'Tree condition report',
  treesReport: 'Trees report',
  treeSurvey: 'Tree survey',
  'unitPlan.existing': 'Unit plan - existing',
  'unitPlan.proposed': 'Unit plan - proposed',
  'usePlan.existing': 'Use plan - existing',
  'usePlan.proposed': 'Use plan - proposed',
  utilityBill: 'Utility bill',
  utilitiesStatement: 'Utilities statement',
  ventilationStatement: 'Ventilation or extraction statement',
  viabilityAppraisal: 'Viability Appraisal',
  visualisations: 'Visualisations',
  wasteAndRecyclingStrategy: 'Waste and recycling strategy',
  wasteStorageDetails: 'Waste storage details',
  waterEnvironmentAssessment: 'Water environment assessment',
};

type FileTypeKeys = keyof typeof FileTypes;

type GenericFileType<TKey extends FileTypeKeys> = {
  value: TKey;
  description: (typeof FileTypes)[TKey];
};

type FileTypeMap = {
  [K in FileTypeKeys]: GenericFileType<K>;
};

/**
 * @id #FileType
 * @description Types of planning documents and drawings
 */
export type FileType = FileTypeMap[keyof FileTypeMap];
