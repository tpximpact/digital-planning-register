import { test, expect, Page } from "@playwright/test";

// const baseUrl = "http://localhost:3000";
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
  await page.goto(`${path}`);
  await page.screenshot({
    path: `screenshots/${filename}-${javascriptEnabled ? "js-enabled" : "js-disabled"}.png`,
    fullPage: true,
  });
  if (javascriptEnabled) {
    const disableNotification = await page.locator("#js-disabled-notification");
    await expect(disableNotification).not.toBeAttached();
  } else {
    expect(await page.locator("#js-disabled-notification").innerHTML()).toEqual(
      "You have disabled javascript on this page",
    );
  }
};

/**
 *
 * /
 *
 */

const testLandingPage = async (page: Page) => {
  await page.goto("/");

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

  const logoContainer = await page.locator(".dpr-council-cards");
  await expect(logoContainer).toBeVisible();

  const visible = ["public-council-1", "public-council-2"];
  visible.forEach(async (slug) => {
    await expect(
      logoContainer.locator(`[data-council-slug='${slug}']`),
    ).toBeVisible();
  });
  const hidden = [
    "private-council-1",
    "private-council-2",
    "unlisted-council-1",
    "unlisted-council-2",
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
  await page.goto(`/cookie-policy`);

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
  await page.goto(`/non-existant-page`);

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
  await page.goto(`/public-council-1`);

  await expect(page).toHaveTitle(
    "Public Council 1 | Digital Planning Register",
  );
  await expect(
    page.getByLabel("Search by application reference, address or description"),
  ).toBeVisible();

  const applications = await page.locator(".dpr-application-card");
  const applicationCount = await applications.count();
  expect(applicationCount).toBeGreaterThanOrEqual(1);

  await page
    .getByLabel("Search by application reference, address or description")
    .fill(`noresultsplease`);
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
  const firstResult = applications.first();
  await expect(firstResult).toHaveCount(1);
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
  await page.goto(`/public-council-1/planning-process`);

  await expect(page).toHaveTitle(
    "Help using the Digital Planning Register | Public Council 1 Digital Planning Register",
  );
  await expect(
    page.getByRole("heading", {
      name: "Help using the Digital Planning Register",
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
  await page.goto(`/public-council-1/24-00135-HAPP`);

  await expect(page).toHaveTitle(
    "Application 24-00135-HAPP | Public Council 1 Digital Planning Register",
  );

  await expect(
    page.getByRole("heading", {
      name: "Application reference 24-00135-HAPP",
    }),
  ).toBeVisible();
};

/**
 *
 * /[council]/[reference]/application-form
 *
 */

const testCouncilReferenceApplicationForm = async (page: Page) => {
  await page.goto(`/public-council-1/24-00135-HAPP/application-form`);

  await expect(page).toHaveTitle(
    "Application form as submitted | Application 24-00135-HAPP | Public Council 1 Digital Planning Register",
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
  await page.goto(`/public-council-1/24-00135-HAPP/comments`);

  await expect(page).toHaveTitle(
    "Comments | Application 24-00135-HAPP | Public Council 1 Digital Planning Register",
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
  await page.goto(`/public-council-1/24-00135-HAPP/documents`);

  await expect(page).toHaveTitle(
    "Documents | Application 24-00135-HAPP | Public Council 1 Digital Planning Register",
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
    await page.goto(`/public-council-1/TEST-C0MNT-F10W/submit-comment`);

    await expect(page).toHaveTitle(
      "What you need to know before you comment | Application TEST-C0MNT-F10W | Public Council 1 Digital Planning Register",
    );

    // there is a race condition here
    // when the page first loads it shows a non-js message to say 'enable js pls'
    // playwright is sometimes reading that and failing the test
    // so we wait for the submit comment page content to appear and then test for the title
    // @todo refine the comment flow feature and tests so this is not needed!
    await page.waitForSelector(".submit-comment");

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
      await testJavascriptStatus(
        page,
        "/public-council-1",
        "04-council",
        false,
      );
    });
    test("/public-council-1", async ({ page }) => {
      await testSearchPage(page, "04-council", false);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(page, "/public-council-1", "04-council", true);
    });
    test("/public-council-1", async ({ page }) => {
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
        "/public-council-1/planning-process",
        "05-council--planning-process",
        false,
      );
    });
    test("/public-council-1/planning-process", async ({ page }) => {
      await testCouncilPlanningProcess(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/public-council-1/planning-process",
        "05-council--planning-process",
        true,
      );
    });
    test("/public-council-1/planning-process", async ({ page }) => {
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
        "/public-council-1/24-00135-HAPP",
        "06-council--reference",
        false,
      );
    });
    test("/public-council-1/24-00135-HAPP", async ({ page }) => {
      await testCouncilReference(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/public-council-1/24-00135-HAPP",
        "06-council--reference",
        true,
      );
    });
    test("/public-council-1/24-00135-HAPP", async ({ page }) => {
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
        "/public-council-1/24-00135-HAPP/application-form",
        "06-council--reference--application-form",
        false,
      );
    });
    test("/public-council-1/24-00135-HAPP/application-form", async ({
      page,
    }) => {
      await testCouncilReferenceApplicationForm(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/public-council-1/24-00135-HAPP/application-form",
        "06-council--reference--application-form",
        true,
      );
    });
    test("/public-council-1/24-00135-HAPP/application-form", async ({
      page,
    }) => {
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
        "/public-council-1/24-00135-HAPP/comments",
        "07-council--reference--comments",
        false,
      );
    });
    test("/public-council-1/24-00135-HAPP/comments", async ({ page }) => {
      await testCouncilReferenceComments(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/public-council-1/24-00135-HAPP/comments",
        "07-council--reference--comments",
        true,
      );
    });
    test("/public-council-1/24-00135-HAPP/comments", async ({ page }) => {
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
        "/public-council-1/24-00135-HAPP/documents",
        "08-council--reference--documents",
        false,
      );
    });
    test("/public-council-1/24-00135-HAPP/documents", async ({ page }) => {
      await testCouncilReferenceDocuments(page);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/public-council-1/24-00135-HAPP/documents",
        "08-council--reference--documents",
        true,
      );
    });
    test("/public-council-1/24-00135-HAPP/documents", async ({ page }) => {
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
        "/public-council-1/24-00135-HAPP/submit-comment",
        "09-council--reference--submit-comment",
        false,
      );
    });
    test("/public-council-1/24-00135-HAPP/submit-comment", async ({ page }) => {
      await testCouncilReferenceSubmitComment(page, false);
    });
  });
  test.describe("javascript enabled", () => {
    test("should not show no-js message", async ({ page }) => {
      await testJavascriptStatus(
        page,
        "/public-council-1/24-00135-HAPP/submit-comment",
        "09-council--reference--submit-comment",
        true,
      );
    });
    test("/public-council-1/24-00135-HAPP/submit-comment", async ({ page }) => {
      await testCouncilReferenceSubmitComment(page, true);
    });
  });
});
