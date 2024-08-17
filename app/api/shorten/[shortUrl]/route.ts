import { NextRequest, NextResponse } from "next/server";
import { urlMap } from "../route"; 

export async function GET(
  request: NextRequest,
  { params }: { params: { shortUrl: string } }
) {
  const { shortUrl } = params;

  // Fetch the original URL using the short URL
  const originalUrl = urlMap.get(shortUrl);

  if (originalUrl) {
    return NextResponse.json({ originalUrl });
  } else {
    return NextResponse.json({ message: "URL not found" }, { status: 404 });
  }
}
