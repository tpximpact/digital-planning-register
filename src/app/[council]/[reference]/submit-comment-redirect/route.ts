import { NextRequest, NextResponse } from "next/server";
import {
  clearAllCookies,
  deleteCookie,
  getCookie,
  setCookie,
  setTopicIndex,
  submitComment,
} from "@/actions";
import {
  phoneRegex,
  phoneValidation,
  postCodeRegex,
  postcodeValidation,
} from "../../../../../util/validation";

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

  const formData = new FormData();
  formData.append("applicationId", applicationId);

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

async function handleSentimentStep(
  council: string,
  reference: string,
  formData: FormData,
  request: NextRequest,
) {
  const sentiment = formData.get("sentiment") as string;
  const isEditing = formData.get("isEditing") === "true";

  if (sentiment) {
    await setCookie("sentiment", sentiment, reference);
    await deleteCookie("validationError", reference);

    if (isEditing) {
      // If editing, return to the check answers page
      return NextResponse.redirect(
        new URL(`/${council}/${reference}/submit-comment?page=5`, request.url),
      );
    } else {
      // If not editing, continue to the next step
      return NextResponse.redirect(
        new URL(`/${council}/${reference}/submit-comment?page=2`, request.url),
      );
    }
  } else {
    await setCookie("validationError", "true", reference);
    return NextResponse.redirect(
      new URL(
        `/${council}/${reference}/submit-comment?page=1${isEditing ? "&edit=true" : ""}`,
        request.url,
      ),
    );
  }
}

async function handleTopicsStep(
  council: string,
  reference: string,
  formData: FormData,
  request: NextRequest,
) {
  const selectedTopics = formData.getAll("topics") as string[];
  const isEditing = formData.get("isEditing") === "true";

  if (selectedTopics.length > 0) {
    await deleteCookie("validationError", reference);
    const previousTopicsCookie = await getCookie("selectedTopics", reference);
    const previousTopics = previousTopicsCookie?.split(",") || [];
    await setCookie("selectedTopics", selectedTopics.join(","), reference);

    const newTopics = selectedTopics.filter(
      (topic) => !previousTopics.includes(topic),
    );
    const addedNewTopic = newTopics.length > 0;

    if (isEditing) {
      if (addedNewTopic) {
        // If editing and a new topic was added, go to the comment page for the new topic
        const newTopicIndex = selectedTopics.indexOf(newTopics[0]);
        await setCookie(
          "currentTopicIndex",
          newTopicIndex.toString(),
          reference,
        );
        return NextResponse.redirect(
          new URL(
            `/${council}/${reference}/submit-comment?page=3&topicIndex=${newTopicIndex}&edit=true`,
            request.url,
          ),
        );
      } else {
        // If editing but no new topic, return to the check answers page
        return NextResponse.redirect(
          new URL(
            `/${council}/${reference}/submit-comment?page=5`,
            request.url,
          ),
        );
      }
    } else {
      // If not editing, continue to the next step
      await setCookie("currentTopicIndex", "0", reference);
      return NextResponse.redirect(
        new URL(`/${council}/${reference}/submit-comment?page=3`, request.url),
      );
    }
  } else {
    await setCookie("validationError", "true", reference);
    return NextResponse.redirect(
      new URL(
        `/${council}/${reference}/submit-comment?page=2${isEditing ? "&edit=true" : ""}`,
        request.url,
      ),
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
  const topicIndex = formData.get("topicIndex");
  const isEditing = formData.get("isEditing") === "true";

  if (comment) {
    await deleteCookie("validationError", reference);
    const selectedTopicsCookie = await getCookie("selectedTopics", reference);
    const selectedTopics = selectedTopicsCookie?.split(",") || [];

    let currentTopicIndex: number;

    if (topicIndex !== null) {
      currentTopicIndex = parseInt(topicIndex as string);
    } else {
      const currentTopicIndexCookie = await getCookie(
        "currentTopicIndex",
        reference,
      );
      currentTopicIndex = parseInt(currentTopicIndexCookie || "0");
    }

    const currentTopic = selectedTopics[currentTopicIndex];

    const existingCommentsValue = await getCookie("commentData", reference);
    const existingComments = existingCommentsValue
      ? JSON.parse(existingCommentsValue)
      : {};
    existingComments[currentTopic] = comment;
    await setCookie("commentData", JSON.stringify(existingComments), reference);

    if (isEditing) {
      // If editing, always return to the check answers page
      return NextResponse.redirect(
        new URL(`/${council}/${reference}/submit-comment?page=5`, request.url),
      );
    } else if (currentTopicIndex < selectedTopics.length - 1) {
      await setTopicIndex(reference, currentTopicIndex + 1);
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
      new URL(
        `/${council}/${reference}/submit-comment?page=3&topicIndex=${topicIndex}${isEditing ? "&edit=true" : ""}`,
        request.url,
      ),
    );
  }
}

async function handlePersonalDetailsStep(
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
    consent: formData.get("consent") === "on" ? "on" : "off",
  };

  const errors: { [key: string]: boolean } = {
    name: !personalDetails.name,
    address: !personalDetails.address,
    postcode: !postcodeValidation(personalDetails.postcode),
    telephoneNumber: !phoneValidation(personalDetails.telephoneNumber),
    consent: personalDetails.consent !== "on",
  };

  await setCookie(
    "personalDetails",
    JSON.stringify(personalDetails),
    reference,
  );

  if (Object.values(errors).some((error) => error)) {
    await setCookie("validationError", JSON.stringify(errors), reference);
    return NextResponse.redirect(
      new URL(`/${council}/${reference}/submit-comment?page=4`, request.url),
    );
  } else {
    await deleteCookie("validationError", reference);
    await deleteCookie("validationError", reference);
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
