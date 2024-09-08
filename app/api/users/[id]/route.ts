import { connectDB } from "@utils/database";
import User from "@models/user";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (req: Request, { params }: { params: Params }) => {
  try {
    await connectDB();
    const userId = params.id;
    const user = await User.findById(userId);
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};