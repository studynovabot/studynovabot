import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // TODO: Add real image API logic here
  const dummyImageURL = "https://via.placeholder.com/512x512?text=AI+Image";

  return NextResponse.json({ imageUrl: dummyImageURL });
}
