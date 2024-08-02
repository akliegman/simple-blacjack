import { API_URL } from "@/constants";

export async function GET(req: Request) {
  const queryParams = new URLSearchParams({
    deck_count: "1",
  });

  const url = `${API_URL}/new/shuffle/${queryParams ? `?${queryParams}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message);
  }

  return Response.json(data);
}

export const fetchCache = "force-no-store"; // no cache for brevity
