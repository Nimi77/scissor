import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { sql } from "@vercel/postgres";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTWXYZ0123456789"
const nanoid = customAlphabet(alphabet, 10);

export async function POST(request: NextRequest){
 try{
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ message: "Invalid URL" });
    }

    const shortId = nanoid();

    //the shortId and original Url to the database
    // await sql `INSERT INTO urls (shortId, originalUrl) VALUES (${shortId}, ${url})`
    
    return NextResponse.json({ shortUrl: `${request.nextUrl.origin}/${shortId}`});
  }catch(error) {
    return NextResponse.json({ message: "Internal Server Error" }, {status: 500});
  }
};