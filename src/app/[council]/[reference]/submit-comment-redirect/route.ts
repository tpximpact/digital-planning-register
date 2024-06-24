import { NextRequest, NextResponse } from "next/server";
import {
  clearAllCookies,
  deleteCookie,
  getCookie,
  setCookie,
  submitComment,
} from "@/actions";

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
  const applicationId = searchParams.get("applicationId");

  if (!council || !reference || !applicationId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Create a FormData object with the applicationId
  const formData = new FormData();
  formData.append("applicationId", applicationId);

  // Use the same logic as handlePresubmissionStep
  return handlePresubmissionStep(council, reference, formData, request);
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
      return handlePresubmissionStep(council, reference, formData, request);
    case 1:
      return handleSentimentStep(council, reference, formData, request);
    case 2:
      return handleTopicsStep(council, reference, formData, request);
    case 3:
      return handleCommentsStep(council, reference, formData, request);
    case 4:
      return handlePersonalDetailsStep(council, reference, formData, request);
    case 5:
      return handleSubmissionStep(council, reference, formData, request);
    default:
      await clearAllCookies(reference);
      return NextResponse.redirect(
        new URL(`/${council}/${reference}/submit-comment?page=0`, request.url),
      );
  }
}
async function handlePresubmissionStep(
  council: string,
  reference: string,
  formData: FormData,
  request: NextRequest,
) {
  // Check for existing cookies
  const existingApplicationId = await getCookie("applicationId", reference);
  const sentiment = await getCookie("sentiment", reference);
  const selectedTopics = await getCookie("selectedTopics", reference);
  const commentData = await getCookie("commentData", reference);
  const personalDetails = await getCookie("personalDetails", reference);

  // If there's no existing applicationId or it's different, start fresh
  if (
    !existingApplicationId ||
    existingApplicationId !== formData.get("applicationId")
  ) {
    await clearAllCookies(reference);
    await setCookie(
      "applicationId",
      formData.get("applicationId") as string,
      reference,
    );
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=1`, request.url),
    );
  }

  // Determine the furthest point reached
  if (personalDetails) {
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=5`, request.url),
    );
  } else if (commentData) {
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=4`, request.url),
    );
  } else if (selectedTopics) {
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=3`, request.url),
    );
  } else if (sentiment) {
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=2`, request.url),
    );
  } else {
    // If only applicationId exists, start from sentiment page
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=1`, request.url),
    );
  }
}

function handleSentimentStep(
  council: string,
  reference: string,
  formData: FormData,
  request: NextRequest,
) {
  const sentiment = formData.get("sentiment") as string;
  if (sentiment) {
    setCookie("sentiment", sentiment, reference);
    deleteCookie("validationError", reference);
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=2`, request.url),
    );
  } else {
    setCookie("validationError", "true", reference);
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=1`, request.url),
    );
  }
}

function handleTopicsStep(
  council: string,
  reference: string,
  formData: FormData,
  request: NextRequest,
) {
  const selectedTopics = formData.getAll("topics") as string[];
  if (selectedTopics.length > 0) {
    deleteCookie("validationError", reference);
    setCookie("selectedTopics", selectedTopics.join(","), reference);
    setCookie("currentTopicIndex", "0", reference);
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=3`, request.url),
    );
  } else {
    setCookie("validationError", "true", reference);
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=2`, request.url),
    );
  }
}

async function handleCommentsStep(
  council: string,
  reference: string,
  formData: FormData,
  request: NextRequest,
) {
  const comment = formData.get("comment") as string;
  if (comment) {
    await deleteCookie("validationError", reference);
    const selectedTopicsCookie = await getCookie("selectedTopics", reference);
    const selectedTopics = selectedTopicsCookie?.split(",") || [];
    const currentTopicIndexCookie = await getCookie(
      "currentTopicIndex",
      reference,
    );
    const currentTopicIndex = parseInt(currentTopicIndexCookie || "0");
    const currentTopic = selectedTopics[currentTopicIndex];

    const existingCommentsValue = await getCookie("commentData", reference);
    const existingComments = existingCommentsValue
      ? JSON.parse(existingCommentsValue)
      : {};
    existingComments[currentTopic] = comment;
    await setCookie("commentData", JSON.stringify(existingComments), reference);
    if (currentTopicIndex < selectedTopics.length - 1) {
      await setCookie(
        "currentTopicIndex",
        (currentTopicIndex + 1).toString(),
        reference,
      );
      return NextResponse.redirect(
        new URL(`/${council}/${reference}/submit-comment?page=3`, request.url),
      );
    } else {
      await deleteCookie("currentTopicIndex", reference);
      return NextResponse.redirect(
        new URL(`/${council}/${reference}/submit-comment?page=4`, request.url),
      );
    }
  } else {
    await setCookie("validationError", "true", reference);
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=3`, request.url),
    );
  }
}

function handlePersonalDetailsStep(
  council: string,
  reference: string,
  formData: FormData,
  request: NextRequest,
) {
  const personalDetails = {
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    postcode: formData.get("postcode") as string,
    emailAddress: formData.get("email-address") as string,
    telephoneNumber: formData.get("telephone-number") as string,
    consent: formData.get("consent") as string,
  };

  const errors: { [key: string]: boolean } = {
    name: !personalDetails.name,
    address: !personalDetails.address,
    postcode: !personalDetails.postcode,
    consent: !personalDetails.consent,
  };

  setCookie("personalDetails", JSON.stringify(personalDetails), reference);

  if (Object.values(errors).some((error) => error)) {
    setCookie("validationErrors", JSON.stringify(errors), reference);
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=4`, request.url),
    );
  } else {
    deleteCookie("validationError", reference);
    setCookie("personalDetails", JSON.stringify(personalDetails), reference);
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=5`, request.url),
    );
  }
}

async function handleSubmissionStep(
  council: string,
  reference: string,
  formData: FormData,
  request: NextRequest,
) {
  const applicationId = await getCookie("applicationId", reference);

  if (!applicationId) {
    console.error("Invalid or missing application ID");
    await setCookie("submissionError", "true", reference);
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=4`, request.url),
    );
  }

  const sentimentCookie = await getCookie("sentiment", reference);
  const personalDetailsCookie = await getCookie("personalDetails", reference);
  const commentDataCookie = await getCookie("commentData", reference);
  const selectedTopicsCookie = await getCookie("selectedTopics", reference);

  const sentiment = sentimentCookie || "";
  const personalDetails = personalDetailsCookie
    ? JSON.parse(personalDetailsCookie)
    : {};
  const commentData = commentDataCookie ? JSON.parse(commentDataCookie) : {};
  const selectedTopics = selectedTopicsCookie?.split(",") || [];

  const apiData = {
    name: personalDetails.name,
    email: personalDetails.emailAddress,
    address: `${personalDetails.address}, ${personalDetails.postcode}`,
    response: selectedTopics
      .map((topic: string) => {
        const topicLabel = topics_selection.find(
          (t) => t.value === topic,
        )?.label;
        const comment = commentData[topic];
        return `* ${topicLabel}: ${comment} `;
      })
      .join(" "),
    summary_tag: sentiment === "opposed" ? "objection" : sentiment,
    tags: selectedTopics,
  };

  try {
    const result = await submitComment(
      parseInt(applicationId),
      council,
      apiData,
    );
    if (result.status === 200) {
      await clearAllCookies(reference);
      return NextResponse.redirect(
        new URL(`/${council}/${reference}/submit-comment?page=6`, request.url),
      );
    } else {
      await setCookie("submissionError", "true", reference);
      console.log("Error caught", result);
      return NextResponse.redirect(
        new URL(`/${council}/${reference}/submit-comment?page=5`, request.url),
      );
    }
  } catch (error) {
    console.error("Error submitting the comment", error);
    await setCookie("submissionError", "true", reference);
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=5`, request.url),
    );
  }
}
