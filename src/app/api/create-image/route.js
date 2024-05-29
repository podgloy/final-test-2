export const maxDuration = 25; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';
 
export function GET(request) {
  return new Response('Vercel', {
    status: 200,
  });
}
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {

  const { gender, appearance } = await req.json();


  const output = await replicate.run(
    "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
  {
      input: {
        width: 1024,
        height: 1024,
        prompt: `An emoji of ${gender} with ${appearance} appearance`,
        refine: "no_refiner",
        scheduler: "K_EULER",
        lora_scale: 0.6,
        num_outputs: 1,
        guidance_scale: 7.5,
        apply_watermark: false,
        high_noise_frac: 0.8,
        negative_prompt: "",
        prompt_strength: 0.8,
        num_inference_steps: 50
      }
    }
  );

  

  return Response.json({
    status: "ok",
    answer: output[0]
  });
}