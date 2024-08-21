import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

async function initMocks() {
  const { server } = await import("./server");
  server.listen({ onUnhandledRequest: "bypass" });
  console.log("mws server.ts file");
}
export default initMocks;
