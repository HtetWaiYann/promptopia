import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// GET
export const GET = async (req: Request, { params }: Params) => {
  try {
    await connectDB();
    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};

// PATCH
export const PATCH = async (req: Request, { params }: Params) => {
  const { prompt, tag } = await req.json();

  try {
    await connectDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};

// DELETE
export const DELETE = async (req: Request, { params }: Params) => {
  try {
    await connectDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted", { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};
