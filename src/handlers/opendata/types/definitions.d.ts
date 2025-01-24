export interface OpenDataApplication {
  /**
   * Full Planning Permission
   */
  application_type:
    | "Advertisement Consent"
    | "Application for Works to Tree(s) covered by a TPO"
    | "Approval of Details"
    | "Approval of Details (Conservation Area Consent)"
    | "Approval of Details (Listed Building)"
    | "Approval of Reserved Matters"
    | "Asset of Community Value Written Request"
    | "(CA) Notification of Emergency Works to Dead/Dangerous Tree(s)"
    | "Certificate of Appropriate Alternative Development"
    | "Certificate of Lawfulness (Existing)"
    | "Certificate of Lawfulness of Proposed Works to a Listed Building"
    | "Certificate of Lawfulness (Proposed)"
    | "Conservation Area Consent"
    | "Construction Management Plan Consultation"
    | "Councils Own Approval of Details"
    | "Councils Own Approval of Details (Listed Building)"
    | "Councils Own Conservation Area Consent"
    | "Councils Own Listed Building Consent"
    | "Councils Own Permission Under Regulation 3"
    | "Councils Own Permission Under Regulation 4"
    | "DC Forum (Open)"
    | "Development Consent Order"
    | "Full Planning Permission"
    | "GPDO Notification"
    | "GPDO notification Class DA temporary change of use A3/A4 to A5"
    | "GPDO Prior Approval Class A Householder extensions"
    | "GPDO Prior Approval Class D Commercial 2 year change of use"
    | "GPDO Prior Approval Class IA change of use of A1/A2 to C3"
    | "GPDO Prior Approval Class J Change of use of A1 to D2"
    | "GPDO Prior Approval Class K change of use of B1/C1/C2/C2A/D2 to registered nursery"
    | "GPDO Prior Approval Class M change of use of A1/A2 to C3"
    | "GPDO Prior Approval Class O Change of use B1 to C3"
    | "GPDO Prior Approval Class PA Change of use B1 to C3"
    | "GPDO Prior Approval Class P Change of use of B8 to C3"
    | "GPDO Prior Approval Class T Change of use of B1/C1/C2/C2A/C2 to state-funded school or nursery (D1)"
    | "GPDO Prior Approval Determination"
    | "GPDO Prior Approval of Demolition"
    | "High Hedge Mediation"
    | "Historic application"
    | "Historic Planning Application"
    | "Householder Application"
    | "Listed Building Consent"
    | "Listed Building Consent (Demolition)"
    | "Listed Building Heritage Partnership Agreement"
    | "Non Material Amendments"
    | "Notification of Intended Works to Tree(s) in a Conservation Area"
    | "Outline Planning Permission"
    | "Permission in Principle"
    | "Renewal of Conservation Area Consent"
    | "Renewal of Full Planning Permission"
    | "Renewal of Listed Building Consent"
    | "Request for Observations to Adjoining Borough"
    | "Request for Scoping Opinion"
    | "Request for Screening Opinion"
    | "Resubmission of Full Planning Permission"
    | "S106 Deed of Variation"
    | "Schedule 17 - Conditions of Deemed Planning Permission"
    | "Schedule 18 - Heritage Agreement"
    | "Section 106A"
    | "Section 106BA"
    | "(TPO) Notification of Emergency Works to Dead/Dangerous Tree(s)"
    | "Variation or Removal of Condition(s)";

  /**
   * 421117
   */
  pk: string;
  /**
   * 2015/6278/P
   */
  application_number: string;
  /**
   * 15 Lyndhurst Terrace London  NW3 5QA
   */
  development_address: string;
  /**
   * Demolition of existing house to provide a new dwelling
   */
  development_description: string;
  /**
   * Refused
   */
  decision_type: string;
  /**
   * 2015-11-12T00:00:00.000
   */
  valid_from_date: string;
  /**
   * 2015-12-11T00:00:00.000
   */
  registered_date: string;
  /**
   * No
   */
  registered_in_last_7_working_days: string;
  /**
   * No
   */
  registered_in_last_28_working_days: string;
  /**
   * 2016-02-11T00:00:00.000
   */
  earliest_decision_date: string;
  /**
   * 2016-02-11T00:00:00.000
   */
  decision_date: string;
  /**
   * Delegated
   */
  decision_level: string;
  /**
   * Final Decision
   */
  system_status: string;
  /**
   * 2016-02-11T00:00:00.000
   */
  system_status_change_date: string;
  /**
   * Mr Richard Mitzman
   */
  applicant_name: string;
  /**
   * Hampstead Town (Pre May 2022)
   */
  ward: string;
  /**
   * Fitzjohns Netherhall
   */
  conservation_areas: string;
  /**
   * Zenab Haji-Ismail
   */
  case_officer: string;
  /**
   * Planning Solutions Team
   */
  case_officer_team: string;
  /**
   * PlanningApplication
   */
  responsibility_type: string;
  /**
   * Comments Closed
   */
  comment: string;
  full_application: {
    /**
     * https://planningrecords.camden.gov.uk/NECSWS/Redirection/redirect.aspx?linkid=EXDC&PARAM0=421117
     */
    url: string;
  };

  /**
   * 526617
   */
  easting: string;
  /**
   * 185359
   */
  northing: string;
  /**
   * -0.175119
   */
  longitude: string;
  /**
   * 51.552922
   */
  latitude: string;
  /**
   * Plotted by Camden Officer
   */
  spatial_accuracy: string;
  /**
   * 2025-01-24T02:30:29.000
   */
  last_uploaded: string;
  location: {
    /**
     * 51.552922
     */
    latitude: string;
    /**
     * -0.175119
     */
    longitude: string;
    /**
     * "{"address": "", "city": "", "state": "", "zip": ""}"
     */
    human_address: string;
  };
  /**
   * 34031
   */
  socrata_id: string;
  organisation_uri: {
    /**
     * "http://opendatacommunities.org/id/london-borough-council/camden"
     */
    url: string;
  };
}
