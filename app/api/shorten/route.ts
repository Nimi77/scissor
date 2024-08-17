import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";

// In-memory storage for URL mappings
export const urlMap = new Map<string, string>();

// Function to save a URL mapping
function saveUrlMapping(shortUrl: string, originalUrl: string) {
  urlMap.set(shortUrl, originalUrl);
}

// Nanoid configuration for generating unique IDs
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTWXYZ0123456789";
const nanoid = customAlphabet(alphabet, 10);

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    const shortId = nanoid();

    // Saving the mapping of shortId to the original URL
    saveUrlMapping(shortId, url);

    return NextResponse.json({
      shortUrl: `${request.nextUrl.origin}/${shortId}`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}