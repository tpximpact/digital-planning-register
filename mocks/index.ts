async function initMocks() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side
    if (process.env.NODE_ENV === "development") {
      const { server } = await import("./server");
      server.listen({ onUnhandledRequest: "bypass" });
      console.log("MSW Server started for server-side mocking");
    }
  } else {
    // Client-side
    const { worker } = await import("./browser");
    await worker.start({ onUnhandledRequest: "bypass" });
    console.log("MSW Worker started for client-side mocking");
  }
}

export default initMocks;
