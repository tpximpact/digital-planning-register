/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

export const generateApplicationSubmission: unknown = {
  data: {
    user: {
      role: "proxy",
    },
    property: {
      EPC: {
        known: "The property does not have one",
      },
      type: {
        value: "object.religious.building",
        description: "Religious building",
      },
      region: "London",
      address: {
        x: 529090,
        y: 179645,
        pao: "1",
        town: "LONDON",
        uprn: "010033544614",
        usrn: "8401735",
        title: "BUCKINGHAM PALACE, THE MALL, LONDON, SW1A 1AA",
        source: "Ordnance Survey",
        street: "LONDON",
        latitude: 51.501009,
        postcode: "SW1A 1AA",
        longitude: -0.141588,
        singleLine: "BUCKINGHAM PALACE, THE MALL, LONDON, SW1A 1AA",
      },
      boundary: {
        area: {
          hectares: 0.045137000000000004,
          squareMetres: 451.37,
        },
        site: {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            coordinates: [
              [
                [-0.14160736625672143, 51.501391864339894],
                [-0.14206486309925026, 51.50191091373006],
                [-0.14357017528993765, 51.50136889741606],
                [-0.14378416574851371, 51.501511292156806],
                [-0.14421952564757134, 51.50125865602101],
                [-0.14408670398330514, 51.500973864515856],
                [-0.1436808600096242, 51.501079513184976],
                [-0.14300937270851932, 51.50043643053718],
                [-0.1433266689059849, 51.50026187796723],
                [-0.1426773185495449, 51.49972443559244],
                [-0.14168853505100287, 51.500137853366],
                [-0.14207962106195282, 51.50052370657184],
                [-0.1417697038452559, 51.50067069740996],
                [-0.1414450286670501, 51.500468584885226],
                [-0.14094325793638518, 51.50073041230226],
                [-0.14160736625672143, 51.501391864339894],
              ],
            ],
          },
          properties: {
            name: "",
            label: "1",
            entity: 12000365388,
            prefix: "title-boundary",
            dataset: "title-boundary",
            "end-date": "",
            typology: "geography",
            reference: "30240506",
            "entry-date": "2024-05-06",
            "start-date": "2009-12-10",
            "area.hectares": 0.026773,
            "area.squareMetres": 267.73,
            planx_user_action: "Amended the title boundary",
            "organisation-entity": "13",
          },
        },
      },
      planning: {
        sources: [
          "https://api.editor.planx.uk/gis/camden?geom=MULTIPOLYGON%20(((-1.0206931342729486%2053.50213165258532%2C%20-1.020646%2053.502065000000016%2C%20-1.020719%2053.502047000000005%2C%20-1.0206422209739665%2053.50198572771234%2C%20-1.020557%2053.501923000000005%2C%20-1.020433%2053.50195500000001%2C%20-1.0205027461051923%2053.50206709121434%2C%20-1.020549684762953%2053.50215722902928%2C%20-1.0206931342729486%2053.50213165258532)))&vals=archaeologicalPriorityArea%2CarticleFour%2CarticleFour.caz%2CbrownfieldSite%2Cdesignated.AONB%2Cdesignated.conservationArea%2CgreenBelt%2Cdesignated.nationalPark%2Cdesignated.nationalPark.broads%2Cdesignated.WHS%2Cflood%2Clisted%2Cmonument%2Cnature.ASNW%2Cnature.ramsarSite%2Cnature.SAC%2Cnature.SPA%2Cnature.SSSI%2CregisteredPark%2Croad.classified%2Ctpo&sessionId=f3385832-fff4-4d4b-baf1-9520022782c6",
          "https://api.editor.planx.uk/roads?usrn=8401735",
        ],
        designations: [
          {
            value: "articleFour",
            description: "Article 4 direction area",
            intersects: true,
            entities: [
              {
                name: "Whole District excluding the Town of Chesham - Poultry production.",
                description:
                  "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
                source: {
                  text: "Planning Data",
                  url: "https://www.planning.data.gov.uk/entity/7010002192",
                },
              },
            ],
          },
          {
            value: "articleFour.caz",
            description: "Central Activities Zone (CAZ)",
            intersects: false,
          },
          {
            value: "tpo",
            description: "Tree Preservation Order (TPO) or zone",
            intersects: false,
          },
          {
            value: "listed",
            description: "Listed building",
            intersects: true,
            entities: [
              {
                name: "87, HACKFORD ROAD SW9",
                source: {
                  text: "Planning Data",
                  url: "https://www.planning.data.gov.uk/entity/31537921",
                },
              },
              {
                name: "No Address Supplied",
                source: {
                  text: "Planning Data",
                  url: "https://www.planning.data.gov.uk/entity/42103309",
                },
              },
            ],
          },
          {
            value: "monument",
            description: "Site of a Scheduled Monument",
            intersects: false,
          },
          {
            value: "greenBelt",
            description: "Green belt",
            intersects: true,
            entities: [
              {
                name: "Buckinghamshire",
                source: {
                  text: "Planning Data",
                  url: "https://www.planning.data.gov.uk/entity/610030",
                },
              },
            ],
          },
          {
            value: "designated",
            description: "Designated land",
            intersects: true,
          },
          {
            value: "nature.SAC",
            description: "Special Area of Conservation (SAC)",
            intersects: false,
          },
          {
            value: "nature.ASNW",
            description: "Ancient Semi-Natural Woodland (ASNW)",
            intersects: false,
          },
          {
            value: "nature.SSSI",
            description: "Site of Special Scientific Interest (SSSI)",
            intersects: false,
          },
          {
            value: "nature.SPA",
            description: "Special Protection Area (SPA)",
            intersects: false,
          },
          {
            value: "designated.WHS",
            description: "UNESCO World Heritage Site (WHS)",
            intersects: false,
          },
          {
            value: "registeredPark",
            description: "Registered parks and gardens",
            intersects: false,
          },
          {
            value: "designated.AONB",
            description: "Area of Outstanding Natural Beauty (AONB)",
            intersects: true,
            entities: [
              {
                name: "Chilterns",
                source: {
                  text: "Planning Data",
                  url: "https://www.planning.data.gov.uk/entity/1000005",
                },
              },
            ],
          },
          {
            value: "designated.nationalPark",
            description: "National Park",
            intersects: false,
          },
          {
            value: "designated.conservationArea",
            description: "Conservation area",
            intersects: true,
            entities: [
              {
                name: "Dulwich Village",
                source: {
                  url: "https://www.planning.data.gov.uk/entity/44007440",
                  text: "Planning Data",
                },
              },
              {
                name: "Hackford Road",
                source: {
                  text: "Planning Data",
                  url: "https://www.planning.data.gov.uk/entity/44000877",
                },
              },
            ],
          },
          {
            value: "designated.nationalPark.broads",
            description: "National Park - Broads",
            intersects: false,
          },
          {
            value: "road.classified",
            description: "Classified road",
            intersects: true,
            entities: [
              {
                name: "Stock Lane - Classified Unnumbered",
                source: {
                  text: "Ordnance Survey MasterMap Highways",
                },
              },
            ],
          },
        ],
      },
      titleNumber: {
        known: "No",
      },
      localAuthorityDistrict: ["Camden"],
    },
    proposal: {
      date: {
        start: "2025-05-01",
        completion: "2025-05-05",
      },
      boundary: {
        area: {
          squareMetres: 483.4,
        },
        site: {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            coordinates: [
              [
                [-0.14160736625672143, 51.501391864339894],
                [-0.14206486309925026, 51.50191091373006],
                [-0.14326713531195878, 51.50188372762801],
                [-0.14378416574851371, 51.501511292156806],
                [-0.14421952564757134, 51.50125865602101],
                [-0.14408670398330514, 51.500973864515856],
                [-0.1436808600096242, 51.501079513184976],
                [-0.14390586597662036, 51.50033031760191],
                [-0.1433266689059849, 51.50026187796723],
                [-0.1426773185495449, 51.49972443559244],
                [-0.14168853505100287, 51.500137853366],
                [-0.14207962106195282, 51.50052370657184],
                [-0.1417697038452559, 51.50067069740996],
                [-0.1414450286670501, 51.500468584885226],
                [-0.14094325793638518, 51.50073041230226],
                [-0.14160736625672143, 51.501391864339894],
              ],
            ],
          },
          properties: {
            name: "",
            label: "1",
            entity: 12000512100,
            prefix: "title-boundary",
            dataset: "title-boundary",
            "end-date": "",
            typology: "geography",
            reference: "36675100",
            "entry-date": "2024-05-06",
            "start-date": "2003-08-21",
            "area.hectares": 0.04834,
            "area.squareMetres": 483.4,
            planx_user_action: "Amended the title boundary",
            "organisation-entity": "13",
          },
        },
      },
      description:
        "Maecenas sed diam eget risus varius blandit sit amet non magna.\n\nVivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.\n\n\n",
      projectType: [
        {
          value: "alter.boundary.add",
          description: "Add a new fence, wall or gate",
        },
      ],
    },
    applicant: {
      name: {
        last: "Last",
        first: "First",
      },
      type: "parishCouncil",
      agent: {
        name: {
          last: "Last",
          first: "First",
        },
        email: "REDACTED",
        phone: {
          primary: "REDACTED",
        },
        address: {
          town: "London",
          line1: "Buckingham Palace",
          line2: "",
          county: "London",
          country: "United Kingdom",
          postcode: "NW1 7EX",
        },
        company: {
          name: "Roman Catholic Church",
        },
      },
      email: "REDACTED",
      phone: {
        primary: "REDACTED",
      },
      address: {
        sameAsSiteAddress: true,
      },
      company: {
        name: "Our Lady of Hal RC Church",
      },
      ownership: {
        owners: [
          {
            name: "Father Mark Dunglinson on behalf of the Diocese of Westminster",
            address: {
              town: "London",
              line1: "165 Arlington Road",
              line2: "Camden",
              county: "Greater London",
              country: "United Kingdom",
              postcode: "SW1A 1AA",
            },
            interest: "",
            noticeGiven: false,
            noNoticeReason: "",
          },
        ],
        interest: "occupier",
      },
      siteContact: {
        role: "applicant",
      },
    },
    application: {
      CIL: {
        result: "notLiable",
        declaration: true,
        newDwellings: false,
        s73Application: false,
        floorAreaHundredPlus: false,
        existingPermissionPrecedingCIL: false,
      },
      fee: "REDACTED",
      type: {
        value: "ldc.proposed",
        description: "Lawful Development Certificate - Proposed use",
      },
      declaration: {
        accurate: true,
        connection: {
          value: "none",
        },
      },
    },
  },
  files: [
    {
      name: "https://api.editor.planx.uk/file/private/12345/OLH%20PROPOSED%20GATES.png",
      type: [
        {
          value: "otherDrawing",
          description: "Other - drawing",
        },
        {
          value: "otherDocument",
          description: "Other - document",
        },
        {
          value: "visualisations",
          description: "Visualisations",
        },
        {
          value: "sitePlan.existing",
          description: "Site plan - existing",
        },
        {
          value: "sitePlan.proposed",
          description: "Site plan - proposed",
        },
        {
          value: "elevations.existing",
          description: "Elevations - existing",
        },
        {
          value: "elevations.proposed",
          description: "Elevations - proposed",
        },
        {
          value: "photographs.existing",
          description: "Photographs - existing",
        },
      ],
    },
    {
      name: "https://api.editor.planx.uk/file/private/12345/OLH%20GATES.png",
      type: [
        {
          value: "sitePlan.existing",
          description: "Site plan - existing",
        },
        {
          value: "sitePlan.proposed",
          description: "Site plan - proposed",
        },
      ],
    },
    {
      name: "https://api.editor.planx.uk/file/private/12345/OLH%20GATES.png",
      type: [
        {
          value: "sitePlan.proposed",
          description: "Site plan - proposed",
        },
      ],
    },
  ],
  metadata: {
    id: "f3385832-fff4-4d4b-abc1-1234567891a1",
    schema:
      "https://theopensystemslab.github.io/digital-planning-data-schemas/v0.7.3/schemas/application.json",
    source: "PlanX",
    service: {
      fee: {
        payable: [
          {
            policyRefs: [
              {
                url: "https://www.legislation.gov.uk/uksi/2023/1197/",
                text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) (Amendment) Regulations 2023",
              },
            ],
          },
        ],
        category: {
          one: [],
          ten: [],
          two: [],
          five: [],
          four: [],
          nine: [],
          eight: [],
          three: [],
          eleven: {
            one: [],
          },
          twelve: {
            one: [],
            two: [],
          },
          fourteen: [],
          thirteen: [],
          sixAndSeven: [],
        },
        calculated: [
          {
            policyRefs: [
              {
                url: "https://www.legislation.gov.uk/uksi/2023/1197/",
                text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) (Amendment) Regulations 2023",
              },
            ],
            description:
              "<p>Each category of development has its own associated fee. The application fee is calculated from one or more categories of development, depending on the works involved in the project.</p><p>For example, the application fee for a project that includes new build shops and changes of use will be made up of whichever of the two fees is highest.</p>",
          },
          {
            policyRefs: [
              {
                url: "https://www.legislation.gov.uk/uksi/2012/2920/regulation/11",
                text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012, Regulation 11",
              },
            ],
            description:
              "<p>The planning fee for an application for a Certificate of Lawfulness for proposed changes is half the amount that would be payable in respect of an application for planning permission.</p>",
          },
        ],
      },
      url: "https://editor.planx.uk/camden/camden-apply-for-a-lawful-development-certificate/published",
      files: {
        optional: [
          {
            value: "photographs.existing",
            description: "Photographs - existing",
          },
          {
            value: "otherDrawing",
            description: "Other - drawing",
          },
          {
            value: "otherDocument",
            description: "Other - document",
          },
          {
            value: "visualisations",
            description: "Visualisations",
          },
        ],
        required: [
          {
            value: "sitePlan.proposed",
            description: "Site plan - proposed",
          },
          {
            value: "sitePlan.existing",
            description: "Site plan - existing",
          },
          {
            value: "elevations.existing",
            description: "Elevations - existing",
          },
          {
            value: "elevations.proposed",
            description: "Elevations - proposed",
          },
        ],
        recommended: [],
      },
      flowId: "22bb929f-e0d6-427d-9104-6049d4544248",
    },
    submittedAt: "2025-04-22T15:08:17.812Z",
    organisation: "CMD",
  },
  responses: [
    {
      metadata: {
        sectionName: "The property",
        autoAnswered: true,
      },
      question: "Is the property in Camden?",
      responses: [
        {
          value: "Yes",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The property",
        autoAnswered: true,
      },
      question: "Which of these best describes the use of the property?",
      responses: [
        {
          value: "Place of worship",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The property",
        autoAnswered: true,
      },
      question: "What type of religious property is it?",
      responses: [
        {
          value: "Another type of religious building",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The property",
        autoAnswered: true,
      },
      question: "Has the user already provided the site area?",
      responses: [
        {
          value: "Yes",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/ukpga/1990/8/section/191",
            text: "Town and Country Planning Act 1990, Part 7, Section 191",
          },
          {
            url: "https://www.legislation.gov.uk/ukpga/1990/8/section/192",
            text: "Section 192",
          },
          {
            url: "https://www.legislation.gov.uk/ukpga/1990/9/section/26H",
            text: "Planning (Listed Buildings and Conservation Areas) Act 1990, section 26H",
          },
        ],
        sectionName: "The project",
      },
      question: "What are you applying about?",
      responses: [
        {
          value: "Proposed changes I want to make in the future",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Is the property listed?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "What type of application is it?",
      responses: [
        {
          value: "Certificate proposed works",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/ukpga/1990/8/section/55",
            text: "Town and Country Planning Act 1990 (Section 55)",
          },
          {
            url: "https://www.legislation.gov.uk/uksi/2015/596/contents",
            text: "The Town and Country Planning (General Permitted Development) (England) Order 2015",
          },
        ],
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "List the changes involved in the project",
      responses: [
        {
          value: "Changes to a fence, wall or gate",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2015/596/schedule/2/part/2",
            text: "The Town and Country Planning (General Permitted Development) (England) Order 2015 Schedule 2, Part 2, Class A",
          },
        ],
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Is any part of the property listed?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
      },
      question: "What changes to a fence, wall, or gate do you want to do?",
      responses: [
        {
          value: "Add a new fence, gate or wall",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2015/596/schedule/2/part/2",
            text: "The Town and Country Planning (General Permitted Development) (England) Order 2015 Schedule 2, Part 2, Class A",
          },
        ],
        sectionName: "The project",
      },
      question:
        "Does any part of the new fence, gate or wall face onto a property with a listed building?",
      responses: [
        {
          value: "No",
          metadata: {
            flags: ["Planning permission / Permitted development"],
          },
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
      },
      question: "What do you want to add?",
      responses: [
        {
          value: "Gate",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
      },
      question: "The parts of the fence, gate or wall that are being added...",
      responses: [
        {
          value: "Face a road",
        },
        {
          value: "Are next to another property",
        },
        {
          value: "Are alongside a public footpath",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Is the property a school?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2015/596/schedule/2/part/2",
            text: "The Town and Country Planning (General Permitted Development) (England) Order 2015 Schedule 2, Part 2, Class A.",
          },
        ],
        sectionName: "The project",
      },
      question: "What is the height of the new fence, gate or wall?",
      responses: [
        {
          value: "1m or less",
          metadata: {
            flags: ["Planning permission / Permitted development"],
          },
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2015/596/schedule/2/part/2",
            text: "The Town and Country Planning (General Permitted Development) (England) Order 2015 Schedule 2, Part 2, Class A.",
          },
        ],
        sectionName: "The project",
      },
      question:
        "What is the height of the new fence, gate or wall that faces another property?",
      responses: [
        {
          value: "2m or less",
          metadata: {
            flags: ["Planning permission / Permitted development"],
          },
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2015/596/schedule/2/part/2",
            text: "The Town and Country Planning (General Permitted Development) (England) Order 2015 Schedule 2, Part 2, Class A.",
          },
        ],
        sectionName: "The project",
      },
      question:
        "What is the height of the new fence, gate or wall that faces a public footpath?",
      responses: [
        {
          value: "2m or less",
          metadata: {
            flags: ["Planning permission / Permitted development"],
          },
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Is the property subject to any Article 4 directions?",
      responses: [
        {
          value: "Yes",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "List all the changes involved in the project",
      responses: [
        {
          value: "Changes to a boundary fence, wall or gate",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question:
        "Is the property affected by any Article 4 directions removing this type of permitted development right?",
      responses: [
        {
          value: "None of these",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question:
        "Is the property affected by any Aticle 4 directions removing this type of permitted development right?",
      responses: [
        {
          value: "None of these",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question:
        "Is the property affected by any Aticle 4 directions removing this type of permitted development right?",
      responses: [
        {
          value: "None of these",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question:
        "Is the property affected by any Article 4 directions removing this type of permitted development right?",
      responses: [
        {
          value: "None of these",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question:
        "Is the property affected by any Aticle 4 directions removing this type of permitted development right?",
      responses: [
        {
          value: "None of these",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question:
        "Is the property affected by any Aticle 4 directions removing this type of permitted development right?",
      responses: [
        {
          value: "None of these",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "What type of application is it?",
      responses: [
        {
          value: "Certificate of lawfulness for proposed works",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/ukpga/1990/8/section/191",
            text: "Town and Country Planning Act 1990, Section 191, paragraph 2",
          },
        ],
        sectionName: "The project",
      },
      question: "Explain why the existing use or buildings are lawful",
      responses: [
        {
          value:
            "Having Spoken with Richard Limbrick, in consultation with Cllr's Pat Callaghan and Richard Cotton, Father Mark Dunglinson has understood that this is is lawful, as the gates will be below 1m.",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Is the justification for the application unknown?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/ukpga/1990/8/section/191",
            text: "Town and Country Planning Act 1990, Section 191, paragraph 2",
          },
        ],
        sectionName: "The project",
      },
      question: "Reason why a Lawful Development Certificate should be granted",
      responses: [
        {
          value: "I agree",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "What are you applying about?",
      responses: [
        {
          value: "Proposed changes I want to make in the future",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "What does the proposal involve?",
      responses: [
        {
          value: "Alterations",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
      },
      question: "Describe the proposed works",
      responses: [
        {
          value:
            "Gates, less than 1m, will be erected at street level at the entrance to the Church, in order to prevent drug related anti-social behavior.\nTo fabricate and install a pair of bi-fold gate, to be manufactured from a 40ml box frame with a 16ml sq bar\n\n\n",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
      },
      question: "Does the project create any new floorspace on the property?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
      },
      question:
        "Does the project result in the gain or loss of any residential units?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
            text: "Greater London Authority Act 1999",
          },
        ],
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Is the property in the Greater London Authority area?",
      responses: [
        {
          value: "Yes",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
            text: "Greater London Authority Act 1999",
          },
        ],
        sectionName: "The project",
      },
      question: "Does the site include more than one property?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
      },
      question: "Do you know the title number of the property?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
            text: "Greater London Authority Act 1999",
          },
        ],
        sectionName: "The project",
      },
      question:
        "Does the property have an Energy Performance Certificate (EPC)?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "What type of application is this?",
      responses: [
        {
          value: "Lawful Development Certificate",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
      },
      question:
        "Do the changes involve creating any new bedrooms or bathrooms?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "What type of LDC application is this?",
      responses: [
        {
          value: "Lawful Development Certificate - Proposed",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
            text: "Greater London Authority Act 1999",
          },
        ],
        sectionName: "The project",
      },
      question: "When will the works start?",
      responses: [
        {
          value: "2025-05-01",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/ukpga/1999/29/section/346",
            text: "Greater London Authority Act 1999",
          },
        ],
        sectionName: "The project",
      },
      question: "When will the work be completed?",
      responses: [
        {
          value: "2025-05-05",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Do the changes involve any of these?",
      responses: [
        {
          value: "Alterations to a building",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Is the property in Greater London?",
      responses: [
        {
          value: "Yes",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
      },
      question: "Are there existing or proposed parking spaces on the site?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question:
        "Have you already told us that you are doing works to a tree or hedge?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Are there any protected trees on the property?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Is the site in a conservation area?",
      responses: [
        {
          value: "Yes",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2012/605/part/3",
            text: "The Town and Country Planning (Tree Preservation)(England) Regulations 2012 Part 3",
          },
        ],
        sectionName: "The project",
      },
      question: "Could the works affect any trees?",
      responses: [
        {
          value: "No",
          metadata: {
            flags: ["Works to trees & hedges / Not required"],
          },
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "What type of application is this?",
      responses: [
        {
          value: "Lawful Development Certificate",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question:
        "Have you already told us that you are doing works to a tree or hedge?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question:
        "Do the works only involve trees or hedges that could be protected?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Could the works require tree consent?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Could the works require notice to the council?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "What type of application is it?",
      responses: [
        {
          value: "Something else",
        },
      ],
    },
    {
      metadata: {
        sectionName: "The project",
        autoAnswered: true,
      },
      question: "Is any part of the property listed?",
      responses: [
        {
          value: "No",
          metadata: {
            flags: ["Works to listed buildings / Not required"],
          },
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
        autoAnswered: true,
      },
      question: "What type of application is it?",
      responses: [
        {
          value: "None of these",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question: "Your contact details",
      responses: [
        {
          value: "REDACTED",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question: "Are you applying on behalf of someone else?",
      responses: [
        {
          value: "Yes",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question: "Are you a professional planning agent?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question: "Your contact address",
      responses: [
        {
          value:
            "165 Arlington Road, Camden, London, Greater London, NW1 7EX, United Kingdom",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question:
        "We may need to visit the site to assess the application. If we do, who should we contact to arrange the visit?",
      responses: [
        {
          value: "The applicant",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question: "Applicant's contact details",
      responses: [
        {
          value: "REDACTED",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question:
        "Is the applicant's contact address the same as the property address?",
      responses: [
        {
          value: "Yes",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question: "Which of these best describes the applicant?",
      responses: [
        {
          value: "Parish or community council",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question: "Name of the parish council or community council",
      responses: [
        {
          value: "Our Lady of Hal RC Church",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question: "Can a planning officer see the works from public land?",
      responses: [
        {
          value: "Yes, it's visible from the road or somewhere else",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
        autoAnswered: true,
      },
      question: "What type of application is this?",
      responses: [
        {
          value: "LDC (new)",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
        autoAnswered: true,
      },
      question: "Which of these best describes you?",
      responses: [
        {
          value: "Agent acting on the applicant's behalf",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question: "Full name of the owner",
      responses: [
        {
          value:
            "Father Mark Dunglinson on behalf of the Diocese of Westminster",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question: "Address of the owner",
      responses: [
        {
          value:
            "165 Arlington Road, Camden, London, Greater London, NW1 7EX, United Kingdom",
        },
      ],
    },
    {
      metadata: {
        sectionName: "About you",
      },
      question: "Have you notified the owner?",
      responses: [
        {
          value: "Yes",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2015/595/article/39",
            text: "The Town and Country Planning (Development Management Procedure) (England) Order 2015",
          },
        ],
        sectionName: "About you",
      },
      question:
        "Which of these best describes the applicant's interest in the land?",
      responses: [
        {
          value: "Occupier",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Is it a certificate for works to a listed building?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "What type of application is it?",
      responses: [
        {
          value: "Lawful Development Certificate for proposed changes",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Is the property a dwellinghouse?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "What types of changes does the application relate to?",
      responses: [
        {
          value: "Alterations",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "What types of changes does the application relate to?",
      responses: [
        {
          value: "Other alterations",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Is the property a home?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Does the project involve any of these changes?",
      responses: [
        {
          value: "None of these",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Does the project involve any of these changes?",
      responses: [
        {
          value: "Alteration",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2012/2920/regulation/14",
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012, Regulation 14",
          },
          {
            url: "https://www.legislation.gov.uk/uksi/2012/2920/regulation/4",
            text: "Regulation 4 (1)(b)",
          },
        ],
        sectionName: "Your application",
      },
      question:
        "Fee exemption for projects providing access for disabled people",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Check for multiple fees?",
      responses: [
        {
          value: "Yes",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Does the proposal include fees in category 1 or 2 to 13?",
      responses: [
        {
          value: "Yes",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Does the proposal include developments in category 1?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "What type of application is it?",
      responses: [
        {
          value: "Lawful Development Certificate for proposed changes",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "What type of application is it?",
      responses: [
        {
          value: "Another application type",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Does the project involve a demolition?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Does the application qualify for a disability exemption?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Does the application qualify for a Regulation 5A exemption?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question: "Is the site a sports field?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2012/2920/regulation/11",
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012 - Regulation 11",
          },
        ],
        sectionName: "Your application",
        autoAnswered: true,
      },
      question:
        "Is the application being made by (or on behalf of) a parish or community council?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2012/2920/schedule/1",
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012 Chapter 2, Paragraph 10",
          },
        ],
        sectionName: "Your application",
      },
      question:
        "Are you also submitting another proposal for the same site today?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
        autoAnswered: true,
      },
      question:
        "Does the application qualify for the sports club fee reduction?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2012/2920/regulation/11",
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012 - Regulation 11",
          },
        ],
        sectionName: "Your application",
        autoAnswered: true,
      },
      question:
        "Does the application qualify for the parish council reduction?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2012/2920/schedule/1",
            text: "The Town and Country Planning (Fees for Applications, Deemed Applications, Requests and Site Visits) (England) Regulations 2012 Chapter 2, Paragraph 10",
          },
        ],
        sectionName: "Your application",
        autoAnswered: true,
      },
      question:
        "Does the application qualify for the alternative application reduction?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
      },
      question:
        "Did you get any pre-application advice from the council before making this application?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Your application",
      },
      question:
        "In the 3 months before making this application, did you use our free guidance service to find out if you need planning permission?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2010/948/regulation/42",
            text: "The Community Infrastructure Levy Regulations 2010, Regulation 42",
          },
        ],
        sectionName: "Community Infrastructure Levy (CIL)",
      },
      question:
        "It looks like this project does not need to pay the Community Infrastructure Levy",
      responses: [
        {
          value:
            "This is correct - the project does not create either new buildings with 100m² new floor space or new dwellings",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Community Infrastructure Levy (CIL)",
        autoAnswered: true,
      },
      question:
        "Does the application seek to remove or vary conditions on an existing planning permission (i.e. Is it a Section 73 application)?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Community Infrastructure Levy (CIL)",
        autoAnswered: true,
      },
      question:
        "Does the application relate to details or reserved matters on an existing permission that was granted prior to the introduction of the CIL charge in the relevant local authority area?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Community Infrastructure Levy (CIL)",
        autoAnswered: true,
      },
      question:
        "Was the existing permission granted prior to the introduction of the CIL charge in your area?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Community Infrastructure Levy (CIL)",
        autoAnswered: true,
      },
      question:
        "Does the application include new build development (including extensions and replacement) of 100 square metres gross internal area or above?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Community Infrastructure Levy (CIL)",
        autoAnswered: true,
      },
      question:
        "Does the application include creation of one or more new dwellings (including residential annexes) either through new build or conversion (except the conversion of a single dwelling house into two or more separate dwellings with no additional gross internal area created)?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        policyRefs: [
          {
            url: "https://www.legislation.gov.uk/uksi/2010/948/contents",
            text: "Community Infrastructure Levy Regulations (2010)",
          },
        ],
        sectionName: "Community Infrastructure Levy (CIL)",
      },
      question: "Community Infrastructure Levy declaration",
      responses: [
        {
          value: "I/we confirm that the details given are correct",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Upload your documents",
        autoAnswered: true,
      },
      question: "What type of application is it?",
      responses: [
        {
          value: "Certificate proposed",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Upload your documents",
        autoAnswered: true,
      },
      question:
        "Does this application relate to proposed changes you want to make in the future?",
      responses: [
        {
          value: "Changes I want to make in the future",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Upload your documents",
        autoAnswered: true,
      },
      question: "What types of changes does the project involve?",
      responses: [
        {
          value: "Alteration",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Upload your documents",
        autoAnswered: true,
      },
      question:
        "Have you already told us that the project will involve works to the roof?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Upload your documents",
      },
      question:
        "Will the works involve altering the appearance or layout of any roof?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Upload your documents",
      },
      question:
        "Does the work involve any alterations to ground or floor levels?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Upload your documents",
        autoAnswered: true,
      },
      question: "Is this for submission or information only?",
      responses: [
        {
          value: "Submission",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Review and confirm",
        autoAnswered: true,
      },
      question: "Is it a certificate for works to a listed building?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Review and confirm",
        autoAnswered: true,
      },
      question: "What type of application is this?",
      responses: [
        {
          value: "Lawful Development Certificate",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Review and confirm",
      },
      question: "Connections with London Borough of Camden Council",
      responses: [
        {
          value: "None of the above apply to me",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Review and confirm",
      },
      question: "Confirm the information in this application is correct",
      responses: [
        {
          value:
            "I hereby apply for a Lawful Development Certificate as described in this form and the accompanying plans/drawings and additional information",
        },
        {
          value:
            "I confirm that the information contained in this application is truthful, accurate and complete, to the best of my knowledge",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Review and confirm",
        autoAnswered: true,
      },
      question:
        "What local planning authority is this application being sent to?",
      responses: [
        {
          value: "Other",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Review and confirm",
        autoAnswered: true,
      },
      question: "What type of application is it?",
      responses: [
        {
          value: "Lawful Development Certificate",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Review and confirm",
        autoAnswered: true,
      },
      question: "What type of works are you applying about?",
      responses: [
        {
          value: "Proposed",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Review and confirm",
        autoAnswered: true,
      },
      question: "What is the applicant's interest in the land?",
      responses: [
        {
          value: "Occupier",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Review and confirm",
        autoAnswered: true,
      },
      question: "What is the user's role?",
      responses: [
        {
          value: "Other",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Review and confirm",
        autoAnswered: true,
      },
      question: "What is the applicant's declared connections?",
      responses: [
        {
          value: "None",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Pay and send",
        autoAnswered: true,
      },
      question: "Is it a certificate for works to a listed building?",
      responses: [
        {
          value: "No",
        },
      ],
    },
    {
      metadata: {
        sectionName: "Pay and send",
        autoAnswered: true,
      },
      question: "Does the application qualify for a disability exemption?",
      responses: [
        {
          value: "No",
        },
      ],
    },
  ],
  preAssessment: [
    {
      value: "Planning permission / Permitted development",
      description:
        "It looks like the proposed changes may fall within the rules for Permitted Development and therefore would not need planning permission.",
    },
  ],
};
