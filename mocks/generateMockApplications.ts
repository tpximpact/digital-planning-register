import { BopsPlanningApplication } from "@/types/api/bops";
import { faker } from "@faker-js/faker";

// Function to generate mock digital site notice data
const generateDigitalSiteNoticeData = (): DigitalSiteNotice => ({
  name: faker.lorem.words(2),
  proposedLandUse: {
    classA: faker.datatype.boolean(),
    classB: faker.datatype.boolean(),
    classC: faker.datatype.boolean(),
    classD: faker.datatype.boolean(),
    classE: faker.datatype.boolean(),
  },
  height: faker.number.int({ min: 1, max: 100 }),
  constructionTime: `${faker.date.future().getFullYear()}-${faker.date.future().getFullYear() + 4}`,
  showHousing: true,
  housing: {
    residentialUnits: faker.number.int({ min: 1, max: 1000 }),
    affordableResidentialUnits: faker.number.int({ min: 1, max: 500 }),
  },
  showOpenSpace: true,
  openSpaceArea: faker.number.int({ min: 1, max: 100 }),
  showJobs: true,
  jobs: {
    min: faker.number.int({ min: 1, max: 50 }),
    max: faker.number.int({ min: 51, max: 1000 }),
  },
  showCarbon: true,
  carbonEmissions: faker.number.int({ min: 1, max: 1000 }),
  showAccess: true,
  access: faker.lorem.paragraph(),
});

// Function to generate mock planning applications
export const generateMockApplications = (
  count: number,
): BopsPlanningApplication[] => {
  return Array.from({ length: count }, (): BopsPlanningApplication => {
    const latitude = faker.location.latitude();
    const longitude = faker.location.longitude();

    return {
      application: {
        type: {
          value: faker.helpers.arrayElement([
            "pp.full.householder",
            "pp.full",
            "pp.outline",
          ]),
          description: "planning_permission",
        },

        reference: faker.string.alphanumeric(10).toUpperCase(),
        fullReference: faker.string.alphanumeric(12).toUpperCase(),
        targetDate: faker.date.future().toISOString(),
        receivedAt: faker.date.past().toISOString(),
        validAt: faker.date.past().toISOString(),
        publishedAt: faker.date.past().toISOString(),
        determinedAt: null,
        decision: null,
        status: "in_assessment",
        consultation: {
          startDate: faker.date.past().toISOString(),
          endDate: faker.date.future().toISOString(),
          publicUrl: null,
          publishedComments: [
            {
              comment: faker.lorem.paragraph(),
              receivedAt: faker.date.past().toISOString(),
              summaryTag: faker.helpers.arrayElement([
                "objection",
                "neutral",
                "support",
              ]),
            },
            {
              comment: faker.lorem.paragraph(),
              receivedAt: faker.date.past().toISOString(),
              summaryTag: faker.helpers.arrayElement([
                "objection",
                "neutral",
                "support",
              ]),
            },
          ],
          consulteeComments: [
            {
              comment: faker.lorem.sentence(),
              receivedAt: faker.date.past().toISOString(),
            },
          ],
        },
      },
      property: {
        address: {
          latitude,
          longitude,
          title: faker.location.streetAddress(),
          town: faker.location.city(),
          postcode: faker.location.zipCode(),
          get singleLine() {
            return `${this.title}, ${this.town}, ${this.postcode}`;
          },
          uprn: faker.string.numeric(10),
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
        description: faker.lorem.paragraph(),
      },
      digitalSiteNotice: generateDigitalSiteNoticeData(),
    };
  });
};
