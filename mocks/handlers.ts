import { http, HttpResponse } from "msw";

interface DataItem {
  id: number;
  name: string;
}

export const handlers = [
  http.get("/api/data", () => {
    return HttpResponse.json<{ data: DataItem[] }>({
      data: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ],
    });
  }),
];
