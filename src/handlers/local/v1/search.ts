"use server";

import { ApiResponse, DprSearch, SearchParams } from "@/types";

const response: ApiResponse<DprSearch | null> = {
  data: {
    pagination: {
      page: 1,
      results: 10,
      from: 1,
      to: 10,
      total_pages: 2,
      total_results: 19,
    },
    data: [
      {
        application: {
          reference: "24-00135-HAPP",
          type: {
            description: "planning_permission",
          },
          status: "not_started",
          consultation: {
            endDate: "2024-05-07",
            consulteeComments: [
              {
                comment:
                  "Donec sed odio dui. Curabitur blandit tempus porttitor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
                received_at: "2024-05-03T00:00:00.000+01:00",
                sentiment: "",
              },
            ],
            publishedComments: [
              {
                comment: "light\r\n\r\naccess\r\n\r\n",
                received_at: "2024-05-10T13:22:58.884+01:00",
                sentiment: "neutral",
              },
              {
                comment: "[redacted]\r\n\r\ndon't redact this comment\r\n\r\n",
                received_at: "2024-05-10T13:22:17.969+01:00",
                sentiment: "objection",
              },
              {
                comment:
                  "Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
                received_at: "2024-05-03T10:53:27.704+01:00",
                sentiment: "objection",
              },
            ],
          },
          receivedAt: "2024-07-02T12:30:43.712+01:00",
          validAt: null,
          publishedAt: "2024-09-12T13:09:01.133+01:00",
          determinedAt: null,
          decision: null,
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: {
            singleLine: "5, PANCRAS SQUARE, LONDON, N1C 4AG",
          },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "MultiPolygon",
                coordinates: [
                  [
                    [
                      [-0.124237, 51.531031],
                      [-0.124254, 51.531035],
                      [-0.124244, 51.531054],
                      [-0.124446, 51.531106],
                      [-0.124565, 51.531158],
                      [-0.124635, 51.531202],
                      [-0.124683, 51.531244],
                      [-0.124781, 51.531343],
                      [-0.124775, 51.531349],
                      [-0.124788, 51.531355],
                      [-0.124811, 51.531338],
                      [-0.124865, 51.531429],
                      [-0.124896, 51.531543],
                      [-0.124894, 51.531634],
                      [-0.124865, 51.531732],
                      [-0.124797, 51.531839],
                      [-0.124719, 51.531917],
                      [-0.124597, 51.532002],
                      [-0.124457, 51.532068],
                      [-0.124494, 51.532107],
                      [-0.124021, 51.533144],
                      [-0.123962, 51.533228],
                      [-0.123996, 51.533234],
                      [-0.123958, 51.533346],
                      [-0.123866, 51.533559],
                      [-0.123878, 51.533561],
                      [-0.123849, 51.533633],
                      [-0.123838, 51.533632],
                      [-0.123828, 51.533649],
                      [-0.123735, 51.533896],
                      [-0.123719, 51.533893],
                      [-0.123666, 51.534007],
                      [-0.12365, 51.534004],
                      [-0.123635, 51.534034],
                      [-0.123653, 51.534037],
                      [-0.123623, 51.534095],
                      [-0.123677, 51.534106],
                      [-0.12365, 51.534157],
                      [-0.123606, 51.534148],
                      [-0.123544, 51.534275],
                      [-0.123536, 51.534487],
                      [-0.123522, 51.534486],
                      [-0.123523, 51.534572],
                      [-0.123534, 51.534572],
                      [-0.123532, 51.534621],
                      [-0.123521, 51.534621],
                      [-0.123519, 51.534682],
                      [-0.12353, 51.534682],
                      [-0.123519, 51.534716],
                      [-0.123512, 51.534873],
                      [-0.123502, 51.534921],
                      [-0.123345, 51.534946],
                      [-0.123217, 51.534951],
                      [-0.122522, 51.534949],
                      [-0.122467, 51.534927],
                      [-0.122456, 51.535373],
                      [-0.122512, 51.535374],
                      [-0.122503, 51.535356],
                      [-0.123415, 51.535075],
                      [-0.123556, 51.535053],
                      [-0.123697, 51.53502],
                      [-0.123726, 51.535072],
                      [-0.123757, 51.535088],
                      [-0.124405, 51.534933],
                      [-0.124354, 51.534893],
                      [-0.12429, 51.534875],
                      [-0.124601, 51.534799],
                      [-0.124647, 51.534873],
                      [-0.125119, 51.534758],
                      [-0.125126, 51.534769],
                      [-0.125187, 51.534768],
                      [-0.125556, 51.53468],
                      [-0.125578, 51.534673],
                      [-0.125576, 51.534646],
                      [-0.126013, 51.534597],
                      [-0.126301, 51.534589],
                      [-0.126319, 51.534535],
                      [-0.126391, 51.534543],
                      [-0.126433, 51.534408],
                      [-0.126391, 51.534522],
                      [-0.126374, 51.534534],
                      [-0.126286, 51.534533],
                      [-0.126256, 51.534537],
                      [-0.126092, 51.53458],
                      [-0.125958, 51.534573],
                      [-0.125882, 51.534589],
                      [-0.125801, 51.534591],
                      [-0.125686, 51.534621],
                      [-0.125665, 51.534615],
                      [-0.125617, 51.534548],
                      [-0.126337, 51.534324],
                      [-0.126352, 51.534341],
                      [-0.126372, 51.534347],
                      [-0.126432, 51.534332],
                      [-0.126457, 51.534337],
                      [-0.126478, 51.534283],
                      [-0.126907, 51.534163],
                      [-0.12697, 51.534171],
                      [-0.126952, 51.534152],
                      [-0.12723, 51.53408],
                      [-0.127205, 51.534017],
                      [-0.127103, 51.53388],
                      [-0.125965, 51.532396],
                      [-0.125932, 51.532382],
                      [-0.125823, 51.532275],
                      [-0.125679, 51.532172],
                      [-0.125621, 51.532109],
                      [-0.125598, 51.532059],
                      [-0.125587, 51.532],
                      [-0.125588, 51.531947],
                      [-0.125612, 51.531845],
                      [-0.125597, 51.531743],
                      [-0.125689, 51.531714],
                      [-0.12546, 51.531421],
                      [-0.125364, 51.531449],
                      [-0.125368, 51.531538],
                      [-0.12535, 51.531652],
                      [-0.124988, 51.531217],
                      [-0.124875, 51.53111],
                      [-0.124496, 51.53071],
                      [-0.124406, 51.530741],
                      [-0.124346, 51.530779],
                      [-0.124335, 51.530811],
                      [-0.12437, 51.530825],
                      [-0.124351, 51.530855],
                      [-0.124238, 51.530876],
                      [-0.12421, 51.530891],
                      [-0.124206, 51.531005],
                      [-0.12421, 51.531024],
                      [-0.124237, 51.531031],
                    ],
                    [
                      [-0.125691, 51.532473],
                      [-0.125971, 51.532593],
                      [-0.126069, 51.532646],
                      [-0.125906, 51.532761],
                      [-0.125738, 51.53269],
                      [-0.125729, 51.532666],
                      [-0.125516, 51.532594],
                      [-0.125691, 51.532473],
                    ],
                    [
                      [-0.12646, 51.533391],
                      [-0.126251, 51.53349],
                      [-0.125836, 51.53315],
                      [-0.125897, 51.533136],
                      [-0.126001, 51.533088],
                      [-0.126063, 51.533086],
                      [-0.126253, 51.53321],
                      [-0.126371, 51.533305],
                      [-0.12646, 51.533391],
                    ],
                    [
                      [-0.12464, 51.534639],
                      [-0.124109, 51.53477],
                      [-0.124218, 51.534156],
                      [-0.124171, 51.534152],
                      [-0.124177, 51.534117],
                      [-0.124224, 51.53412],
                      [-0.124287, 51.533759],
                      [-0.124362, 51.533597],
                      [-0.124431, 51.533573],
                      [-0.124432, 51.533566],
                      [-0.124669, 51.533493],
                      [-0.124746, 51.533597],
                      [-0.124698, 51.533603],
                      [-0.124765, 51.533819],
                      [-0.124815, 51.533813],
                      [-0.124814, 51.533827],
                      [-0.124861, 51.533829],
                      [-0.124795, 51.534221],
                      [-0.124868, 51.534227],
                      [-0.125021, 51.534214],
                      [-0.125114, 51.534522],
                      [-0.12464, 51.534639],
                    ],
                  ],
                ],
              },
              properties: {
                name: "",
                entity: 12000514271,
                prefix: "title-boundary",
                dataset: "title-boundary",
                "end-date": "",
                typology: "geography",
                reference: "54173614",
                "entry-date": "2024-05-06",
                "start-date": "2012-05-29",
                planx_user_action: "Accepted the title boundary",
                "organisation-entity": "13",
              },
            },
          },
        },
        proposal: {
          description: "123",
        },
      },
      {
        application: {
          reference: "24-00129-HAPP",
          type: {
            description: "planning_permission",
          },
          status: "determined",
          consultation: {
            endDate: "2024-05-07",
            consulteeComments: [
              {
                comment:
                  "Eton Conservation Area Advisory Committee Advice from Eton Conservation Area Advisory Committee: 06.07.2023 Re: 9 Steele’s Road: 2023/2198/P Replacement of existing lower ground floor rear extension; installation of timber French doors at rear; alterations to lower ground floor side fenestration; installation of dormer on rear roof slope; replacement of all windows with timber sash windows to match existing; and associated exterior works. It is the side elevation in this proposal that presents concerns. The new large - very large - side window exposing the stairs is an uncomfortably destabilising presence at the base of this elevation. There is an ill-fitting awkwardness about it, especially as it just manages to squeeze, by a sliver, beneath a newly raised ‘existing' window. It is one of two large presences in this elevation, the other being the proposed extension. Clad in Corten Steel, this extension introduces a markedly forceful presence, which is in some danger of overpowering the main house. It reads, in the drawing, as a defiantly different, almost separate, entity - rather than being in the nature of an addition. However, it is not possible for anyone to give a fully informed and fair judgement when all there is to go on is this drawing (and that of the rear elevation) at this scale. Does Camden agree with this? We would welcome a response to this concern as we have noticed a certain increase in the incidence of drawings submitted with applications that do not provide adequate accounts of a design. We think that a more detailed presentation of the extension, including perhaps CGI’s, is needed, and should be supplied. The new large side window can surely be made more accommodating to its elevation - at present it disregards the scale and patterning of the side wall’s fenestration - and be reduced in size. And the extension requires a further, fuller presentation. Yours sincerely, Eton CAAC",
                received_at: "2024-05-03T00:00:00.000+01:00",
                sentiment: "",
              },
            ],
            publishedComments: [
              {
                comment: "light\r\n\r\naccess\r\n\r\n",
                received_at: "2024-05-10T13:22:58.884+01:00",
                sentiment: "neutral",
              },
              {
                comment: "[redacted]\r\n\r\ndon't redact this comment\r\n\r\n",
                received_at: "2024-05-10T13:22:17.969+01:00",
                sentiment: "objection",
              },
              {
                comment:
                  "Eton Conservation Area Advisory Committee Advice from Eton Conservation Area Advisory Committee: 06.07.2023 Re: 9 Steele’s Road: 2023/2198/P Replacement of existing lower ground floor rear extension; installation of timber French doors at rear; alterations to lower ground floor side fenestration; installation of dormer on rear roof slope; replacement of all windows with timber sash windows to match existing; and associated exterior works. It is the side elevation in this proposal that presents concerns. The new large - very large - side window exposing the stairs is an uncomfortably destabilising presence at the base of this elevation. There is an ill-fitting awkwardness about it, especially as it just manages to squeeze, by a sliver, beneath a newly raised ‘existing' window. It is one of two large presences in this elevation, the other being the proposed extension. Clad in Corten Steel, this extension introduces a markedly forceful presence, which is in some danger of overpowering the main house. It reads, in the drawing, as a defiantly different, almost separate, entity - rather than being in the nature of an addition. However, it is not possible for anyone to give a fully informed and fair judgement when all there is to go on is this drawing (and that of the rear elevation) at this scale. Does Camden agree with this? We would welcome a response to this concern as we have noticed a certain increase in the incidence of drawings submitted with applications that do not provide adequate accounts of a design. We think that a more detailed presentation of the extension, including perhaps CGI’s, is needed, and should be supplied. The new large side window can surely be made more accommodating to its elevation - at present it disregards the scale and patterning of the side wall’s fenestration - and be reduced in size. And the extension requires a further, fuller presentation. Yours sincerely, Eton CAAC",
                received_at: "2024-05-03T10:53:27.704+01:00",
                sentiment: "objection",
              },
            ],
          },
          receivedAt: "2024-05-02T16:14:39.305+01:00",
          validAt: "2024-05-02T00:00:00.000+01:00",
          publishedAt: "2024-05-02T00:00:00.000+01:00",
          determinedAt: "2024-05-10T13:38:10.852+01:00",
          decision: "granted",
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: {
            singleLine: "9, STEELE'S ROAD, LONDON, NW3 4SE",
          },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "MultiPolygon",
                coordinates: [
                  [
                    [
                      [-0.159706, 51.545376],
                      [-0.159223, 51.545115],
                      [-0.15913, 51.54518],
                      [-0.159612, 51.545443],
                      [-0.159706, 51.545376],
                    ],
                  ],
                ],
              },
              properties: {
                name: "",
                entity: 12000509759,
                prefix: "title-boundary",
                dataset: "title-boundary",
                "end-date": "",
                typology: "geography",
                reference: "49074380",
                "entry-date": "2023-12-12",
                "start-date": "2010-12-08",
                planx_user_action: "Accepted the title boundary",
                "organisation-entity": "13",
              },
            },
          },
        },
        proposal: {
          description:
            "Replacement of existing lower ground floor rear extension; installation of timber French doors at rear; alterations to lower ground floor side fenestration; installation of dormer on rear roof slope.",
        },
      },
      {
        application: {
          reference: "24-00128-PA1A",
          type: {
            description: "prior_approval",
          },
          status: "in_assessment",
          consultation: {
            endDate: "2024-05-17",
            consulteeComments: null,
            publishedComments: [
              {
                comment: "light",
                received_at: "2024-04-25T16:09:30.142+01:00",
                sentiment: "neutral",
              },
              {
                comment: "love it",
                received_at: "2024-04-25T16:07:37.468+01:00",
                sentiment: "supportive",
              },
              {
                comment: "i like light\r\n\r\ni dont have access",
                received_at: "2024-04-25T16:06:58.412+01:00",
                sentiment: "objection",
              },
            ],
          },
          receivedAt: "2024-04-25T15:51:42.055+01:00",
          validAt: "2024-04-25T00:00:00.000+01:00",
          publishedAt: "2024-04-25T00:00:00.000+01:00",
          determinedAt: null,
          decision: null,
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: {
            singleLine: "5, PANCRAS SQUARE, LONDON, N1C 4AG",
          },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-0.12685909867286713, 51.53386742058888],
                    [-0.12680545449256933, 51.5338832710824],
                    [-0.12684836983680758, 51.53393749641327],
                    [-0.1265640556812292, 51.534023422574506],
                    [-0.1264607906341559, 51.53387659719107],
                    [-0.12671694159507793, 51.53376814631963],
                    [-0.12676924467086834, 51.53375229578603],
                    [-0.12685909867286713, 51.53386742058888],
                  ],
                ],
              },
              properties: null,
            },
          },
        },
        proposal: {
          description: "6m extension",
        },
      },
      {
        application: {
          reference: "23-00117-LDCP",
          type: {
            description: "lawfulness_certificate",
          },
          status: "determined",
          consultation: {
            endDate: null,
            consulteeComments: null,
            publishedComments: null,
          },
          receivedAt: "2023-08-16T11:35:54.354+01:00",
          validAt: "2023-08-16T00:00:00.000+01:00",
          publishedAt: "2023-08-16T00:00:00.000+01:00",
          determinedAt: "2023-08-16T12:58:25.556+01:00",
          decision: "granted",
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: {
            singleLine: "3 Fellows Road, London, NW3 3LR",
          },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-0.07716178894042969, 51.50094238217541],
                    [-0.07645905017852783, 51.50053497847238],
                    [-0.07615327835083008, 51.50115276135022],
                    [-0.07716178894042969, 51.50094238217541],
                  ],
                ],
              },
            },
          },
        },
        proposal: {
          description: "Erection of pool and outbuilding in the rear garden",
        },
      },
      {
        application: {
          reference: "23-00112-PA1A",
          type: {
            description: "prior_approval",
          },
          status: "determined",
          consultation: {
            endDate: "2023-08-30",
            consulteeComments: null,
            publishedComments: [
              {
                comment: "Test Test ",
                received_at: "2023-06-11T00:00:00.000+01:00",
                sentiment: "objection",
              },
            ],
          },
          receivedAt: "2023-08-08T13:33:41.265+01:00",
          validAt: "2023-08-08T00:00:00.000+01:00",
          publishedAt: "2023-08-08T00:00:00.000+01:00",
          determinedAt: "2024-06-12T17:57:10.534+01:00",
          decision: "granted",
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: {
            singleLine: "11 Abbey Gardens, London, SE16 3RQ",
          },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-0.07716178894042969, 51.50094238217541],
                    [-0.07645905017852783, 51.50053497847238],
                    [-0.07615327835083008, 51.50115276135022],
                    [-0.07716178894042969, 51.50094238217541],
                  ],
                ],
              },
            },
          },
        },
        proposal: {
          description: "Add a rear extension",
        },
      },
      {
        application: {
          reference: "23-00111-PA1A",
          type: {
            description: "prior_approval",
          },
          status: "in_assessment",
          consultation: {
            endDate: "2023-08-30",
            consulteeComments: null,
            publishedComments: null,
          },
          receivedAt: "2023-08-08T13:32:55.842+01:00",
          validAt: "2023-08-08T00:00:00.000+01:00",
          publishedAt: "2023-08-08T00:00:00.000+01:00",
          determinedAt: null,
          decision: null,
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: {
            singleLine: "11 Abbey Gardens, London, SE16 3RQ",
          },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-0.07716178894042969, 51.50094238217541],
                    [-0.07645905017852783, 51.50053497847238],
                    [-0.07615327835083008, 51.50115276135022],
                    [-0.07716178894042969, 51.50094238217541],
                  ],
                ],
              },
            },
          },
        },
        proposal: {
          description: "Add a rear extension",
        },
      },
      {
        application: {
          reference: "23-00110-PA1A",
          type: {
            description: "prior_approval",
          },
          status: "determined",
          consultation: {
            endDate: "2023-08-21",
            consulteeComments: null,
            publishedComments: [
              {
                comment: "test",
                received_at: "2023-01-01T00:00:00.000+00:00",
                sentiment: "supportive",
              },
            ],
          },
          receivedAt: "2023-07-28T11:25:10.815+01:00",
          validAt: "2023-07-28T00:00:00.000+01:00",
          publishedAt: "2023-07-28T00:00:00.000+01:00",
          determinedAt: "2024-06-12T18:03:00.600+01:00",
          decision: "refused",
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: {
            singleLine: "Test address 02, London, NW3 3EP",
          },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-0.07716178894042969, 51.50094238217541],
                    [-0.07645905017852783, 51.50053497847238],
                    [-0.07615327835083008, 51.50115276135022],
                    [-0.07716178894042969, 51.50094238217541],
                  ],
                ],
              },
            },
          },
        },
        proposal: {
          description: "Add a rear extension",
        },
      },
      {
        application: {
          reference: "23-00109-PA1A",
          type: {
            description: "prior_approval",
          },
          status: "determined",
          consultation: {
            endDate: "2023-08-21",
            consulteeComments: null,
            publishedComments: null,
          },
          receivedAt: "2023-07-28T11:24:14.825+01:00",
          validAt: "2023-07-28T00:00:00.000+01:00",
          publishedAt: "2023-07-28T00:00:00.000+01:00",
          determinedAt: "2023-08-01T13:27:30.118+01:00",
          decision: "refused",
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: {
            singleLine: "Test address, London, NW3 3EP",
          },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-0.07716178894042969, 51.50094238217541],
                    [-0.07645905017852783, 51.50053497847238],
                    [-0.07615327835083008, 51.50115276135022],
                    [-0.07716178894042969, 51.50094238217541],
                  ],
                ],
              },
            },
          },
        },
        proposal: {
          description: "Add a rear extension",
        },
      },
      {
        application: {
          reference: "23-00108-LDCP",
          type: {
            description: "lawfulness_certificate",
          },
          status: "in_assessment",
          consultation: {
            endDate: null,
            consulteeComments: null,
            publishedComments: null,
          },
          receivedAt: "2023-07-28T11:20:15.274+01:00",
          validAt: "2023-07-28T00:00:00.000+01:00",
          publishedAt: "2023-07-28T00:00:00.000+01:00",
          determinedAt: null,
          decision: null,
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: {
            singleLine: "43 Eton Avenue, London, NW3 3EP",
          },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-0.07716178894042969, 51.50094238217541],
                    [-0.07645905017852783, 51.50053497847238],
                    [-0.07615327835083008, 51.50115276135022],
                    [-0.07716178894042969, 51.50094238217541],
                  ],
                ],
              },
            },
          },
        },
        proposal: {
          description: "Add a chimney stack",
        },
      },
      {
        application: {
          reference: "23-00107-PA1A",
          type: {
            description: "prior_approval",
          },
          status: "determined",
          consultation: {
            endDate: "2023-08-21",
            consulteeComments: null,
            publishedComments: [
              {
                comment: "test",
                received_at: "2023-01-01T00:00:00.000+00:00",
                sentiment: "objection",
              },
            ],
          },
          receivedAt: "2023-07-28T11:16:44.688+01:00",
          validAt: "2023-07-28T00:00:00.000+01:00",
          publishedAt: "2023-07-28T00:00:00.000+01:00",
          determinedAt: "2023-08-01T15:26:23.160+01:00",
          decision: "granted",
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: {
            singleLine: "11 Abbey Gardens, London, SE16 3RQ",
          },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-0.07716178894042969, 51.50094238217541],
                    [-0.07645905017852783, 51.50053497847238],
                    [-0.07615327835083008, 51.50115276135022],
                    [-0.07716178894042969, 51.50094238217541],
                  ],
                ],
              },
            },
          },
        },
        proposal: {
          description: "Add a rear extension",
        },
      },
    ],
  },
  status: {
    code: 200,
    message: "",
  },
};

const responseDsn: ApiResponse<DprSearch | null> = {
  data: {
    pagination: {
      page: 1,
      results: 10,
      from: 1,
      to: 1,
      total_pages: 1,
      total_results: 1,
    },
    data: [
      {
        application: {
          reference: "24-00128-PA1A",
          type: { description: "prior_approval" },
          status: "in_assessment",
          consultation: {
            endDate: "2024-05-17",
            consulteeComments: null,
            publishedComments: [
              {
                comment: "light",
                received_at: "2024-04-25T16:09:30.142+01:00",
                sentiment: "neutral",
              },
              {
                comment: "love it",
                received_at: "2024-04-25T16:07:37.468+01:00",
                sentiment: "supportive",
              },
              {
                comment: "i like light\r\n\r\ni dont have access",
                received_at: "2024-04-25T16:06:58.412+01:00",
                sentiment: "objection",
              },
            ],
          },
          receivedAt: "2024-04-25T15:51:42.055+01:00",
          validAt: "2024-04-25T00:00:00.000+01:00",
          publishedAt: "2024-04-25T00:00:00.000+01:00",
          determinedAt: null,
          decision: null,
          id: 0,
          applicant_first_name: "",
          applicant_last_name: "",
          agent_first_name: "",
          agent_last_name: "",
          documents: null,
        },
        property: {
          address: { singleLine: "5, PANCRAS SQUARE, LONDON, N1C 4AG" },
          boundary: {
            site: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-0.12685909867286713, 51.53386742058888],
                    [-0.12680545449256933, 51.5338832710824],
                    [-0.12684836983680758, 51.53393749641327],
                    [-0.1265640556812292, 51.534023422574506],
                    [-0.1264607906341559, 51.53387659719107],
                    [-0.12671694159507793, 51.53376814631963],
                    [-0.12676924467086834, 51.53375229578603],
                    [-0.12685909867286713, 51.53386742058888],
                  ],
                ],
              },
              properties: null,
            },
          },
        },
        proposal: { description: "6m extension" },
      },
    ],
  },
  status: { code: 200, message: "OK" },
};

const responseQuery = (query: string): ApiResponse<DprSearch | null> => {
  const filteredData = response.data?.data.filter(
    (item) => item.application.reference === query,
  );

  return {
    ...response,
    data: {
      ...response.data,
      data: filteredData ? filteredData : [],
      pagination: {
        page: 1,
        results: filteredData ? filteredData.length : 0,
        from: 1,
        to: 1,
        total_pages: 1,
        total_results: 1,
      },
    },
  };
};

export const search = (
  search?: SearchParams,
): Promise<ApiResponse<DprSearch | null>> => {
  // todo fake query match/no match response
  if (search?.query) {
    return Promise.resolve(responseQuery(search.query));
  }

  if (search?.type === "dsn") {
    return Promise.resolve(responseDsn);
  }

  return Promise.resolve(response);
};
