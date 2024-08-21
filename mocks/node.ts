import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted request:", request.method, request.url);
});

server.events.on("request:match", ({ request, requestId }) => {
  console.log(
    "MSW matched request:",
    request.method,
    request.url,
    "ID:",
    requestId,
  );
});

server.events.on("request:unhandled", ({ request }) => {
  console.log("MSW unhandled request:", request.method, request.url);
});
