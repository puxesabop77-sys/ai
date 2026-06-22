"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";

type ChatInputProps = {
  onSend: (message: string) => void;
  loading: boolean;
};

export default function ChatInput({ onSend, loading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setMessage("");
  };

  return (
    <div className="border-t border-border bg-bg p-4">
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-2xl border border-border bg-panel px-4 py-3">
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
          className="max-h-40 min-h-[28px] flex-1 resize-none bg-transparent text-sm outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="rounded-xl bg-accent px-3 py-3 text-white transition disabled:opacity-50"
        >
          <SendHorizonal size={18} />
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-muted">
        AI can make mistakes. Verify important information.
      </p>
    </div>
  );
}
