import { createSign } from "crypto";
import { AllowedPropertyValues } from "../dprAnalytics.utils";

const SPREADSHEET_ID = process.env.SITE_NOTICE_TRACKING_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.SITE_NOTICE_TRACKING_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.SITE_NOTICE_TRACKING_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n",
);

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function generateJWT() {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: CLIENT_EMAIL,
    scope: SCOPES.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600, // Token valid for 1 hour
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString(
    "base64url",
  );
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
  const unsignedToken = `${base64Header}.${base64Payload}`;

  // Ensure PRIVATE_KEY is defined
  if (!PRIVATE_KEY) {
    throw new Error(
      "PRIVATE_KEY is not defined. Please set it in your environment.",
    );
  }

  const sign = createSign("RSA-SHA256");
  sign.update(unsignedToken);

  // Use PRIVATE_KEY with a type assertion if necessary
  const signature = sign.sign(PRIVATE_KEY as string, "base64url");

  return `${unsignedToken}.${signature}`;
}

async function getAccessToken() {
  const jwt = generateJWT();

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Appends a row to the Google Sheet.
 * @param council
 * @param reference
 * @param ref
 */
async function appendRowToGoogleSheet(
  council: AllowedPropertyValues,
  reference: AllowedPropertyValues,
  ref: AllowedPropertyValues | undefined,
): Promise<void> {
  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error(
      "Missing required environment variables: SITE_NOTICE_TRACKING_SPREADSHEET_ID, SITE_NOTICE_TRACKING_SERVICE_ACCOUNT_EMAIL, or SITE_NOTICE_TRACKING_PRIVATE_KEY.",
    );
  }

  const accessToken = await getAccessToken();

  const visitDate = new Date().toISOString(); // Current date
  const values = [[council, reference, visitDate, ref]];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A1:C1:append?valueInputOption=RAW`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to append row: ${response.statusText}`);
  }

  console.log("Row successfully added to Google Sheets.");
}

/**
 * Implements out site notice tracking for research purposes.
 * @param properties
 */
export async function siteNoticeTracking(
  properties: Record<string, AllowedPropertyValues>,
) {
  const searchParams = properties?.searchParams
    ? JSON.parse(properties.searchParams as string)
    : undefined;
  const ref = searchParams?.ref;

  if (!ref) {
    return;
  }

  try {
    await appendRowToGoogleSheet(properties.council, properties.reference, ref);
    console.log("Data successfully sent to Google Sheets.");
  } catch (error) {
    console.error("Error:", error);
  }
}
