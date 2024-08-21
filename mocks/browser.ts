import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

console.log("MSW worker set up with handlers:", handlers.length);

worker.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted request:", request.method, request.url);
});

worker.events.on("request:match", ({ request, requestId }) => {
  console.log(
    "MSW matched request:",
    request.method,
    request.url,
    "ID:",
    requestId,
  );
});

worker.events.on("request:unhandled", ({ request }) => {
  console.log("MSW unhandled request:", request.method, request.url);
});
