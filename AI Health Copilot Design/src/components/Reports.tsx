import { useState } from "react";
import { FileText, FlaskConical, Pill, ClipboardList, Upload, ShieldCheck, Moon, Footprints, Loader2, CheckCircle2, Eye, Check } from "lucide-react";
import { Badge, Btn, Card, PageHeader } from "./ui";

const initial = [
  { id: 1, name: "Prescription — Vitamin D", type: "Prescription", icon: Pill, date: "14 Oct 2026", status: "Processed" },
  { id: 2, name: "Complete Blood Count", type: "Laboratory", icon: FlaskConical, date: "02 Oct 2026", status: "Processed" },
  { id: 3, name: "Discharge Summary", type: "Discharge", icon: ClipboardList, date: "19 Sep 2026", status: "Processing" },
];
const filters = ["All", "Prescription", "Laboratory", "Discharge"];

export default function Reports() {
  const [docs, setDocs] = useState(initial);
  const [f, setF] = useState("All");
  const [toast, setToast] = useState("");
  const upload = () => {
    setDocs((d) => [{ id: Date.now(), name: "New uploaded report", type: "Laboratory", icon: FileText, date: "22 Oct 2026", status: "Processing" }, ...d]);
    setToast("Report uploaded. Processing has started.");
    setTimeout(() => setToast(""), 3000);
  };
  const list = docs.filter((d) => f === "All" || d.type === f);

  return (
    <>
      <PageHeader title="Medical Reports" sub="Your documents, summarized and kept in one private place." right={<Btn onClick={upload}><Upload size={16} />Upload Report</Btn>} />
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-6">
          <h2 className="font-extrabold">Weekly health summary</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-mint p-4"><Moon size={18} className="text-turq" /><p className="mt-3 text-2xl font-extrabold">6h 42m</p><p className="text-xs text-ink-soft">Avg sleep · down 18%</p></div>
            <div className="rounded-2xl bg-sky p-4"><Footprints size={18} className="text-accent" /><p className="mt-3 text-2xl font-extrabold">58,900</p><p className="text-xs text-ink-soft">Steps · up 12%</p></div>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-extrabold">Recent activity</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[["Walked 8.2 km", "Today, 7:10 am"], ["Logged weight 62.4 kg", "Yesterday"], ["Uploaded blood count", "02 Oct"]].map(([a, b]) => <li key={a} className="flex items-center gap-3"><span className="size-2.5 rounded-full bg-violet" /><span className="flex-1 font-bold">{a}</span><span className="text-xs text-ink-soft">{b}</span></li>)}
          </ul>
        </Card>
      </div>

      <div className="mb-4 mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold">Medical documents</h2>
        <div className="flex gap-2 overflow-x-auto">{filters.map((x) => <button key={x} onClick={() => setF(x)} aria-pressed={f === x} className={`h-9 rounded-full px-4 text-xs font-bold ${f === x ? "bg-navy text-white" : "bg-white text-ink-soft ring-1 ring-powder hover:text-navy"}`}>{x}</button>)}</div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((d) => (
          <Card key={d.id} className="fade-in p-5 transition hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-lav text-violet"><d.icon size={22} /></span>
              {d.status === "Processed" ? <Badge tone="mint"><CheckCircle2 size={12} />Processed</Badge> : <Badge tone="amber"><Loader2 size={12} className="animate-spin" />Processing</Badge>}
            </div>
            <p className="mt-4 font-extrabold">{d.name}</p>
            <p className="text-xs text-ink-soft">{d.type} · PDF · Uploaded {d.date}</p>
            <Btn variant="secondary" className="mt-4 h-10 w-full"><Eye size={15} />View Details</Btn>
          </Card>
        ))}
      </div>
      <p className="mt-6 flex items-start gap-2 text-xs text-ink-soft"><ShieldCheck size={15} className="mt-px shrink-0 text-turq" />Documents are encrypted and private. Summaries are generated automatically and have not been reviewed by a clinician.</p>
      {toast && <div role="status" className="fade-in fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-navy px-5 py-3 text-sm font-bold text-white shadow-soft lg:bottom-8"><Check size={16} className="text-mint" />{toast}</div>}
    </>
  );
}
