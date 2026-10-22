import { useEffect, useRef, useState } from "react";
import { Bot, Paperclip, Send, Info, Sparkles } from "lucide-react";
import { PageHeader } from "./ui";
import { Avatar } from "./Shell";

type Msg = { from: "ai" | "me"; text: string; list?: string[] };

const suggestions = ["Why am I feeling tired?", "How can I improve my sleep?", "Is my activity level healthy?"];

const tiredReply: Msg = {
  from: "ai",
  text: "Your sleep dropped from about 8h 10m to 6h 42m this week, and shorter sleep can affect energy and concentration. It may not be the only factor, but it is a likely contributor. A few gentle things to try:",
  list: ["Keep a consistent bedtime within 30 minutes, even on weekends.", "Dim screens and bright lights 45 minutes before bed.", "Have caffeine before 2 pm and drink water through the day.", "A 10-minute morning walk can help your body clock."],
};
const sleepReply: Msg = { ...tiredReply, text: "Your best nights this month followed earlier, steadier bedtimes. Small, repeatable habits tend to work best:" };
const genericReply: Msg = { from: "ai", text: "Thanks for sharing. Based on your recent data, I would start by keeping an eye on sleep and daily movement. If this is persistent or worrying, please check in with a healthcare professional." };

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "ai", text: "Hi Maya, I'm your health companion. I can help you understand your sleep, activity and habits. What's on your mind?" },
    { from: "me", text: "Why am I feeling tired lately?" },
    tiredReply,
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth", block: "end" }), [msgs, typing]);

  const send = (t: string) => {
    if (!t.trim()) return;
    setMsgs((m) => [...m, { from: "me", text: t }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, /sleep/i.test(t) ? sleepReply : /tired/i.test(t) ? tiredReply : genericReply]);
    }, 1100);
  };

  return (
    <>
      <PageHeader title="AI Health Chat" sub="Ask questions in plain language and get calm, practical guidance." />
      <div className="flex h-[calc(100vh-15rem)] min-h-[520px] flex-col overflow-hidden rounded-3xl border border-powder/60 bg-white shadow-soft">
        <div className="flex items-center gap-3 border-b border-powder/60 bg-linear-to-r from-sky/70 to-lav/70 px-5 py-4">
          <span className="grid size-11 place-items-center rounded-2xl grad text-white"><Bot size={22} /></span>
          <div className="flex-1"><p className="font-extrabold">Copilot Health Assistant</p><p className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft"><span className="size-2 rounded-full bg-turq" />Online · informational support</p></div>
          <Sparkles className="text-violet" size={18} />
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto bg-ivory/60 px-4 py-6 sm:px-6">
          {msgs.map((m, i) => (
            <div key={i} className={`fade-in flex items-end gap-3 ${m.from === "me" ? "flex-row-reverse" : ""}`}>
              {m.from === "me" ? <Avatar size={32} /> : <span className="grid size-8 shrink-0 place-items-center rounded-full bg-lav text-violet"><Bot size={16} /></span>}
              <div className={`max-w-[85%] rounded-3xl px-5 py-3.5 text-sm leading-relaxed sm:max-w-[70%] ${m.from === "me" ? "rounded-br-md grad text-white" : "rounded-bl-md bg-linear-to-br from-sky to-lav text-navy"}`}>
                <p>{m.text}</p>
                {m.list && <ul className="mt-3 space-y-2">{m.list.map((l) => <li key={l} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet" />{l}</li>)}</ul>}
              </div>
            </div>
          ))}
          {typing && <div className="flex items-center gap-1.5 pl-11" aria-label="Assistant is typing">{[0, 1, 2].map((d) => <span key={d} className="size-2 animate-bounce rounded-full bg-violet/60" style={{ animationDelay: `${d * 0.15}s` }} />)}</div>}
          <div ref={end} />
        </div>

        <div className="border-t border-powder/60 bg-white p-4">
          <div className="mb-3 flex gap-2 overflow-x-auto">{suggestions.map((s) => <button key={s} onClick={() => send(s)} className="h-9 shrink-0 rounded-full border border-powder bg-sky/50 px-4 text-xs font-bold text-navy transition hover:border-accent hover:bg-sky">{s}</button>)}</div>
          <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex items-center gap-2 rounded-full border border-powder bg-ivory p-1.5 pl-3 transition focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15">
            <button type="button" aria-label="Attach file" className="grid size-10 place-items-center rounded-full text-ink-soft hover:bg-sky"><Paperclip size={18} /></button>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about sleep, energy, habits…" className="h-10 min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-ink-soft/60" />
            <button type="submit" aria-label="Send" disabled={!text.trim()} className="grid size-11 place-items-center rounded-full grad text-white transition hover:brightness-105 disabled:opacity-40"><Send size={17} /></button>
          </form>
          <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-snug text-ink-soft"><Info size={13} className="mt-px shrink-0" />AI insights are informational and do not replace professional medical advice.</p>
        </div>
      </div>
    </>
  );
}
