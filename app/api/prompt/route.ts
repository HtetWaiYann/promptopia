import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req : Request, res: Response) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error : any) {
    return new Response(error.message, { status: 500 });
  }
};

export const GET = async (req : Request, res : Response) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (error : any) {
    return new Response(error.message, { status: 500 });
  }
};
