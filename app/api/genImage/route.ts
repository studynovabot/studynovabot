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

    // Call Stability AI API for image generation
    const STABILITY_API_KEY = process.env.STABILITY_API_KEY || 'sk-1hOO7fFs2MkyGhxCWr7OoXFbVbYryTuDMGCpe6SsECvANa5B';
    const STABILITY_API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image';

    const stabilityRes = await fetch(STABILITY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${STABILITY_API_KEY}`,
      },
      body: JSON.stringify({
        text_prompts: [{ text: input }],
        cfg_scale: 7,
        height: 512,
        width: 512,
        steps: 30,
        samples: 1,
      }),
    });

    if (!stabilityRes.ok) {
      const error = await stabilityRes.text();
      return NextResponse.json({ error }, { status: stabilityRes.status });
    }

    const data = await stabilityRes.json();
    const base64 = data.artifacts && data.artifacts[0] && data.artifacts[0].base64;
    if (!base64) {
      return NextResponse.json({ error: 'No image returned from Stability AI' }, { status: 500 });
    }
    const image = `data:image/png;base64,${base64}`;
    return NextResponse.json({ image }, { status: 200 });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}