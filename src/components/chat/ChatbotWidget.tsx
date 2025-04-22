"use client";
import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMsg {
  from: "user" | "bot";
  text: string;
}

const FAQ: { question: string; answer: string }[] = [
  {
    question: "Comment prendre rendez-vous ?",
    answer:
      "Vous pouvez prendre rendez-vous en appelant le cabinet au 09 83 00 08 43 ou via notre formulaire de contact sur la page ‘Nous contacter’. Nous vous proposerons rapidement un créneau adapté."
  },
  {
    question: "Quels sont vos horaires ?",
    answer:
      "Le cabinet est ouvert du lundi au vendredi, de 8h30 à 18h. Nous sommes fermés le week-end sauf rendez-vous exceptionnels."
  },
  {
    question: "Quels services proposez-vous ?",
    answer:
      "Nous proposons l’expertise comptable, la gestion de la paie, le conseil juridique, la gestion sociale & RH, ainsi que l’accompagnement à la création ou reprise d’entreprise. Pour en savoir plus, consultez la page ‘Notre savoir-faire’."
  },
  {
    question: "Comment transmettre mes documents ?",
    answer:
      "Vous pouvez transmettre vos documents comptables par email, via notre plateforme sécurisée ou directement à l’accueil du cabinet. Contactez-nous pour obtenir vos accès."
  },
  {
    question: "Où trouver un simulateur d’impôt ou d’aides ?",
    answer:
      "Rendez-vous sur notre page ‘Outils & Liens utiles’ où vous trouverez les principaux simulateurs de l’administration : impôt, URSSAF, paie, création d’entreprise…"
  },
  {
    question: "Comment rejoindre le cabinet FINGEC ?",
    answer:
      "Nous recrutons régulièrement ! Consultez la page ‘Nous rejoindre’ pour voir les offres et déposer votre candidature. Candidatures spontanées bienvenues aussi."
  },
  {
    question: "Quels documents apporter au premier rendez-vous ?",
    answer:
      "Merci d’apporter vos derniers bilans, statuts, relevés bancaires professionnels, et tout document utile. Pour une liste précise, appelez-nous ou précisez votre besoin lors du contact."
  },
  {
    question: "Où est situé le cabinet ?",
    answer:
      "Nous sommes au 06 Rue Frédéric Chopin, 67118 Geispolsheim. Vous trouverez un plan sur la page ‘Contact’."
  },
  {
    question: "Comment obtenir une attestation fiscale (ou autre) ?",
    answer:
      "Demandez-nous par téléphone ou via le formulaire de contact, nous vous l’enverrons par email ou courrier sans délai."
  },
  {
    question: "Quelles sont vos honoraires ?",
    answer:
      "Nos tarifs sont calculés au plus juste selon la nature de votre dossier. Nous réalisons toujours un devis transparent avant tout engagement. Rendez-vous ou devis gratuit : contactez-nous !"
  }
];

const greeting = {
  from: "bot" as const,
  text:
    "Bonjour, je suis le robot FAQ FINGEC. Posez-moi une question ou cliquez sur une suggestion."
};

function searchFAQ(question: string) {
  // Recherche naïve : match si la question de la FAQ inclut une portion de la question, ou inversement, ou si correspondance mots-clés
  const normalized = (str: string) =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const q = normalized(question);
  // Recherche stricte
  let best = FAQ.find(faq =>
    normalized(faq.question) === q ||
    normalized(faq.question).includes(q) ||
    q.includes(normalized(faq.question))
  );
  if (best) return best;
  // Recherche souple : mots en commun
  const qWords = q.split(/\W+/);
  best = FAQ.find(faq => qWords.some(w =>
    normalized(faq.question).includes(w) || normalized(faq.answer).includes(w)
  ));
  return best || null;
}

const SUGGESTIONS = FAQ.map(obj => obj.question).slice(0, 6);

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([greeting]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMsgs(m => [...m, { from: "user", text: question }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const found = searchFAQ(question);
      setMsgs(m => [
        ...m,
        found
          ? { from: "bot", text: found.answer }
          : {
              from: "bot",
              text:
                "Désolé, je n'ai pas trouvé de réponse dans la FAQ. <br />Vous pouvez consulter les pages dédiées ou <a class='underline text-primary' href='/nous-contacter'>nous contacter</a>."
            }
      ]);
      setLoading(false);
    }, 400);
  }

  function handleSuggestion(s: string) {
    setInput(s);
    setTimeout(() => {
      sendMessage(undefined);
    }, 10);
  }

  // Bubble (si fermé)
  if (!open) {
    return (
      <button
        aria-label="Ouvrir la FAQ chatbot FINGEC"
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
        <div className="font-bold text-white select-none">FINGEC — FAQ</div>
        <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-white p-1 ml-2 rounded hover:bg-primary/60">
          <X className="w-5 h-5" />
        </button>
      </div>
      {/* Messages */}
      <div className="flex-1 p-3 h-72 overflow-y-auto bg-gray-50 text-sm">
        {msgs.map((m, idx) => (
          <div key={idx} className={`mb-2 flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`rounded-lg px-3 py-2 max-w-[85%] whitespace-pre-line shadow ${
                m.from === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
              }`}
              dangerouslySetInnerHTML={{ __html: m.text }}
            />
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      {/* Suggestions rapides */}
      <div className="px-3 pb-2 flex flex-wrap gap-2">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            className="flex items-center gap-1 py-1 px-3 border rounded-lg text-xs hover:bg-primary/10 bg-white"
            onClick={() => handleSuggestion(s)}
          >
            <Lightbulb className="w-3 h-3 text-yellow-400" /> {s}
          </button>
        ))}
      </div>
      {/* Footer / Input */}
      <form
        onSubmit={sendMessage}
        className="flex items-center border-t border-gray-200 bg-white px-2 py-2 gap-2"
      >
        <input
          disabled={loading}
          className="flex-1 rounded-md border px-2 py-1 text-sm ring-0 outline-none"
          type="text"
          placeholder="Écrivez votre question ou cliquez sur une suggestion…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) sendMessage();
          }}
        />
        <Button type="submit" size="icon" disabled={!input.trim() || loading} className="bg-primary text-white">
          {loading ? (
            <svg className="animate-spin w-4 h-4 mx-auto" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
          ) : <Send className="w-4 h-4" />}
        </Button>
      </form>
    </div>
  );
}
