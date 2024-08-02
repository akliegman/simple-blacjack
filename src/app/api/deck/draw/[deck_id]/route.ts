import { API_URL } from "@/constants";
import { type DeckId } from "@/global";

export async function GET(
  req: Request,
  { params }: { params: { deck_id: DeckId } },
) {
  const { deck_id } = params;

  const queryParams = new URLSearchParams({
    count: "1",
  });

  const url = `${API_URL}/${deck_id}/draw/${
    queryParams ? `?${queryParams}` : ""
  }`;

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
