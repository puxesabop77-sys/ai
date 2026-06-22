import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY missing in environment variables." },
        { status: 500 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 1024,
      messages: [
        {
          role: "system",
          content:
            "You are a smart, helpful, concise AI assistant. Give clean and useful answers."
        },
        ...messages
      ]
    });

    const reply =
      completion.choices?.[0]?.message?.content || "No response from AI.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI response." },
      { status: 500 }
    );
  }
        }
