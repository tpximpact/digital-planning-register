import { PublicComments, SpecialistComments } from "../data/Comment";

export const publicComments: PublicComments = {
  summary: {
    totalComments: 4,
    sentiment: {
      supportive: 1,
      objection: 2,
      neutral: 1,
    },
  },
  comments: [
    {
      id: 1,
      sentiment: "supportive",
      comment: [
        {
          topic: "design",
          question:
            "Comment on the design, size or height of new buildings or extensions",
          comment: "lalala",
        },
        {
          topic: "use",
          question:
            "Comment on the use and function of the proposed development",
          comment: "lalala",
        },
        {
          topic: "light",
          question: "Comment on impacts on natural light",
          comment: "lalala",
        },
        {
          topic: "privacy",
          question: "Comment on impacts to the privacy of neighbours",
          comment: "lalala",
        },
        {
          topic: "access",
          question: "Comment on impacts on disabled persons' access",
          comment: "lalala",
        },
        {
          topic: "noise",
          question: "Comment on any noise from new uses",
          comment: "lalala",
        },
        {
          topic: "traffic",
          question: "Comment on impacts to traffic, parking or road safety",
          comment: "lalala",
        },
        {
          topic: "other",
          question: "Comment on other things",
          comment: "lalala",
        },
      ],
      author: {
        name: {
          singleLine: "John Doe",
        },
      },
      metadata: {
        submittedAt: "2024-02-20T15:54:31.021Z",
        publishedAt: "2024-02-21T15:54:31.021Z",
        validAt: "2024-02-21T15:54:31.021Z",
      },
    },
    {
      id: 2,
      sentiment: "objection",
      comment: [
        {
          topic: "design",
          question:
            "Comment on the design, size or height of new buildings or extensions",
          comment: "lalala",
        },
        {
          topic: "use",
          question:
            "Comment on the use and function of the proposed development",
          comment: "lalala",
        },
        {
          topic: "light",
          question: "Comment on impacts on natural light",
          comment: "lalala",
        },
        {
          topic: "privacy",
          question: "Comment on impacts to the privacy of neighbours",
          comment: "lalala",
        },
        {
          topic: "access",
          question: "Comment on impacts on disabled persons' access",
          comment: "lalala",
        },
        {
          topic: "noise",
          question: "Comment on any noise from new uses",
          comment: "lalala",
        },
        {
          topic: "traffic",
          question: "Comment on impacts to traffic, parking or road safety",
          comment: "lalala",
        },
        {
          topic: "other",
          question: "Comment on other things",
          comment: "lalala",
        },
      ],
      author: {
        name: {
          singleLine: "John Doe",
        },
      },
      metadata: {
        submittedAt: "2024-02-20T15:54:31.021Z",
        publishedAt: "2024-02-21T15:54:31.021Z",
        validAt: "2024-02-21T15:54:31.021Z",
      },
    },
    {
      id: 3,
      sentiment: "objection",
      comment: [
        {
          topic: "design",
          question:
            "Comment on the design, size or height of new buildings or extensions",
          comment: "lalala",
        },
        {
          topic: "use",
          question:
            "Comment on the use and function of the proposed development",
          comment: "lalala",
        },
        {
          topic: "light",
          question: "Comment on impacts on natural light",
          comment: "lalala",
        },
        {
          topic: "privacy",
          question: "Comment on impacts to the privacy of neighbours",
          comment: "lalala",
        },
        {
          topic: "access",
          question: "Comment on impacts on disabled persons' access",
          comment: "lalala",
        },
        {
          topic: "noise",
          question: "Comment on any noise from new uses",
          comment: "lalala",
        },
        {
          topic: "traffic",
          question: "Comment on impacts to traffic, parking or road safety",
          comment: "lalala",
        },
        {
          topic: "other",
          question: "Comment on other things",
          comment: "lalala",
        },
      ],
      author: {
        name: {
          singleLine: "John Doe",
        },
      },
      metadata: {
        submittedAt: "2024-02-20T15:54:31.021Z",
        publishedAt: "2024-02-21T15:54:31.021Z",
        validAt: "2024-02-21T15:54:31.021Z",
      },
    },
    {
      id: 4,
      sentiment: "neutral",
      comment: [
        {
          topic: "design",
          question:
            "Comment on the design, size or height of new buildings or extensions",
          comment: "lalala",
        },
        {
          topic: "use",
          question:
            "Comment on the use and function of the proposed development",
          comment: "lalala",
        },
        {
          topic: "light",
          question: "Comment on impacts on natural light",
          comment: "lalala",
        },
        {
          topic: "privacy",
          question: "Comment on impacts to the privacy of neighbours",
          comment: "lalala",
        },
        {
          topic: "access",
          question: "Comment on impacts on disabled persons' access",
          comment: "lalala",
        },
        {
          topic: "noise",
          question: "Comment on any noise from new uses",
          comment: "lalala",
        },
        {
          topic: "traffic",
          question: "Comment on impacts to traffic, parking or road safety",
          comment: "lalala",
        },
        {
          topic: "other",
          question: "Comment on other things",
          comment: "lalala",
        },
      ],
      author: {
        name: {
          singleLine: "John Doe",
        },
      },
      metadata: {
        submittedAt: "2024-02-20T15:54:31.021Z",
        publishedAt: "2024-02-21T15:54:31.021Z",
        validAt: "2024-02-21T15:54:31.021Z",
      },
    },
  ],
};

export const specialistComments: SpecialistComments = {
  summary: {
    totalConsulted: 4,
    totalComments: 1,
    sentiment: {
      approved: 1,
      amendmentsNeeded: 0,
      objected: 0,
    },
  },
  comments: [
    {
      id: 1,
      sentiment: "supportive",
      constraints: [
        {
          value: "monument",
          description: "Site of a Scheduled Monument",
          intersects: true,
          entities: [
            {
              name: "Rochester Castle",
              source: {
                text: "Planning Data",
                url: "https://www.planning.data.gov.uk/entity/13909855",
              },
            },
          ],
        },
      ],
      comment: "lalala",
      author: {
        name: {
          singleLine: "Jane Smith",
        },
        organisation: "Historic England",
        specialism: "Heritage Conservation",
        jobTitle: "Heritage Conservation Officer",
      },
      consultedAt: "2025-01-27T12:50:49+0000",
      respondedAt: "2025-01-27T12:50:49+0000",
      responses: [
        {
          id: 1,
          sentiment: "supportive",
          comment: "lalala",
          author: {
            name: {
              singleLine: "Jane Smith",
            },
            organisation: "Historic England",
            specialism: "Heritage Conservation",
            jobTitle: "Heritage Conservation Officer",
          },
          consultedAt: "2025-01-27T12:50:49+0000",
          respondedAt: "2025-01-27T12:50:49+0000",
          metadata: {
            submittedAt: "2025-01-27T12:50:49+0000",
            publishedAt: "2025-01-27T12:50:49+0000",
            validAt: "2025-01-27T12:50:49+0000",
          },
        },
      ],
      metadata: {
        submittedAt: "2025-01-27T12:50:49+0000",
        publishedAt: "2025-01-27T12:50:49+0000",
        validAt: "2025-01-27T12:50:49+0000",
      },
    },
  ],
};
