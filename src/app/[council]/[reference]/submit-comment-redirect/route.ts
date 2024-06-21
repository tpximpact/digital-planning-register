import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { submitComment } from "@/actions";

const topics_selection = [
  {
    label: "Design, size or height of new buildings or extensions",
    value: "design",
  },
  { label: "Use and function of the proposed development", value: "use" },
  { label: "Impacts on natural light", value: "light" },
  { label: "Privacy of neighbours", value: "privacy" },
  { label: "Disabled persons' access", value: "access" },
  { label: "Noise from new uses", value: "noise" },
  { label: "Traffic, parking or road safety", value: "traffic" },
  { label: "Other", value: "other" },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const council = searchParams.get("council");
  const reference = searchParams.get("reference");

  if (!council || !reference) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(
    new URL(`/${council}/${reference}/submit-comment?page=0`, request.url),
  );
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const { searchParams } = new URL(request.url);

  const council =
    (formData.get("council") as string) || searchParams.get("council");
  const reference =
    (formData.get("reference") as string) || searchParams.get("reference");
  const page = parseInt(searchParams.get("page") || "0");

  if (!council || !reference) {
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=0`, request.url),
    );
  }

  switch (page) {
    case 0:
      cookies().set("council", council);
      cookies().set("reference", reference);
      cookies().set("applicationId", formData.get("applicationId") as string);
      return NextResponse.redirect(
        new URL(`/${council}/${reference}/submit-comment?page=1`, request.url),
      );

    case 1:
      const sentiment = formData.get("sentiment") as string;
      if (sentiment) {
        cookies().set("sentiment", sentiment);
        cookies().delete("validationError");
        return NextResponse.redirect(
          new URL(
            `/${council}/${reference}/submit-comment?page=2`,
            request.url,
          ),
        );
      } else {
        cookies().set("validationError", "true");
        return NextResponse.redirect(
          new URL(
            `/${council}/${reference}/submit-comment?page=1`,
            request.url,
          ),
        );
      }

    case 2:
      const selectedTopics = formData.getAll("topics") as string[];
      if (selectedTopics.length > 0) {
        cookies().delete("validationError");
        cookies().set("selectedTopics", selectedTopics.join(","));
        cookies().set("currentTopicIndex", "0");
        return NextResponse.redirect(
          new URL(
            `/${council}/${reference}/submit-comment?page=3`,
            request.url,
          ),
        );
      } else {
        cookies().set("validationError", "true");
        return NextResponse.redirect(
          new URL(
            `/${council}/${reference}/submit-comment?page=2`,
            request.url,
          ),
        );
      }

    case 3:
      const comment = formData.get("comment") as string;
      if (comment) {
        cookies().delete("validationError");
        const selectedTopics =
          cookies().get("selectedTopics")?.value?.split(",") || [];
        const currentTopicIndex = parseInt(
          cookies().get("currentTopicIndex")?.value || "0",
        );
        const currentTopic = selectedTopics[currentTopicIndex];

        const existingCommentsValue = cookies().get("commentData")?.value;
        const existingComments = existingCommentsValue
          ? JSON.parse(existingCommentsValue)
          : {};
        existingComments[currentTopic] = comment;
        cookies().set("commentData", JSON.stringify(existingComments));

        if (currentTopicIndex < selectedTopics.length - 1) {
          cookies().set(
            "currentTopicIndex",
            (currentTopicIndex + 1).toString(),
          );
          return NextResponse.redirect(
            new URL(
              `/${council}/${reference}/submit-comment?page=3`,
              request.url,
            ),
          );
        } else {
          cookies().delete("currentTopicIndex");
          return NextResponse.redirect(
            new URL(
              `/${council}/${reference}/submit-comment?page=4`,
              request.url,
            ),
          );
        }
      } else {
        cookies().set("validationError", "true");
        return NextResponse.redirect(
          new URL(
            `/${council}/${reference}/submit-comment?page=3`,
            request.url,
          ),
        );
      }

    case 4:
      const name = formData.get("name") as string;
      const address = formData.get("address") as string;
      const postcode = formData.get("postcode") as string;
      const emailAddress = formData.get("email-address") as string;
      const telephoneNumber = formData.get("telephone-number") as string;
      const consent = formData.get("consent") as string;

      const personalDetails = {
        name,
        address,
        postcode,
        emailAddress,
        telephoneNumber,
        consent,
      };
      cookies().set("personalDetails", JSON.stringify(personalDetails));

      const errors: { [key: string]: boolean } = {
        name: !name,
        address: !address,
        postcode: !postcode,
        consent: !consent,
      };

      if (Object.values(errors).some((error) => error)) {
        cookies().set("validationErrors", JSON.stringify(errors));
        return NextResponse.redirect(
          new URL(
            `/${council}/${reference}/submit-comment?page=4`,
            request.url,
          ),
        );
      } else {
        cookies().delete("validationError");
        cookies().set("personalDetails", JSON.stringify(personalDetails));
        return NextResponse.redirect(
          new URL(
            `/${council}/${reference}/submit-comment?page=5`,
            request.url,
          ),
        );
      }

    case 5:
      // application id - temporary whilst the api accepts only the id
      // Retrieve applicationId from cookies and convert it to a number
      const applicationIdString = cookies().get("applicationId")?.value;
      const applicationId = applicationIdString
        ? parseInt(applicationIdString, 10)
        : null;

      // Check if applicationId is a valid number
      if (applicationId === null || isNaN(applicationId)) {
        console.error("Invalid or missing application ID");
        cookies().set("submissionError", "true");
        return NextResponse.redirect(
          new URL(
            `/${council}/${reference}/submit-comment?page=4`,
            request.url,
          ),
        );
      }
      const sentimentCookie = cookies().get("sentiment")?.value || "";
      const personalDetailsCookie = JSON.parse(
        cookies().get("personalDetails")?.value || "{}",
      );
      const commentData = JSON.parse(
        cookies().get("commentData")?.value || "{}",
      );
      const selectedTopicsCookie =
        cookies().get("selectedTopics")?.value?.split(",") || [];

      const apiData = {
        name: personalDetailsCookie.name,
        email: personalDetailsCookie.emailAddress,
        address: `${personalDetailsCookie.address}, ${personalDetailsCookie.postcode}`,
        response: selectedTopicsCookie
          .map((topic) => {
            const topicLabel = topics_selection.find(
              (t) => t.value === topic,
            )?.label;
            const comment = commentData[topic];
            return `* ${topicLabel}: ${comment} `;
          })
          .join(" "),
        summary_tag:
          sentimentCookie === "opposed" ? "objection" : sentimentCookie,
        tags: selectedTopicsCookie,
      };
      // console.log(apiData);
      // // Handle final submission (DEBUG MODE)
      // console.log("Form submitted");
      // cookies().delete("sentiment");
      // cookies().delete("selectedTopics");
      // cookies().delete("currentTopicIndex");
      // cookies().delete("commentData");
      // cookies().delete("personalDetails");
      // cookies().delete("validationError");
      // return NextResponse.redirect(
      //   new URL(`/${council}/${reference}/submit-comment?page=6`, request.url),
      // );
      // // Handle final submission (SUBMITS TO STAGING)
      // cookies().delete("submissionError");
      try {
        // once the new api endpoint takes in a reference, we will be able to swap it with the applicationId
        const result = await submitComment(applicationId, council, apiData);
        console.log(apiData);
        if (result.status === 200) {
          console.log("status 200");
          cookies().delete("sentiment");
          cookies().delete("selectedTopics");
          cookies().delete("commentData");
          cookies().delete("personalDetails");
          cookies().delete("reference");
          cookies().delete("submissionError");
          cookies().delete("validationError");
          cookies().delete("applicationId");
          cookies().delete("council");
          return NextResponse.redirect(
            new URL(
              `/${council}/${reference}/submit-comment?page=6`,
              request.url,
            ),
          );
        } else {
          cookies().set("submissionError", "true");
          console.log("Error caught");
          console.log(result);

          return NextResponse.redirect(
            new URL(
              `/${council}/${reference}/submit-comment?page=5`,
              request.url,
            ),
          );
        }
      } catch (error) {
        console.log("Error caught");
        console.error("Error submitting the comment", error);
        cookies().set("submissionError", "true");
        return NextResponse.redirect(
          new URL(
            `/${council}/${reference}/submit-comment?page=5`,
            request.url,
          ),
        );
      }

    default:
      return NextResponse.redirect(
        new URL(`/${council}/${reference}/submit-comment`, request.url),
      );
  }
}
