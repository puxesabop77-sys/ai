"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m your AI assistant. Ask me anything and I’ll reply using Groq."
    }
  ]);

  const [loading, setLoading] = useState(false);

  const handleNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "New chat started. Ask me anything."
      }
    ]);
  };

  const sendMessage = async (text: string) => {
    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", content: text }
    ];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI response.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply
        }
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message || "Something went wrong."}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen bg-bg text-text">
      <Sidebar onNewChat={handleNewChat} />

      <section className="flex flex-1 flex-col">
        <header className="border-b border-border bg-bg px-4 py-4 text-sm font-semibold">
          AI Chat Website
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-6">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                role={msg.role}
                content={msg.content}
              />
            ))}

            {loading && (
              <div className="flex w-full justify-start">
                <div className="rounded-2xl border border-border bg-aiBubble px-4 py-3 text-sm text-muted">
                  AI is thinking...
                </div>
              </div>
            )}
          </div>
        </div>

        <ChatInput onSend={sendMessage} loading={loading} />
      </section>
    </main>
  );
}
