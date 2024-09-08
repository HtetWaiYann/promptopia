import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (req: Request, { params }: { params: Params }) => {
  try {
    await connectDB();
    const userId = params.id;
    const prompts = await Prompt.find({creator : userId}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};
