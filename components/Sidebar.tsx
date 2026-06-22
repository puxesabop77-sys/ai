"use client";

import { MessageSquarePlus, Sparkles } from "lucide-react";

type SidebarProps = {
  onNewChat: () => void;
};

export default function Sidebar({ onNewChat }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-[260px] flex-col border-r border-border bg-panel2 p-3">
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm hover:bg-white/5 transition"
      >
        <MessageSquarePlus size={18} />
        <span>New chat</span>
      </button>

      <div className="mt-6">
        <div className="mb-2 text-xs uppercase tracking-wider text-muted">
          Workspace
        </div>

        <div className="rounded-xl border border-border bg-panel p-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles size={16} />
            AI Chat Website
          </div>
          <p className="mt-2 text-xs leading-5 text-muted">
            Groq-powered assistant with a clean chat interface.
          </p>
        </div>
      </div>

      <div className="mt-auto rounded-xl border border-border bg-panel p-3 text-xs text-muted leading-5">
        Deploy with GitHub + Vercel  
        Add <span className="text-white">GROQ_API_KEY</span> in env vars.
      </div>
    </aside>
  );
}
