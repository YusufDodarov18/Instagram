import { useState, useRef, useEffect } from "react";
import {
  Phone,
  Video,
  Info,
  Smile,
  Image,
  Mic,
  Heart,
  Send,
  ArrowLeft,
  Plus,
} from "lucide-react";


const ChatConversation = ({ chat, onBack }) => {
  const [messages, setMessages] = useState(chat.messages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      text: input.trim(),
      sent: true,
      time: new Date().toLocaleTimeString("tg-TJ", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      seen: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-ig-separator px-4 py-[10px]">
        {onBack && (
          <button
            onClick={onBack}
            className="mr-1 p-1 hover:opacity-60 transition-opacity lg:hidden"
          >
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
        )}
        <div className="relative flex-shrink-0">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="h-11 w-11 rounded-full object-cover"
          />
          {chat.online && (
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-ig-online" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-foreground leading-tight">
            {chat.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {chat.online ? "Фаол" : "Ғайрифаол"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:opacity-60 transition-opacity">
            <Phone className="h-6 w-6 text-foreground" />
          </button>
          <button className="hover:opacity-60 transition-opacity">
            <Video className="h-6 w-6 text-foreground" />
          </button>
          <button className="hover:opacity-60 transition-opacity">
            <Info className="h-6 w-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Profile info at top */}
        <div className="flex flex-col items-center mb-8 mt-4">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="h-24 w-24 rounded-full object-cover mb-3"
          />
          <p className="text-lg font-bold text-foreground">{chat.name}</p>
          <p className="text-sm text-muted-foreground">
            {chat.username} · Instagram
          </p>
          <button className="mt-3 rounded-lg bg-input px-4 py-[6px] text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
            Дидани профил
          </button>
        </div>

        {/* Message bubbles */}
        <div className="space-y-[2px]">
          {messages.map((msg, index) => {
            const prevMsg = messages[index - 1];
            const nextMsg = messages[index + 1];
            const isFirstInGroup = !prevMsg || prevMsg.sent !== msg.sent;
            const isLastInGroup = !nextMsg || nextMsg.sent !== msg.sent;
            return (
              <div
                key={msg.id}
                className={`flex ${msg.sent ? "justify-end" : "justify-start"} ${isFirstInGroup ? "mt-2" : ""}`}
              >
                <div className="flex items-end gap-2 max-w-[70%]">
                  {/* Avatar for received - only on last in group */}
                  {!msg.sent && isLastInGroup && (
                    <img
                      src={chat.avatar}
                      alt=""
                      className="h-7 w-7 rounded-full object-cover flex-shrink-0 mb-[2px]"
                    />
                  )}
                  {!msg.sent && !isLastInGroup && (
                    <div className="w-7 flex-shrink-0" />
                  )}

                  <div>
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt=""
                        className="max-w-[240px] rounded-2xl mb-1"
                      />
                    )}
                    {msg.text && !msg.image && (
                      <div
                        className={`px-[14px] py-[9px] text-[15px] leading-[20px] ${
                          msg.sent
                            ? "bg-ig-bubble-sent text-primary-foreground rounded-[22px]"
                            : "bg-ig-bubble-received text-foreground rounded-[22px]"
                        } ${
                          msg.sent
                            ? isFirstInGroup && isLastInGroup
                              ? "rounded-[22px]"
                              : isFirstInGroup
                                ? "rounded-br-md"
                                : isLastInGroup
                                  ? "rounded-tr-md"
                                  : "rounded-r-md"
                            : isFirstInGroup && isLastInGroup
                              ? "rounded-[22px]"
                              : isFirstInGroup
                                ? "rounded-bl-md"
                                : isLastInGroup
                                  ? "rounded-tl-md"
                                  : "rounded-l-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Seen indicator */}
          {messages.length > 0 &&
            messages[messages.length - 1].sent &&
            messages[messages.length - 1].seen && (
              <div className="flex justify-end pr-1 pt-1">
                <span className="text-xs text-muted-foreground">Хонда шуд</span>
              </div>
            )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-ig-separator px-4 py-3">
        <div className="flex items-center gap-3 rounded-full border border-ig-separator px-4 py-[6px]">
          <button className="hover:opacity-60 transition-opacity flex-shrink-0">
            <Smile className="h-6 w-6 text-foreground" />
          </button>
          <input
            type="text"
            placeholder="Паём..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {input.trim() ? (
            <button
              onClick={handleSend}
              className="text-ig-blue font-semibold text-sm hover:text-ig-blue-hover transition-colors"
            >
              Фиристодан
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button className="hover:opacity-60 transition-opacity">
                <Mic className="h-6 w-6 text-foreground" />
              </button>
              <button className="hover:opacity-60 transition-opacity">
                <Image className="h-6 w-6 text-foreground" />
              </button>
              <button className="hover:opacity-60 transition-opacity">
                <Heart className="h-6 w-6 text-foreground" />
              </button>
              <button className="hover:opacity-60 transition-opacity">
                <Plus className="h-6 w-6 text-foreground" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;
