/**
 * #/components/schemas/ApplicationSubmission
 * https://camden.bops-staging.services/api/docs/v2/swagger_doc.yaml
 *
 * This file contains a LOT of types and definitions, some are auto generated and some are not
 * 99% of this will not be needed for our purposes but I've included it so that we can have as
 * much control over the data as possible while we develop and build this
 * for now the application-form page does what it needs to do and outputs everything submitted
 */

import { BopsApplicationOverview } from ".";
import { BopsApplicationSubmissionResponses } from "./application-submission--responses";

export * from "./application-submission--responses";
/**
 * Alternative to the MUCH more complicated example below
 */
// export interface ApplicationSubmission {
//   application: BopsApplicationOverview;
//   submission: {
//     data: {
//       [key: string]: any;
//     };
//     preAssessment?: any[];
//     responses?: any[];
//     files?: any[];
//     metadata: {
//       [key: string]: any;
//     };
//   } | null;
// }

export interface BopsApplicationSubmission {
  data: {
    applicant: BaseApplicant | Agent;
    application: BaseApplication | LondonApplication;
    files?: FilesAsData;
    property: UKProperty | LondonProperty;
    proposal: BaseProposal | LondonProposal;
    user: User;
  };
  preAssessment?: any[];
  responses?: BopsApplicationSubmissionResponses[];
  files?: BopsApplicationSubmissionFile[];
  metadata: AnyProviderMetadata | PlanXMetadata;
}

///// Shared

export interface PolicyRef {
  text: string;
  url?: string;
}

export interface Response {
  metadata?: ResponseMetaData;
  value: string;
}

interface ResponseMetaData {
  flags?: string[];
  options?: string[] | Response[];
}

interface FileType {
  description: string;
  value: string;
}

//////

///// Responses

export interface BopsApplicationSubmissionResponses {
  metadata?: QuestionMetaData;
  question: string;
  responses: Response[] | string;
}

interface QuestionMetaData {
  autoAnswered?: boolean;
  policyRefs?: PolicyRef[];
  sectionName?: string;
}

///////

///// Files

export interface BopsApplicationSubmissionFile {
  description?: string;
  name: string;
  type: FileType[];
}

///////

///// Files

///////

///// Files

///////

///// Files

///////

///// Files

///////

interface AnyProviderMetadata {
  id: string;
  organisation: string;
  schema: string;
  source: "Any";
  /**
   * Used at the top of the application-form page
   */
  submittedAt: string;
}

interface PlanXMetadata {
  id: string;
  organisation: string;
  schema: URL;
  service: Service;
  source: "PlanX";
  /**
   * Used at the top of the application-form page
   */
  submittedAt: string;
}

interface BaseApplicant {
  address: UserAddress;
  company: {
    name: string;
  };
  email: string;
  maintenanceContact: MaintenanceContact;
  name: {
    first: string;
    last: string;
    title?: string;
  };
  ownership: Ownership;
  phone: {
    primary: string;
  };
  siteContact: SiteContact;
  type: "individual" | "company" | "charity" | "public" | "parishCouncil";
}

interface Agent {
  address: UserAddress;
  agent: {
    address: Address;
    company: {
      name: string;
    };
    email: string;
    name: {
      first: string;
      last: string;
      title?: string;
    };
    phone: {
      primary: string;
    };
  };
  company: {
    name: string;
  };
  email: string;
  maintenanceContact: MaintenanceContact;
  name: {
    first: string;
    last: string;
    title?: string;
  };
  ownership: Ownership;
  phone: {
    primary: string;
  };
  siteContact: SiteContact;
  type: "individual" | "company" | "charity" | "public" | "parishCouncil";
}

interface UserAddressNotSameSite {
  country?: string;
  county?: string;
  line1: string;
  line2?: string;
  postcode: string;
  sameAsSiteAddress: false;
  town: string;
}

interface UserAddressSameAsSite {
  sameAsSiteAddress: true;
}

type UserAddress = UserAddressSameAsSite | UserAddressNotSameSite;

interface SiteContactOther {
  email: string;
  name: string;
  phone: string;
  role: "other";
}

interface SiteContactRole {
  role: "applicant" | "agent" | "proxy";
}

type SiteContact = SiteContactRole | SiteContactOther;

interface Address {
  country?: string;
  county?: string;
  line1: string;
  line2?: string;
  postcode: string;
  town: string;
}

interface MaintenanceContactItem {
  address: Address;
  contact: {
    company: {
      name: string;
    };
    email: string;
    name: {
      first: string;
      last: string;
      title?: string;
    };
    phone: string;
  };
  when:
    | "duringConstruction"
    | "afterConstruction"
    | "duringAndAfterConstruction";
}

type MaintenanceContact = MaintenanceContactItem[];

interface LondonApplication {
  CIL?: CommunityInfrastructureLevy;
  declaration: ApplicationDeclaration;
  fee: ApplicationFee | ApplicationFeeNotApplicable;
  leadDeveloper?: LeadDeveloper;
  planningApp?: PlanningApplication;
  preApp?: PreApplication;
  type: ApplicationType;
  vacantBuildingCredit?: boolean;
}

interface LeadDeveloper {
  company?: {
    name: string;
    registrationNumber: string;
  };
  type: "ukCompany" | "overseasCompany" | "none";
}

interface BaseApplication {
  CIL?: CommunityInfrastructureLevy;
  declaration: ApplicationDeclaration;
  fee: ApplicationFee | ApplicationFeeNotApplicable;
  planningApp?: PlanningApplication;
  preApp?: PreApplication;
  type: ApplicationType;
}

interface CommunityInfrastructureLevy {
  result:
    | "exempt.annexe"
    | "exempt.extension"
    | "exempt.selfBuild"
    | "liable"
    | "relief.charity"
    | "relief.socialHousing";
}

interface ApplicationDeclaration {
  accurate: boolean;
  connection: {
    description?: string;
    value:
      | "employee"
      | "relation.employee"
      | "electedMember"
      | "relation.electedMember"
      | "none";
  };
}

interface ApplicationFee {
  calculated: number;
  category?: {
    eight?: number;
    eleven?: {
      one?: number;
      two?: number;
    };
    five?: number;
    four?: number;
    fourteen?: number;
    nine?: number;
    one?: number;
    sixAndSeven?: number;
    ten?: number;
    thirteen?: number;
    three?: number;
    twelve?: {
      one?: number;
      two?: number;
    };
    two?: number;
  };
  exemption: {
    disability: boolean;
    resubmission: boolean;
  };
  payable: number;
  reduction: {
    alternative: boolean;
    parishCouncil: boolean;
    sports: boolean;
  };
  reference?: {
    govPay: string;
  };
}

interface ApplicationFeeNotApplicable {
  notApplicable: true;
}

interface PlanningApplication {
  date: Date;
  localPlanningAuthority: string;
  reference: string;
}

interface PreApplication {
  date: Date;
  officer: string;
  reference: string;
  summary: string;
}

interface ApplicationType {
  description: string;
  value: string;
}

interface FilesAsData {
  designAndAccessStatement?: DesignAndAccessStatement;
  heritageStatement?: HeritageStatement;
  locationPlan?: GeoBoundary;
}

interface DesignAndAccessStatement {
  accessAndLayout: string;
  landscapingChanges: string;
  projectDescription: string;
  propertyDescription: string;
}

interface HeritageStatementBase {
  designationDescription: string;
  improvements: string;
  managedImpact: string;
  projectDescpription: string;
  propertyDescription: string;
}

interface HeritageStatement {
  designated: {
    WHS?: HeritageStatementBase;
    conservationArea?: HeritageStatementBase;
  };
  listed?: HeritageStatementBase;
  monument?: HeritageStatementBase;
}

interface LondonProperty {
  EPC?: EPC;
  address: ProposedAddress | OSAddress;
  boundary?: GeoBoundary;
  flood?: Flood;
  localAuthorityDistrict: string[];
  materials?: Materials;
  occupation?: Occupation;
  ownership?: Ownership;
  parking?: Parking;
  planning?: Planning;
  region: "London";
  socialLandlord?: SocialLandlord;
  titleNumber?: TitleNumber;
  trees?: Trees;
  type: PropertyType;
  units?: ResidentialUnits;
  use?: Use;
}

interface EPC {
  known:
    | "Yes"
    | "Yes, but only some of the properties have one"
    | "The property does not have one"
    | "No";
  number?: string;
}

interface Flood {
  "20mFromWatercourse"?: boolean;
  increasedRiskElsewhere?: boolean;
}

interface Occupation {
  status: "occupied" | "partVacant" | "vacant";
}

interface Ownership {
  status: "public" | "private" | "mixed";
}

interface ParkingCount {
  count: number;
}

interface Parking {
  buses?: ParkingCount;
  carClub?: ParkingCount;
  cars?: ParkingCount;
  cycles?: ParkingCount;
  disabled?: ParkingCount;
  motorcycles?: ParkingCount;
  offStreet?: {
    residential: ParkingCount;
  };
  other?: ParkingCount;
  vans?: ParkingCount;
}

interface Planning {
  conditions?: PlanningConstraint[];
  designations?: PlanningDesignation[];
  guidance?: PlanningConstraint[];
  plans: {
    local: PlanningConstraint[];
    neighbourhood: PlanningConstraint[];
  };
  sources: URL[];
}

interface SocialLandlord {
  status: boolean;
  description?: string;
}

interface TitleNumber {
  known: "Yes" | "No";
  number?: string;
}

interface Trees {
  adjacent: boolean;
  present: boolean;
}

interface Use {
  description: string;
  vacant?: {
    lastUseEndDate: Date;
  };
}

interface UKProperty {
  address: ProposedAddress | OSAddress;
  boundary?: GeoBoundary;
  flood?: {
    "20mFromWatercourse"?: boolean;
    increasedRiskElsewhere?: boolean;
  };
  localAuthorityDistrict: string[];
  materials?: Materials;
  planning?: {
    conditions?: PlanningConstraint[];
    designations?: PlanningDesignation[];
    guidance?: PlanningConstraint[];
    plans?: {
      local: PlanningConstraint[];
      neighbourhood: PlanningConstraint[];
    };
    sources: URL[];
  };
  region: string;
  trees?: {
    adjacent: boolean;
    present: boolean;
  };
  type: PropertyType;
  units?: ResidentialUnits;
  use?: {
    description: string;
    vacant?: {
      lastUseEndDate: Date;
    };
  };
}

interface PropertyType {
  description: string;
  value: string;
}

interface PlanningDataSource {
  text: "Planning Data";
  url: string;
}

interface OrdnanceSurveySource {
  text: "Ordnance Survey MasterMap Highways";
}

type Source = PlanningDataSource | OrdnanceSurveySource;

interface Entity {
  description?: string;
  name: string;
  source: Source;
}

interface PlanningDesignationBase {
  description: string;
  intersects: boolean;
  value: string;
}

interface NonIntersectingPlanningDesignation extends PlanningDesignationBase {
  intersects: false;
}

interface IntersectingPlanningDesignation extends PlanningDesignationBase {
  intersects: true;
  entities: Entity[];
}

type PlanningDesignation =
  | NonIntersectingPlanningDesignation
  | IntersectingPlanningDesignation;

interface PlanningConstraintBase {
  description: string;
  intersects: boolean;
  value: string;
}

interface NonIntersectingPlanningConstraint extends PlanningConstraintBase {
  intersects: false;
}

interface IntersectingPlanningConstraint extends PlanningConstraintBase {
  intersects: true;
  entities: Entity[];
}

type PlanningConstraint =
  | NonIntersectingPlanningConstraint
  | IntersectingPlanningConstraint;

interface ProposedAddress {
  latitude: number;
  longitude: number;
  source: "Proposed by applicant";
  title: string;
  x: number;
  y: number;
}

interface OSAddress {
  latitude: number;
  longitude: number;
  organisation?: string;
  pao: string;
  postcode: string;
  singleLine: string;
  source: "Ordnance Survey";
  street: string;
  title: string;
  town: string;
  uprn: string;
  usrn: string;
  x: number;
  y: number;
}

interface BaseProposal {
  access?: {
    affected?:
      | "vehicle"
      | "pedestrian"
      | "newRoad"
      | "rightsOfWay.newPublic"
      | "rightsOfWay.changes";
  };
  boundary?: GeoBoundary;
  date?: ProposalDates;
  description: string;
  ecology?: {
    conservationAffected?: "site" | "adjacent" | "none";
    featuresAffected?: "site" | "adjacent" | "none";
    speciesAffected?: "site" | "adjacent" | "none";
  };
  environmentalImpactDescription?: string;
  extend?: {
    area: Area;
  };
  flood?: {
    surfaceWaterDisposal?:
      | "drainageSystem"
      | "soakaway"
      | "sewer"
      | "watercourse"
      | "pondOrLake"
      | "other";
  };
  materials?: Materials;
  new?: {
    area?: Area;
    count?: {
      bathrooms?: number;
      bedrooms?: number;
      dwellings?: number;
    };
  };
  newDwellings?: {
    newBuild?: {
      count: number;
    };
  };
  projectType: ProjectType[];
  structures?: {
    permanent?: {
      count: number;
    };
    temporary?: {
      count: number;
    };
    total: number;
    type:
      | "bridge"
      | "catchpit"
      | "culvert"
      | "pipe"
      | "gully"
      | "headwall"
      | "manhole"
      | "weir"
      | "other";
  };
  units?: ResidentialUnits;
  use?: {
    contamination?: "known" | "suspected" | "vulnerable";
    description?: string;
    storage?: string[];
  };
  utilities?: {
    fire?: {
      suppression: boolean;
    };
    foulSewageDisposal?: "sewer" | "tank" | "plant" | "pit" | "other";
    gas?: {
      connections: {
        count: number;
      };
    };
    internet?: {
      commercialUnits: {
        count: number;
      };
      residentialUnits: {
        count: number;
      };
    };
    water?: {
      connections: {
        count: number;
      };
    };
  };
  watercourse?: {
    name: string;
    type: "ditch" | "millStream" | "pond" | "river" | "streamOrBrook" | "other";
  };
}

interface LondonProposal {
  access?: {
    affected?:
      | "vehicle"
      | "pedestrian"
      | "newRoad"
      | "rightsOfWay.newPublic"
      | "rightsOfWay.changes";
  };
  boundary?: GeoBoundary;
  charging?: {
    active?: {
      count: number;
    };
    passive?: {
      count: number;
    };
  };
  cost?: {
    projected: "2m" | "2mTo100m" | "100m";
  };
  date?: ProposalDates;
  description: string;
  ecology?: {
    conservationAffected?: "site" | "adjacent" | "none";
    featuresAffected?: "site" | "adjacent" | "none";
    speciesAffected?: "site" | "adjacent" | "none";
  };
  energy?: {
    communityOwned?: {
      capacity: {
        megawatts: number;
      };
    };
    heatPumps?: {
      capacity: {
        megawatts: number;
      };
    };
    solar?: {
      capacity: {
        megawatts: number;
      };
    };
    type: ("communityOwned" | "heatPump" | "solar")[];
  };
  environmentalImpactDescription?: string;
  extend?: {
    area: Area;
  };
  flood?: {
    surfaceWaterDisposal?:
      | "drainageSystem"
      | "soakaway"
      | "sewer"
      | "watercourse"
      | "pondOrLake"
      | "other";
  };
  greenRoof?: {
    area: Area;
  };
  materials?: Materials;
  nature?: {
    openSpaces?: {
      access: "restricted" | "unrestricted";
      area: {
        hectares: number;
      };
      description: string;
      designation: OpenSpaceDesignation;
      impact: "loss" | "gain" | "change";
      swap: boolean;
      type: OpenSpaceType;
    }[];
    protectedSpaces?: {
      access: "restricted" | "unrestricted";
      area: {
        hectares: number;
      };
      description: string;
      designation: ProtectedSpaceDesignation;
      impact: "loss" | "gain" | "change";
    }[];
  };
  new: {
    area: Area;
    count: {
      bathrooms: number;
      bedrooms: number;
      dwellings: number;
    };
  };
  newBuildings: NewBuildingsOrStoreys;
  newDwellings: {
    newBuild: {
      count: number;
    };
  };
  newStoreys: NewBuildingsOrStoreys;
  parking: {
    buses: ParkingDetail;
    carClub: ParkingDetail;
    cars: ParkingDetail;
    cycles: ParkingDetail;
    disabled: ParkingDetail;
    motorcycles: ParkingDetail;
    offStreet: {
      residential: ParkingDetail;
    };
    other: ParkingDetail;
    vans: ParkingDetail;
  };
  projectType: ProjectType[];
  schemeName: string;
  structures: {
    permanent: StructureDetail;
    temporary: StructureDetail;
    total: number;
    type:
      | "bridge"
      | "catchpit"
      | "culvert"
      | "pipe"
      | "gully"
      | "headwall"
      | "manhole"
      | "weir"
      | "other";
  };
  units: {
    residential: {
      new: ResidentialUnit[];
      rebuilt: ResidentialUnit[];
      removed: ResidentialUnit[];
      retained: RetainedUnit[];
    };
  };
  urbanGreeningFactor: {
    score: number;
  };
  use: {
    contamination: "known" | "suspected" | "vulnerable";
    description: string;
    storage: string[];
  };
  utilities: {
    fire: {
      suppression: boolean;
    };
    foulSewageDisposal: "sewer" | "tank" | "plant" | "pit" | "other";
    gas: UtilityDetail;
    internet: {
      commercialUnits: UtilityDetail;
      residentialUnits: UtilityDetail;
    };
    water: UtilityDetail;
  };
  waste: {
    reuseRecycle: {
      percent: number;
    };
  };
  water: {
    grey: boolean;
    rain: boolean;
    usage: {
      litresPerPersonPerDay: number;
    };
  };
  watercourse: {
    name: string;
    type: "ditch" | "millStream" | "pond" | "river" | "streamOrBrook" | "other";
  };
}

interface NewBuildingsOrStoreys {
  buildings?: {
    height: {
      metres: number;
    };
    storeys: number;
  }[];
  count: number;
}

interface ParkingDetail {
  count: number;
  difference: number;
}

interface StructureDetail {
  count: number;
}

interface ResidentialUnit {
  area: Area;
  bedrooms: number;
  compliance: BuildingRegulation[];
  development: DevelopmentType;
  garden: boolean;
  habitableRooms: number;
  identicalUnits: number;
  olderPersons: boolean;
  provider: GLAHousingProvider;
  sheltered: boolean;
  tenure: GLATenureType;
  type: GLAResidentialUnitType;
}

interface RetainedUnit {
  bedrooms: number;
  identicalUnits: number;
  tenure: GLATenureType;
  type: GLAResidentialUnitType;
}

interface OpenSpaceDesignation {
  description: string;
  value: string;
}

interface OpenSpaceType {
  description: string;
  value: string;
}

interface ProtectedSpaceDesignation {
  description: string;
  value: string;
}

interface BuildingRegulation {
  description: string;
  value: string;
}

interface DevelopmentType {
  description: string;
  value: string;
}

interface GLAHousingProvider {
  description: string;
  value: string;
}

interface GLATenureType {
  description: string;
  value: string;
}

interface GLAResidentialUnitType {
  description: string;
  value: string;
}
interface UtilityDetail {
  connections: {
    count: number;
  };
}

type Position = [number, number] | [number, number, number];

type BBox =
  | [number, number, number, number]
  | [number, number, number, number, number, number];

interface BaseGeometry {
  [key: string]: any;
}

interface Point extends BaseGeometry {
  bbox?: BBox;
  coordinates: Position;
  type: "Point";
}

interface MultiPoint {
  bbox?: BBox;
  coordinates: Position[];
  type: "MultiPoint";
}

interface MultiPolygon {
  bbox?: BBox;
  coordinates: Position[][][];
  type: "MultiPolygon";
}

interface MultiLineString {
  bbox?: BBox;
  coordinates: Position[][];
  type: "MultiLineString";
}

interface LineString {
  bbox?: BBox;
  coordinates: Position[];
  type: "LineString";
}

interface Polygon {
  bbox?: BBox;
  coordinates: Position[][];
  type: "Polygon";
}

interface GeometryCollection {
  bbox?: BBox;
  geometries: Geometry[];
  type: "GeometryCollection";
}

interface Feature {
  bbox?: BBox;
  geometry: Geometry;
  id?: string | number;
  properties: GeoJsonProperties;
  type: "Feature";
}

interface FeatureCollection {
  bbox?: BBox;
  features: Feature[];
  type: "FeatureCollection";
}

type GeoJsonProperties = Geometry | null;

type Geometry =
  | Point
  | MultiPoint
  | LineString
  | MultiLineString
  | Polygon
  | MultiPolygon
  | GeometryCollection;

type GeoJSON = Geometry | Feature | FeatureCollection;

interface GeoBoundary {
  area: Area;
  site: GeoJSON;
}

interface ProposalDates {
  completion?: string;
  start?: string;
}

interface Materials {
  boundary?: string;
  door?: string;
  lighting?: string;
  other?: string;
  roof?: string;
  surface?: string;
  wall?: string;
  window?: string;
}

interface Area {
  hectares?: number;
  squareMetres: number;
}

interface ResidentialUnit {
  bedrooms: number;
  identicalUnits: number;
  tenure: UKTenureType;
  type: UKResidentialUnitType;
}

interface ProjectType {
  description: string;
  value: string;
}

interface UKTenureType {
  description: string;
  value: string;
}

interface UKResidentialUnitType {
  description: string;
  value: string;
}

interface ResidentialUnits {
  residential: ResidentialUnit[];
  total: number;
}

interface User {
  role: "applicant" | "agent" | "proxy";
}

interface Service {
  fee: FeeExplanation | FeeExplanationNotApplicable;
  files: RequestedFiles;
  flowId: string;
  url: string;
}

interface RequestedFiles {
  optional: FileType[];
  recommended: FileType[];
  required: FileType[];
}

interface FeeExplanationNotApplicable {
  notApplicable: true;
}

interface FeeExplanation {
  calculated: CalculateMetadata[];
  category: {
    eight?: CalculateMetadata[];
    eleven?: {
      one: CalculateMetadata[];
    };
    five?: CalculateMetadata[];
    four?: CalculateMetadata[];
    fourteen?: CalculateMetadata[];
    nine?: CalculateMetadata[];
    one?: CalculateMetadata[];
    sixAndSeven?: CalculateMetadata[];
    ten?: CalculateMetadata[];
    thirteen?: CalculateMetadata[];
    three?: CalculateMetadata[];
    twelve?: {
      one?: CalculateMetadata[];
      two?: CalculateMetadata[];
    };
    two?: CalculateMetadata[];
  };
  payable: CalculateMetadata[];
}

interface CalculateMetadata {
  description: string;
  policyRefs: PolicyRef[];
}
