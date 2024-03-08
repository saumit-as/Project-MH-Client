import { kv } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs";
// import { auth } from "@/auth";
import { nanoid } from "@/lib/utils";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const json = await req.json();
  const { messages, previewToken } = json;
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  if (previewToken) {
    openai.apiKey = previewToken;
  }

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    stream: false,
  });

  console.log(res.choices[0].message);

  return res.choices[0].message;
}
