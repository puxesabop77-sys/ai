type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] md:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-7 whitespace-pre-wrap ${
          isUser
            ? "bg-userBubble text-white"
            : "bg-aiBubble border border-border text-text"
        }`}
      >
        {content}
      </div>
    </div>
  );
      }
