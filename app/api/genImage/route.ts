import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input } = body;

    if (!input) {
      return NextResponse.json(
        { message: 'Input is required' },
        { status: 400 }
      );
    }

    // Replace the following with your actual image generation logic
    const generatedImage = `Generated image for input: ${input}`;

    return NextResponse.json(
      { message: 'Image generated successfully', image: generatedImage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}