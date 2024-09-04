import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
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
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
};

export const GET = async (req, res) => {
  try {
    await connectDB();
    const prompts = await Prompt.find();
    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
};
