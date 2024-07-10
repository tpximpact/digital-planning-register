import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { setTopicIndex, submitComment } from "@/actions";
import {
  emailValidation,
  phoneValidation,
  postcodeValidation,
} from "../../../../../util/validation";
import {
  clearAllCookies,
  getCookie,
  setCookie,
  deleteCookie,
} from "@/actions/cookies";

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

const MAX_COMMENT_LENGTH = 1200;

const normaliseAndCountChars = (text: string) => {
  return text.replace(/\s+/g, " ").trim().length;
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const { searchParams } = new URL(request.url);

  const council =
    (formData.get("council") as string) || searchParams.get("council");
  const reference =
    (formData.get("reference") as string) || searchParams.get("reference");
  const page = parseInt(searchParams.get("page") || "0");

  if (!council || !reference) {
    redirect(`/${council}/${reference}/submit-comment?page=0`);
  }

  switch (page) {
    case 0:
      return handlePresubmissionStep(council, reference, formData);
    case 1:
      return handleSentimentStep(council, reference, formData);
    case 2:
      return handleTopicsStep(council, reference, formData);
    case 3:
      return handleCommentsStep(council, reference, formData);
    case 4:
      return handlePersonalDetailsStep(council, reference, formData);
    case 5:
      return handleSubmissionStep(council, reference, formData);
    default:
      await clearAllCookies(reference);
      redirect(`/${council}/${reference}/submit-comment?page=0`);
  }
}

async function handlePresubmissionStep(
  council: string,
  reference: string,
  formData: FormData,
) {
  const existingApplicationId = await getCookie("applicationId", reference);
  const sentiment = await getCookie("sentiment", reference);
  const selectedTopics = await getCookie("selectedTopics", reference);
  const personalDetails = await getCookie("personalDetails", reference);

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
    redirect(`/${council}/${reference}/submit-comment?page=1`);
  }

  if (personalDetails) {
    redirect(`/${council}/${reference}/submit-comment?page=5`);
  } else if (selectedTopics) {
    const topics = selectedTopics.split(",");
    let hasComments = false;
    for (const topic of topics) {
      const comment = await getCookie(`comment_${topic}`, reference);
      if (comment) {
        hasComments = true;
        break;
      }
    }
    if (hasComments) {
      redirect(`/${council}/${reference}/submit-comment?page=4`);
    } else {
      redirect(`/${council}/${reference}/submit-comment?page=3`);
    }
  } else if (sentiment) {
    redirect(`/${council}/${reference}/submit-comment?page=2`);
  } else {
    redirect(`/${council}/${reference}/submit-comment?page=1`);
  }
}

async function handleSentimentStep(
  council: string,
  reference: string,
  formData: FormData,
) {
  const sentiment = formData.get("sentiment") as string;
  const isEditing = formData.get("isEditing") === "true";

  if (sentiment) {
    await setCookie("sentiment", sentiment, reference);
    await deleteCookie("validationError", reference);

    if (isEditing) {
      redirect(`/${council}/${reference}/submit-comment?page=5`);
    } else {
      redirect(`/${council}/${reference}/submit-comment?page=2`);
    }
  } else {
    await setCookie("validationError", "true", reference);
    redirect(
      `/${council}/${reference}/submit-comment?page=1${isEditing ? "&edit=true" : ""}`,
    );
  }
}

async function handleTopicsStep(
  council: string,
  reference: string,
  formData: FormData,
) {
  const selectedTopics = formData.getAll("topics") as string[];
  const isEditing = formData.get("isEditing") === "true";

  if (selectedTopics.length > 0) {
    await deleteCookie("validationError", reference);
    const previousTopicsCookie = await getCookie("selectedTopics", reference);
    const previousTopics = previousTopicsCookie?.split(",") || [];
    await setCookie("selectedTopics", selectedTopics.join(","), reference);

    // Delete cookies for deselected topics
    for (const topic of previousTopics) {
      if (!selectedTopics.includes(topic)) {
        await deleteCookie(`comment_${topic}`, reference);
      }
    }

    const newTopics = selectedTopics.filter(
      (topic) => !previousTopics.includes(topic),
    );

    if (isEditing && newTopics.length > 0) {
      await setCookie("newTopics", JSON.stringify(newTopics), reference);
      const firstNewTopicIndex = selectedTopics.indexOf(newTopics[0]);
      await setCookie(
        "currentTopicIndex",
        firstNewTopicIndex.toString(),
        reference,
      );
      redirect(
        `/${council}/${reference}/submit-comment?page=3&topicIndex=${firstNewTopicIndex}&edit=true`,
      );
    } else if (isEditing) {
      redirect(`/${council}/${reference}/submit-comment?page=5`);
    } else {
      await setCookie("currentTopicIndex", "0", reference);
      redirect(`/${council}/${reference}/submit-comment?page=3&topicIndex=0`);
    }
  } else {
    await setCookie("validationError", "true", reference);
    redirect(
      `/${council}/${reference}/submit-comment?page=2${isEditing ? "&edit=true" : ""}`,
    );
  }
}

async function handleCommentsStep(
  council: string,
  reference: string,
  formData: FormData,
) {
  const comment = formData.get("comment") as string;
  const topicIndex = formData.get("topicIndex");
  const currentTopic = formData.get("currentTopic") as string;
  const isEditing = formData.get("isEditing") === "true";

  const normalisedCommentLength = normaliseAndCountChars(comment);

  if (comment && normalisedCommentLength <= MAX_COMMENT_LENGTH) {
    await deleteCookie("validationError", reference);
    await setCookie(`comment_${currentTopic}`, comment, reference);

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

    if (isEditing) {
      const newTopicsCookie = await getCookie("newTopics", reference);
      if (newTopicsCookie) {
        const newTopics = JSON.parse(newTopicsCookie);
        const currentNewTopicIndex = newTopics.indexOf(currentTopic);
        if (currentNewTopicIndex < newTopics.length - 1) {
          const nextNewTopicIndex = selectedTopics.indexOf(
            newTopics[currentNewTopicIndex + 1],
          );
          await setCookie(
            "currentTopicIndex",
            nextNewTopicIndex.toString(),
            reference,
          );
          redirect(
            `/${council}/${reference}/submit-comment?page=3&topicIndex=${nextNewTopicIndex}&edit=true`,
          );
        } else {
          await deleteCookie("newTopics", reference);
          await deleteCookie("currentTopicIndex", reference);
          redirect(`/${council}/${reference}/submit-comment?page=5`);
        }
      } else {
        redirect(`/${council}/${reference}/submit-comment?page=5`);
      }
    } else if (currentTopicIndex < selectedTopics.length - 1) {
      await setTopicIndex(reference, currentTopicIndex + 1);
      redirect(`/${council}/${reference}/submit-comment?page=3`);
    } else {
      await deleteCookie("currentTopicIndex", reference);
      redirect(`/${council}/${reference}/submit-comment?page=4`);
    }
  } else {
    await setCookie("validationError", "true", reference);
    redirect(
      `/${council}/${reference}/submit-comment?page=3&topicIndex=${topicIndex}${isEditing ? "&edit=true" : ""}`,
    );
  }
}

async function handlePersonalDetailsStep(
  council: string,
  reference: string,
  formData: FormData,
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
    emailAddress:
      personalDetails.emailAddress !== "" &&
      !emailValidation(personalDetails.emailAddress),
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
    redirect(`/${council}/${reference}/submit-comment?page=4`);
  } else {
    await deleteCookie("validationError", reference);
    redirect(`/${council}/${reference}/submit-comment?page=5`);
  }
}
async function handleSubmissionStep(
  council: string,
  reference: string,
  formData: FormData,
) {
  const applicationId = await getCookie("applicationId", reference);

  if (!applicationId) {
    console.error("Invalid or missing application ID");
    await setCookie("submissionError", "true", reference);
    return redirect(`/${council}/${reference}/submit-comment?page=4`);
  }

  const sentimentCookie = await getCookie("sentiment", reference);
  const personalDetailsCookie = await getCookie("personalDetails", reference);
  const selectedTopicsCookie = await getCookie("selectedTopics", reference);

  const sentiment = sentimentCookie || "";
  const personalDetails = personalDetailsCookie
    ? JSON.parse(personalDetailsCookie)
    : {};
  const selectedTopics = selectedTopicsCookie?.split(",") || [];

  const apiData = {
    name: personalDetails.name,
    email: personalDetails.emailAddress,
    address: `${personalDetails.address}, ${personalDetails.postcode}`,
    response: await Promise.all(
      selectedTopics.map(async (topic: string) => {
        const topicLabel = topics_selection.find(
          (t) => t.value === topic,
        )?.label;
        const comment = (await getCookie(`comment_${topic}`, reference)) || "";
        return `* ${topicLabel}: ${comment} `;
      }),
    ).then((comments) => comments.join(" ")),
    summary_tag: sentiment,
    tags: selectedTopics,
  };
  await deleteCookie("submissionError", reference);

  const result = await submitComment(parseInt(applicationId), council, apiData);
  if (result.status === 200) {
    await clearAllCookies(reference);
    return redirect(`/${council}/${reference}/submit-comment?page=6`);
  } else {
    console.log("Error caught", result);
    await setCookie("submissionError", "true", reference);
    return redirect(`/${council}/${reference}/submit-comment?page=5`);
  }
}
