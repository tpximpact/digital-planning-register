export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (process.env.NODE_ENV === "development") {
      const { server } = await import("../mocks/server");
      server.listen({ onUnhandledRequest: "bypass" });
    }
  }
}
