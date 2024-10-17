import { test, expect, Page } from "@playwright/test";

const baseUrl = "http://localhost:3000";
/**
 *
 * This test suite is for testing the javascript and non-javascript functionality of the site as well as the site visibility config settings
 * /
 * /cookie-policy
 * /non-existent-url (should show not found page in non js mode)
 * /[council]
 * /[council]/[reference]
 * /[council]/[reference]/application-form
 * /[council]/[reference]/comments
 * /[council]/[reference]/documents
 * /[council]/[reference/submit-comment
 * /[council]/digital-site-notice @todo
 * /[council]/planning-process
 *
 */

/**
 * Checks for our little  hidden message to be sure that we're showing non-js mode
 * @param page
 * @param javascriptEnabled
 */
const testJavascriptStatus = async (
  page: Page,
  path: string,
  filename: string,
  javascriptEnabled: boolean,
) => {
  await page.goto(`${baseUrl}${path}`);
  await page.screenshot({
    path: `screenshots/${filename}-${javascriptEnabled ? "js-enabled" : "js-disabled"}.png`,
    fullPage: true,
  });
  const locator = await page.locator("#js-disabled-notification");
  if (javascriptEnabled) {
    expect(locator).toHaveCount(0);
  } else {
    expect(locator).toHaveText(/You have disabled javascript on this page/, {
      useInnerText: true,
    });
  }
};

/**
 *
 * /
 *
 */

const testLandingPage = async (page: Page) => {
  await page.goto(baseUrl);

  await expect(page).toHaveTitle("Digital Planning Register");
  await expect(
    page.getByRole("heading", {
      name: "Welcome to the Digital Planning Register",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Select your council to start exploring planning applications in your area",
    }),
  ).toBeVisible();

  const logoContainer = await page.locator(".logos-container");
  await expect(logoContainer).toBeVisible();

  const visible = ["public"];
  visible.forEach(async (slug) => {
    await expect(
      logoContainer.locator(`[data-council-slug='${slug}']`),
    ).toBeVisible();
  });
  const hidden = [
    "private",
    "unlisted",
    "public-no-env-vars",
    "public-overwritten",
  ];
  hidden.forEach(async (slug) => {
    await expect(
      logoContainer.locator(`[data-council-slug='${slug}']`),
    ).not.toBeVisible();
  });
};

/**
 *
 * /cookie-policy
 *
 */

const testCookiePolicy = async (page: Page) => {
  await page.goto(`${baseUrl}/cookie-policy`);

  await expect(page).toHaveTitle("Cookies | Digital Planning Register");
  await expect(
    page.getByRole("heading", {
      name: "Cookies",
      exact: true,
    }),
  ).toBeVisible();
};

/**
 * /non-existant-page
 */

const testNonExistantPage = async (page: Page) => {
  await page.goto(`${baseUrl}/non-existant-page`);

  await expect(page).toHaveTitle("Error | Digital Planning Register");
  await expect(
    page.getByRole("heading", {
      name: "Page not found",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", {
      name: "Try selecting a council",
    }),
  ).toBeVisible();
};

/**
 *
 * /[council]
 *
 */

const testSearchPage = async (
  page: Page,
  filename: string,
  javascriptEnabled: boolean,
) => {
  await page.goto(`${baseUrl}/camden`);

  await expect(page).toHaveTitle("Camden | Digital Planning Register");
  await expect(
    page.getByLabel("Search by application reference, address or description"),
  ).toBeVisible();

  const applications = await page.locator(".search-card");
  await expect(applications).toHaveCount(10);

  await page
    .getByLabel("Search by application reference, address or description")
    .fill(`noone can match this query`);
  await page.getByRole("button", { name: "Search" }).click();
  await expect(applications).toHaveCount(0);
  expect(
    page.getByRole("heading", { name: "No applications match your search" }),
  );
  await page.screenshot({
    path: `screenshots/${filename}-${javascriptEnabled ? "js-enabled" : "js-disabled"}--no-results.png`,
    fullPage: true,
  });

  await page
    .getByLabel("Search by application reference, address or description")
    .fill(`24-00135-HAPP`);
  await page.getByRole("button", { name: "Search" }).click();
  await expect(applications).toHaveCount(1);
  await page.screenshot({
    path: `screenshots/${filename}-${javascriptEnabled ? "js-enabled" : "js-disabled"}--search-results.png`,
    fullPage: true,
  });
};

/**
 *
 * /[council]/planning-process
 *
 */

const testCouncilPlanningProcess = async (page: Page) => {
  await page.goto(`${baseUrl}/camden/planning-process`);

  await expect(page).toHaveTitle(
    "Understanding planning | Camden Digital Planning Register",
  );
  await expect(
    page.getByRole("heading", {
      name: "Understanding planning",
      exact: true,
    }),
  ).toBeVisible();
};

/**
 *
 * /[council]/[reference]
 *
 */

const testCouncilReference = async (page: Page) => {
  await page.goto(`${baseUrl}/camden/24-00135-HAPP`);

  await expect(page).toHaveTitle(
    "Application 24-00135-HAPP | Camden Digital Planning Register",
  );

  await expect(page.locator("#application-reference")).toHaveText(
    /24-00135-HAPP/,
    {
      useInnerText: true,
    },
  );
};

/**
 *
 * /[council]/[reference]/application-form
 *
 */

const testCouncilReferenceApplicationForm = async (page: Page) => {
  await page.goto(`${baseUrl}/camden/24-00135-HAPP/application-form`);

  await expect(page).toHaveTitle(
    "Application 24-00135-HAPP | Camden Digital Planning Register",
  );

  await expect(
    page.getByRole("heading", {
      name: "Application form as submitted",
    }),
  ).toBeVisible();
};

/**
 *
 * /[council]/[reference]/comments
 *
 */

const testCouncilReferenceComments = async (page: Page) => {
  await page.goto(`${baseUrl}/camden/24-00135-HAPP/comments`);

  await expect(page).toHaveTitle(
    "Application 24-00135-HAPP | Camden Digital Planning Register",
  );

  await expect(
    page.getByRole("heading", {
      name: "Public Comments",
    }),
  ).toBeVisible();
};

/**
 *
 * /[council]/[reference]/documents
 *
 */

const testCouncilReferenceDocuments = async (page: Page) => {
  await page.goto(`${baseUrl}/camden/24-00135-HAPP/documents`);

  await expect(page).toHaveTitle(
    "Application 24-00135-HAPP | Camden Digital Planning Register",
  );

  await expect(
    page.getByRole("heading", {
      name: "Documents",
    }),
  ).toBeVisible();

  await expect(
    page.locator("a", { hasText: "Application form" }),
  ).toBeVisible();
};

/**
 *
 * /[council]/[reference]/submit-comment
 *
 */

const testCouncilReferenceSubmitComment = async (
  page: Page,
  javascriptEnabled: boolean,
) => {
  if (javascriptEnabled) {
    await page.goto(`${baseUrl}/camden/24-00135-HAPP/submit-comment`);

    await expect(page).toHaveTitle(
      "Application 24-00135-HAPP | Camden Digital Planning Register",
    );

    await expect(
      page.getByRole("heading", {
        name: "What you need to know before you comment",
      }),
    ).toBeVisible();

    // await page.getByRole("button", { name: "Start now" }).click();

    // await expect(
    //   page.getByRole("heading", {
    //     name: "How do you feel about this development?",
    //   }),
    // ).toBeVisible();
  }
};

/**
 *
 * Tests
 *
 */

test.describe("/", () => {
  test.describe("javascript disabled", () => {
    test.use({ javaScriptEnabled: false });
    test("should show no-js message", async ({ page }) => {
      await testJavascriptStatus(page, "", "01-homepage", false);
    });
    test("/", async ({ page }) => {
      await testLandingPage(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(page, "", "01-homepage", true);
    });
    test("/", async ({ page }) => {
      await testLandingPage(page);
    });
  });
});

test.describe("/cookie-policy", () => {
  test.describe("javascript disabled", () => {
    test.use({ javaScriptEnabled: false });
    test("should show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/cookie-policy",
        "02-cookie-policy",
        false,
      );
    });
    test("/cookie-policy", async ({ page }) => {
      await testCookiePolicy(page);
    });

    test.fixme(
      "disable functionality if cookies disabled?",
      async ({ page }) => {},
    );
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/cookie-policy",
        "02-cookie-policy",
        true,
      );
    });
    test("/cookie-policy", async ({ page }) => {
      await testCookiePolicy(page);
    });

    test.fixme("test cookie functionality", async ({ page }) => {});
  });
});

test.describe("/non-existant-page", () => {
  test.describe("javascript disabled", () => {
    test.use({ javaScriptEnabled: false });
    test("should show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/non-existant-page",
        "03-non-existant-page",
        false,
      );
    });
    test("/non-existant-page", async ({ page }) => {
      await testNonExistantPage(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/non-existant-page",
        "03-non-existant-page",
        true,
      );
    });
    test("/non-existant-page", async ({ page }) => {
      await testNonExistantPage(page);
    });
  });
});

test.describe("/[council]", () => {
  test.describe("javascript disabled", () => {
    test.use({ javaScriptEnabled: false });
    test("should show no-js message", async ({ page }) => {
      await testJavascriptStatus(page, "/camden", "04-council", false);
    });
    test("/camden", async ({ page }) => {
      await testSearchPage(page, "04-council", false);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(page, "/camden", "04-council", true);
    });
    test("/camden", async ({ page }) => {
      await testSearchPage(page, "04-council", true);
    });
  });
});

test.describe("/[council]/planning-process", () => {
  test.describe("javascript disabled", () => {
    test.use({ javaScriptEnabled: false });
    test("should show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/planning-process",
        "05-council--planning-process",
        false,
      );
    });
    test("/camden/planning-process", async ({ page }) => {
      await testCouncilPlanningProcess(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/planning-process",
        "05-council--planning-process",
        true,
      );
    });
    test("/camden/planning-process", async ({ page }) => {
      await testCouncilPlanningProcess(page);
    });
  });
});

test.describe.fixme("/[council]/digital-site-notice", () => {
  test.fixme("Add tests for digital-site-notice", async ({ page }) => {});
});

test.describe("/[council]/[reference]", () => {
  test.describe("javascript disabled", () => {
    test.use({ javaScriptEnabled: false });
    test("should show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/24-00135-HAPP",
        "06-council--reference",
        false,
      );
    });
    test("/camden/24-00135-HAPP", async ({ page }) => {
      await testCouncilReference(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/24-00135-HAPP",
        "06-council--reference",
        true,
      );
    });
    test("/camden/24-00135-HAPP", async ({ page }) => {
      await testCouncilReference(page);
    });
  });
});

test.describe("/[council]/[reference]/application-form", () => {
  test.describe("javascript disabled", () => {
    test.use({ javaScriptEnabled: false });
    test("should show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/24-00135-HAPP/application-form",
        "06-council--reference--application-form",
        false,
      );
    });
    test("/camden/24-00135-HAPP/application-form", async ({ page }) => {
      await testCouncilReferenceApplicationForm(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/24-00135-HAPP/application-form",
        "06-council--reference--application-form",
        true,
      );
    });
    test("/camden/24-00135-HAPP/application-form", async ({ page }) => {
      await testCouncilReferenceApplicationForm(page);
    });
  });
});

test.describe("/[council]/[reference]/comments", () => {
  test.describe("javascript disabled", () => {
    test.use({ javaScriptEnabled: false });
    test("should show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/24-00135-HAPP/comments",
        "07-council--reference--comments",
        false,
      );
    });
    test("/camden/24-00135-HAPP/comments", async ({ page }) => {
      await testCouncilReferenceComments(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/24-00135-HAPP/comments",
        "07-council--reference--comments",
        true,
      );
    });
    test("/camden/24-00135-HAPP/comments", async ({ page }) => {
      await testCouncilReferenceComments(page);
    });
  });
});

test.describe("/[council]/[reference]/documents", () => {
  test.describe("javascript disabled", () => {
    test.use({ javaScriptEnabled: false });
    test("should show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/24-00135-HAPP/documents",
        "08-council--reference--documents",
        false,
      );
    });
    test("/camden/24-00135-HAPP/documents", async ({ page }) => {
      await testCouncilReferenceDocuments(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/24-00135-HAPP/documents",
        "08-council--reference--documents",
        true,
      );
    });
    test("/camden/24-00135-HAPP/documents", async ({ page }) => {
      await testCouncilReferenceDocuments(page);
    });
  });
});

test.describe("/[council]/[reference]/submit-comment", () => {
  test.describe("javascript disabled", () => {
    test.use({ javaScriptEnabled: false });
    test("should show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/24-00135-HAPP/submit-comment",
        "09-council--reference--submit-comment",
        false,
      );
    });
    test("/camden/24-00135-HAPP/submit-comment", async ({ page }) => {
      await testCouncilReferenceSubmitComment(page, false);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/camden/24-00135-HAPP/submit-comment",
        "09-council--reference--submit-comment",
        true,
      );
    });
    test("/camden/24-00135-HAPP/submit-comment", async ({ page }) => {
      await testCouncilReferenceSubmitComment(page, true);
    });
  });
});
