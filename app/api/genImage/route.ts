import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { input } = body;

    if (!input) {
      return NextResponse.json(
        { message: 'Input is required' },
        { status: 400 }
      );
    }

    // Prompt engineering: clarify for the AI
    let originalInput = input;
    // If the prompt seems like an edit instruction, prepend context
    if (/edit|change|fix|adjust|modify|improve|upgrade|should/i.test(input)) {
      input = `You are an expert image generator. Please edit the previous image as follows: ${input}. Be anatomically correct. Do not merge body parts. Do not make ant legs on a tiger. Only change what is requested, keep all other details as in the previous image.`;
    } else {
      input = `Create a high quality, detailed, photorealistic image: ${input}. Be anatomically correct. Do not merge body parts. Do not make ant legs on a tiger. Only show what is described.`;
    }

    const STABILITY_API_KEY = process.env.STABILITY_API_KEY || 'sk-AZI41yJxFefETni1iElqrHtI0Q7OvvNMORi92BtfMUzBtfTR';
    // Use the stable-diffusion v1.6 endpoint for compatibility
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
        // Negative prompt to avoid anatomical errors
        negative_prompt: "deformed, extra limbs, missing limbs, wrong anatomy, fused animals, mutated, blurry, low quality, text, watermark, signature, cropped, out of frame, disfigured, poorly drawn, duplicate, morphed, bad proportions"
      }),
    });

    if (!stabilityRes.ok) {
      let errorMsg = "Unknown error";
      try {
        const errData = await stabilityRes.json();
        if (errData && errData.error) {
          errorMsg = typeof errData.error === 'string' ? errData.error : JSON.stringify(errData.error);
        } else {
          errorMsg = JSON.stringify(errData);
        }
      } catch {
        errorMsg = await stabilityRes.text();
      }
      return NextResponse.json({ error: errorMsg }, { status: stabilityRes.status });
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
    let errMsg = "Internal Server Error";
    if (error instanceof Error) {
      errMsg = error.message;
    } else if (typeof error === "object") {
      errMsg = JSON.stringify(error);
    }
    return NextResponse.json(
      { error: errMsg },
      { status: 500 }
    );
  }
}