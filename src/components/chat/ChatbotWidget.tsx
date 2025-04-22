"use client";
import { useRef, useState, useEffect } from "react";
import { Send, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMsg {
  from: "user" | "bot";
  text: string;
}

const initialGreeting = {
  from: "bot" as const,
  text: "Bonjour, je suis l’assistant virtuel du cabinet FINGEC. Posez-moi vos questions sur nos services, l’équipe, la prise de rendez-vous…"
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([initialGreeting]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to last message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  async function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMsgs(m => [...m, { from: "user", text: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      });
      const data = await res.json();
      setMsgs(m => [...m, { from: "bot", text: data.message || "(Pas de réponse)" }]);
    } catch {
      setMsgs(m => [...m, { from: "bot", text: "Désolé, une erreur est survenue." }]);
    } finally {
      setLoading(false);
    }
  }

  // Bubble (si fermé)
  if (!open) {
    return (
      <button
        aria-label="Ouvrir le chatbot FINGEC" 
        className="fixed z-50 bottom-4 right-4 bg-primary text-white rounded-full shadow-lg p-4 flex items-center hover:scale-105 transition-transform"
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  // Fenêtre chatbot
  return (
    <div className="fixed z-50 bottom-4 right-4 w-full max-w-xs sm:max-w-sm rounded-2xl border border-primary bg-white shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-primary/90">
        <div className="font-bold text-white select-none">FINGEC — Chatbot</div>
        <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-white p-1 ml-2 rounded hover:bg-primary/60">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 h-72 overflow-y-auto bg-gray-50">
        {msgs.map((m, idx) => (
          <div key={idx} className={`mb-2 flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`rounded-lg px-3 py-2 text-sm max-w-[85%] whitespace-pre-line shadow ${
                m.from === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
              }`}
            >{m.text}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Footer / Input */}
      <form
        onSubmit={sendMessage}
        className="flex items-center border-t border-gray-200 bg-white px-2 py-2 gap-2"
      >
        <input
          ref={inputRef}
          disabled={loading}
          className="flex-1 rounded-md border px-2 py-1 text-sm ring-0 outline-none"
          type="text"
          placeholder="Écrivez votre message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) sendMessage();
          }}
        />
        <Button	type="submit" size="icon" disabled={!input.trim() || loading} className="bg-primary text-white">
          {loading ? (
            <svg className="animate-spin w-4 h-4 mx-auto" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
          ) : <Send className="w-4 h-4" />}
        </Button>
      </form>
    </div>
  );
}