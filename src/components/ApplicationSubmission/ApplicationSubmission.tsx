import { PrototypeApplication } from "odp-types/schemas/prototypeApplication";
import "./ApplicationSubmission.scss";

interface ApplicationSubmissionProps {
  submission: PrototypeApplication;
}

export const ApplicationSubmission = ({
  submission,
}: ApplicationSubmissionProps) => {
  if (!submission) {
    return null;
  }
  return (
    <>
      <div className="govuk-grid-row dpr-application-submission">
        <div className="govuk-grid-column-full">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">Property</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">EPC</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">The property does not have one</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Property type</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">Office</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Region</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">London</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Address</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">
                      5, PANCRAS SQUARE, LONDON, CAMDEN, N1C 4AG
                    </p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Coordinates (lat, long)
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">51.533826, -0.1263839</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">UPRN</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">000005170230</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">USRN</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">20499403</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Area</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">
                      53825.63 m2 / 5.382562999999999 hectares
                    </p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Property boundary</dt>
                  <dd className="govuk-summary-list__value">
                    <div
                      role="region"
                      aria-label="map"
                      id="Property-boundary-application-submission-map-test"
                      className="osl-map"
                    >
                      <my-map
                        role="application"
                        geojsondata='{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[-0.124237,51.531031],[-0.124254,51.531035],[-0.124244,51.531054],[-0.124446,51.531106],[-0.124565,51.531158],[-0.124635,51.531202],[-0.124683,51.531244],[-0.124781,51.531343],[-0.124775,51.531349],[-0.124788,51.531355],[-0.124811,51.531338],[-0.124865,51.531429],[-0.124896,51.531543],[-0.124894,51.531634],[-0.124865,51.531732],[-0.124797,51.531839],[-0.124719,51.531917],[-0.124597,51.532002],[-0.124457,51.532068],[-0.124494,51.532107],[-0.124021,51.533144],[-0.123962,51.533228],[-0.123996,51.533234],[-0.123958,51.533346],[-0.123866,51.533559],[-0.123878,51.533561],[-0.123849,51.533633],[-0.123838,51.533632],[-0.123828,51.533649],[-0.123735,51.533896],[-0.123719,51.533893],[-0.123666,51.534007],[-0.12365,51.534004],[-0.123635,51.534034],[-0.123653,51.534037],[-0.123623,51.534095],[-0.123677,51.534106],[-0.12365,51.534157],[-0.123606,51.534148],[-0.123544,51.534275],[-0.123536,51.534487],[-0.123522,51.534486],[-0.123523,51.534572],[-0.123534,51.534572],[-0.123532,51.534621],[-0.123521,51.534621],[-0.123519,51.534682],[-0.12353,51.534682],[-0.123519,51.534716],[-0.123512,51.534873],[-0.123502,51.534921],[-0.123345,51.534946],[-0.123217,51.534951],[-0.122522,51.534949],[-0.122467,51.534927],[-0.122456,51.535373],[-0.122512,51.535374],[-0.122503,51.535356],[-0.123415,51.535075],[-0.123556,51.535053],[-0.123697,51.53502],[-0.123726,51.535072],[-0.123757,51.535088],[-0.124405,51.534933],[-0.124354,51.534893],[-0.12429,51.534875],[-0.124601,51.534799],[-0.124647,51.534873],[-0.125119,51.534758],[-0.125126,51.534769],[-0.125187,51.534768],[-0.125556,51.53468],[-0.125578,51.534673],[-0.125576,51.534646],[-0.126013,51.534597],[-0.126301,51.534589],[-0.126319,51.534535],[-0.126391,51.534543],[-0.126433,51.534408],[-0.126391,51.534522],[-0.126374,51.534534],[-0.126286,51.534533],[-0.126256,51.534537],[-0.126092,51.53458],[-0.125958,51.534573],[-0.125882,51.534589],[-0.125801,51.534591],[-0.125686,51.534621],[-0.125665,51.534615],[-0.125617,51.534548],[-0.126337,51.534324],[-0.126352,51.534341],[-0.126372,51.534347],[-0.126432,51.534332],[-0.126457,51.534337],[-0.126478,51.534283],[-0.126907,51.534163],[-0.12697,51.534171],[-0.126952,51.534152],[-0.12723,51.53408],[-0.127205,51.534017],[-0.127103,51.53388],[-0.125965,51.532396],[-0.125932,51.532382],[-0.125823,51.532275],[-0.125679,51.532172],[-0.125621,51.532109],[-0.125598,51.532059],[-0.125587,51.532],[-0.125588,51.531947],[-0.125612,51.531845],[-0.125597,51.531743],[-0.125689,51.531714],[-0.12546,51.531421],[-0.125364,51.531449],[-0.125368,51.531538],[-0.12535,51.531652],[-0.124988,51.531217],[-0.124875,51.53111],[-0.124496,51.53071],[-0.124406,51.530741],[-0.124346,51.530779],[-0.124335,51.530811],[-0.12437,51.530825],[-0.124351,51.530855],[-0.124238,51.530876],[-0.12421,51.530891],[-0.124206,51.531005],[-0.12421,51.531024],[-0.124237,51.531031]],[[-0.125691,51.532473],[-0.125971,51.532593],[-0.126069,51.532646],[-0.125906,51.532761],[-0.125738,51.53269],[-0.125729,51.532666],[-0.125516,51.532594],[-0.125691,51.532473]],[[-0.12646,51.533391],[-0.126251,51.53349],[-0.125836,51.53315],[-0.125897,51.533136],[-0.126001,51.533088],[-0.126063,51.533086],[-0.126253,51.53321],[-0.126371,51.533305],[-0.12646,51.533391]],[[-0.12464,51.534639],[-0.124109,51.53477],[-0.124218,51.534156],[-0.124171,51.534152],[-0.124177,51.534117],[-0.124224,51.53412],[-0.124287,51.533759],[-0.124362,51.533597],[-0.124431,51.533573],[-0.124432,51.533566],[-0.124669,51.533493],[-0.124746,51.533597],[-0.124698,51.533603],[-0.124765,51.533819],[-0.124815,51.533813],[-0.124814,51.533827],[-0.124861,51.533829],[-0.124795,51.534221],[-0.124868,51.534227],[-0.125021,51.534214],[-0.125114,51.534522],[-0.12464,51.534639]]]]},"properties":{"name":"","entity":12000514271,"prefix":"title-boundary","dataset":"title-boundary","end-date":"","typology":"geography","reference":"54173614","entry-date":"2024-05-06","start-date":"2012-05-29","organisation-entity":"13"}}'
                        hideresetcontrol="true"
                        geojsoncolor="#ff0000"
                        geojsonbuffer="85"
                        osvectortilesapikey=""
                        aria-label="An interactive map"
                        oscopyright="© Crown copyright and database rights 2024 OS (0)100024857"
                        zoom="14"
                        showscale="true"
                      ></my-map>
                    </div>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Planning designations
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Listed Building</p>
                    <p>Article 4 Direction area</p>
                    <p>Designated land</p>
                    <p>Listed Building - Grade I</p>
                    <p>Listed Building - Grade II</p>
                    <p>Conservation Area</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Local authority</dt>
                  <dd className="govuk-summary-list__value">
                    <p>Camden</p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">Proposal</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Construction dates
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">01 Aug 2024 to 01 Sep 2024</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Extension size</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">15 m2</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Proposed area</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">
                      53825.63 m2 / 5.382562999999999 hectares
                    </p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Proposed property boundary
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <div
                      role="region"
                      aria-label="map"
                      id="Proposed-property-boundary-application-submission-map-test"
                      className="osl-map"
                    >
                      <my-map
                        role="application"
                        geojsondata='{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[-0.124237,51.531031],[-0.124254,51.531035],[-0.124244,51.531054],[-0.124446,51.531106],[-0.124565,51.531158],[-0.124635,51.531202],[-0.124683,51.531244],[-0.124781,51.531343],[-0.124775,51.531349],[-0.124788,51.531355],[-0.124811,51.531338],[-0.124865,51.531429],[-0.124896,51.531543],[-0.124894,51.531634],[-0.124865,51.531732],[-0.124797,51.531839],[-0.124719,51.531917],[-0.124597,51.532002],[-0.124457,51.532068],[-0.124494,51.532107],[-0.124021,51.533144],[-0.123962,51.533228],[-0.123996,51.533234],[-0.123958,51.533346],[-0.123866,51.533559],[-0.123878,51.533561],[-0.123849,51.533633],[-0.123838,51.533632],[-0.123828,51.533649],[-0.123735,51.533896],[-0.123719,51.533893],[-0.123666,51.534007],[-0.12365,51.534004],[-0.123635,51.534034],[-0.123653,51.534037],[-0.123623,51.534095],[-0.123677,51.534106],[-0.12365,51.534157],[-0.123606,51.534148],[-0.123544,51.534275],[-0.123536,51.534487],[-0.123522,51.534486],[-0.123523,51.534572],[-0.123534,51.534572],[-0.123532,51.534621],[-0.123521,51.534621],[-0.123519,51.534682],[-0.12353,51.534682],[-0.123519,51.534716],[-0.123512,51.534873],[-0.123502,51.534921],[-0.123345,51.534946],[-0.123217,51.534951],[-0.122522,51.534949],[-0.122467,51.534927],[-0.122456,51.535373],[-0.122512,51.535374],[-0.122503,51.535356],[-0.123415,51.535075],[-0.123556,51.535053],[-0.123697,51.53502],[-0.123726,51.535072],[-0.123757,51.535088],[-0.124405,51.534933],[-0.124354,51.534893],[-0.12429,51.534875],[-0.124601,51.534799],[-0.124647,51.534873],[-0.125119,51.534758],[-0.125126,51.534769],[-0.125187,51.534768],[-0.125556,51.53468],[-0.125578,51.534673],[-0.125576,51.534646],[-0.126013,51.534597],[-0.126301,51.534589],[-0.126319,51.534535],[-0.126391,51.534543],[-0.126433,51.534408],[-0.126391,51.534522],[-0.126374,51.534534],[-0.126286,51.534533],[-0.126256,51.534537],[-0.126092,51.53458],[-0.125958,51.534573],[-0.125882,51.534589],[-0.125801,51.534591],[-0.125686,51.534621],[-0.125665,51.534615],[-0.125617,51.534548],[-0.126337,51.534324],[-0.126352,51.534341],[-0.126372,51.534347],[-0.126432,51.534332],[-0.126457,51.534337],[-0.126478,51.534283],[-0.126907,51.534163],[-0.12697,51.534171],[-0.126952,51.534152],[-0.12723,51.53408],[-0.127205,51.534017],[-0.127103,51.53388],[-0.125965,51.532396],[-0.125932,51.532382],[-0.125823,51.532275],[-0.125679,51.532172],[-0.125621,51.532109],[-0.125598,51.532059],[-0.125587,51.532],[-0.125588,51.531947],[-0.125612,51.531845],[-0.125597,51.531743],[-0.125689,51.531714],[-0.12546,51.531421],[-0.125364,51.531449],[-0.125368,51.531538],[-0.12535,51.531652],[-0.124988,51.531217],[-0.124875,51.53111],[-0.124496,51.53071],[-0.124406,51.530741],[-0.124346,51.530779],[-0.124335,51.530811],[-0.12437,51.530825],[-0.124351,51.530855],[-0.124238,51.530876],[-0.12421,51.530891],[-0.124206,51.531005],[-0.12421,51.531024],[-0.124237,51.531031]],[[-0.125691,51.532473],[-0.125971,51.532593],[-0.126069,51.532646],[-0.125906,51.532761],[-0.125738,51.53269],[-0.125729,51.532666],[-0.125516,51.532594],[-0.125691,51.532473]],[[-0.12646,51.533391],[-0.126251,51.53349],[-0.125836,51.53315],[-0.125897,51.533136],[-0.126001,51.533088],[-0.126063,51.533086],[-0.126253,51.53321],[-0.126371,51.533305],[-0.12646,51.533391]],[[-0.12464,51.534639],[-0.124109,51.53477],[-0.124218,51.534156],[-0.124171,51.534152],[-0.124177,51.534117],[-0.124224,51.53412],[-0.124287,51.533759],[-0.124362,51.533597],[-0.124431,51.533573],[-0.124432,51.533566],[-0.124669,51.533493],[-0.124746,51.533597],[-0.124698,51.533603],[-0.124765,51.533819],[-0.124815,51.533813],[-0.124814,51.533827],[-0.124861,51.533829],[-0.124795,51.534221],[-0.124868,51.534227],[-0.125021,51.534214],[-0.125114,51.534522],[-0.12464,51.534639]]]]},"properties":{"name":"","entity":12000514271,"prefix":"title-boundary","dataset":"title-boundary","end-date":"","typology":"geography","reference":"54173614","entry-date":"2024-05-06","start-date":"2012-05-29","planx_user_action":"Accepted the title boundary","organisation-entity":"13"}}'
                        hideresetcontrol="true"
                        geojsoncolor="#ff0000"
                        geojsonbuffer="85"
                        osvectortilesapikey=""
                        aria-label="An interactive map"
                        oscopyright="© Crown copyright and database rights 2024 OS (0)100024857"
                        zoom="14"
                        showscale="true"
                      ></my-map>
                    </div>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Description</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">123</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Project type</dt>
                  <dd className="govuk-summary-list__value">
                    <p>Alter a building</p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">Applicant</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Applicant name</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">Ian Gracie</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Applicant type</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">individual</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Applicant address</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">Same as site address</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Ownership</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">
                      Certificate B - Not a sole owner
                    </p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Site contact</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">Applicant</p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">Application</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Application type</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">
                      Planning Permission - Full householder
                    </p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Pre-application advice
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Date: 2022-01-01</p>
                    <p>Officer: Mr Officer</p>
                    <p>Summary: Not provided</p>
                    <p>Reference: 2021/6138/PRE</p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">Files</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">File upload</dt>
                  <dd className="govuk-summary-list__value">
                    <p className="govuk-body">
                      Heritage Statement: Proposed Side Elevation.PDF
                    </p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">The property</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of commercial property is it?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Office</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Which of these best describes the use of the property?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Commercial</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of property is it?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Something else</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is the property in Camden?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Yes</p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">About you</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Certificate of ownership declaration - Certificate B
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>I certify that the above is true</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Have you given requisite notice to all the owners and
                    agricultural tenants?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Yes</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Do you know the names and addresses of all owners and
                    agricultural tenants?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Yes, all of them</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Date on which notice was given to the owner or agricultural
                    tenant
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>2024-01-01</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Address of the notified owner or agricultural tenant
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>4, London, NW3 4HD</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Full name of the notified owner or agricultural tenant
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>A Owner</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    How many owners or agricultural tenants have been notified?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>1</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Are you the sole owner of the land?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Which of these best describes you?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>I'm the applicant</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of application is this?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Planning Permission</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    We may need to visit the site to assess your application. If
                    we do, who should we contact to arrange the visit?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Me, the applicant</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Can a planning officer see the works from public land?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Yes, it's visible from the road or somewhere else</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is your contact address the same as the property address?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Yes</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Which of these best describes you?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Private individual</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Are you applying on behalf of someone else?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of application is it?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Apply for planning permission</p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">The project</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Data option provided?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Heritage Statement needed?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Yes</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the property include any of these?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Listed buildings</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the property include any of these?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Conservation area</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the project create 100 square metres or more of
                    additional floor area?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is the property on designated land?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Yes</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Are there existing or are you proposing parking spaces for
                    any of these on the site?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>None of these</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Do the changes involve creating any new bedrooms or
                    bathrooms?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Do the changes involve any of these?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Alterations to a building</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    When are the works planned to be completed?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>2024-09-01</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    When are the works planned to start?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>2024-08-01</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Have works already started?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of application is this?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Planning permission for a home</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the property have an Energy Performance Certificate
                    (EPC)?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Do you know the title number of the property?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the site include more than one property?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is the property in Greater London?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Yes</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Could your works affect a protected tree?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of application is this?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Apply for planning permission</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Might the works affect any tree with a trunk wider than
                    100mm?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No, definitely not</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is the site in a conservation area?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Yes</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Are there any protected trees on the property?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Have you already told us that you are doing works to a tree
                    or hedge?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Are there any trees or hedges that could fall within the
                    property or the areas affected by the project (the
                    previously drawn outline)?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Are there any protected trees on the property?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the project involve any of these?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No, none of these</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    How much new floor area is being added to the property?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Less than 100m²</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    How much new floorspace is being added to the property?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>15</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the project add any additional floorspace to the
                    property?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Yes</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Do you want to share more about materials in the documents
                    or drawings you upload?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the project introduce any external materials?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is the property in an area locally vulnerable to flooding?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is the property in flood zone 1?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is the property in a flood zone?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of development are you applying for?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Householder application</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Have works already started?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does your project involve any alterations to ground or floor
                    levels?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does your project involve changes to an existing roof?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Do your alterations involve any of these projects?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>None of these</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Select the changes involved in the project
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Alterations to a home and the surrounding land</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of application are you submitting?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Householder application</p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">Your application</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What does the project involve?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Alteration</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of application is it?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Planning permission</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the application qualify for the alternative application
                    reduction?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the application qualify for the parish council
                    reduction?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the application qualify for the sports club fee
                    reduction?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Are you also submitting another proposal for the same site
                    today?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is the application being made by (or on behalf of) a parish
                    or community council?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is the site a sports field?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the application qualify for a disability exemption?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Fee exemption for projects providing access for disabled
                    people
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the project involve any of these changes?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Alteration</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the project involve any of these changes?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>None of these</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is the property a home?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of application is it?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Another application type</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Check for multiple fees?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of development are you applying for?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Householder application</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of application is it?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Full planning permission</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What was the pre-application advice you have received?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Love it</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What date was the pre-application advice given on?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>2022-01-01</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What was your reference?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>2021/6138/PRE</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What was the name of the planning officer you spoke to?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Mr Officer</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Did you get any pre-application advice from the council
                    before making this application?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Yes</p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">Upload application documents</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is this for submission or information only?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Submission</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Is the user a professional agent?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What changes does the project involve?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Alterations</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Have the works already started?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of development are you applying for?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Householder application</p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">Review and confirm</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">I confirm that:</dt>
                  <dd className="govuk-summary-list__value">
                    <p>
                      The information contained in this application is truthful,
                      accurate and complete, to the best of my knowledge
                    </p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Connections with London Borough of Camden
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>None of the above apply to me</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Which Local Planning authority is it?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Camden</p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h3 className="govuk-heading-m">Pay and send</h3>
              <dl className="govuk-summary-list">
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Which Local Planning authority is it?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Camden</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    What type of application is it?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>Full planning permission</p>
                  </dd>
                </dl>
                <dl className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Does the application qualify for a disability exemption?
                  </dt>
                  <dd className="govuk-summary-list__value">
                    <p>No</p>
                  </dd>
                </dl>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
