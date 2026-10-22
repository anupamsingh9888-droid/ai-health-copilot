import { useState } from "react";
import { Camera, Check, Heart } from "lucide-react";
import { Btn, Card, Field, PageHeader, Leaf } from "./ui";
import { Avatar } from "./Shell";

const levels = ["Sedentary", "Lightly active", "Moderately active", "Very active"];
const allGoals = ["Better sleep", "Lose 3 kg", "Walk 10k steps", "Reduce stress", "Eat more plants", "Build strength"];

export default function Profile() {
  const [level, setLevel] = useState("Moderately active");
  const [gender, setGender] = useState("Female");
  const [goals, setGoals] = useState(["Better sleep", "Walk 10k steps"]);
  const [saved, setSaved] = useState(false);
  const toggle = (g: string) => setGoals((s) => (s.includes(g) ? s.filter((x) => x !== g) : [...s, g]));
  const chip = (on: boolean) => `h-10 rounded-full border px-4 text-sm font-bold transition ${on ? "border-accent bg-sky text-accent" : "border-powder bg-white text-ink-soft hover:border-accent/50"}`;

  return (
    <>
      <PageHeader title="Personal Health Profile" sub="The more accurate your details, the more relevant your insights." />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }} className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-5">
              <div className="relative"><Avatar size={80} /><button type="button" aria-label="Change photo" className="absolute -bottom-1 -right-1 grid size-8 place-items-center rounded-full bg-white text-accent shadow-soft hover:bg-sky"><Camera size={14} /></button></div>
              <div><p className="text-xl font-extrabold">Maya Rao</p><p className="text-sm text-ink-soft">maya@example.com · Member since March 2026</p></div>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="mb-4 font-extrabold">Basics</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" defaultValue="Maya Rao" />
              <Field label="Age" type="number" defaultValue="29" />
              <Field label="Height (cm)" type="number" defaultValue="167" />
              <Field label="Weight (kg)" type="number" defaultValue="62.4" />
            </div>
            <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wider text-ink-soft">Gender</p>
            <div className="flex flex-wrap gap-2">{["Female", "Male", "Non-binary", "Prefer not to say"].map((g) => <button type="button" key={g} onClick={() => setGender(g)} className={chip(gender === g)}>{g}</button>)}</div>
          </Card>
          <Card className="p-6">
            <h2 className="mb-4 font-extrabold">Lifestyle & goals</h2>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-soft">Activity level</p>
            <div className="flex flex-wrap gap-2">{levels.map((l) => <button type="button" key={l} onClick={() => setLevel(l)} className={chip(level === l)}>{l}</button>)}</div>
            <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wider text-ink-soft">Health goals</p>
            <div className="flex flex-wrap gap-2">{allGoals.map((g) => <button type="button" key={g} onClick={() => toggle(g)} aria-pressed={goals.includes(g)} className={chip(goals.includes(g))}>{goals.includes(g) && <Check size={14} className="mr-1 inline" />}{g}</button>)}</div>
          </Card>
          <div className="flex items-center gap-4">
            <Btn type="submit">Save Changes</Btn>
            {saved && <span role="status" className="fade-in flex items-center gap-1.5 text-sm font-bold text-[#12806f]"><Check size={16} />Profile saved</span>}
          </div>
        </form>

        <aside className="lg:sticky lg:top-10 lg:self-start">
          <Card className="relative overflow-hidden bg-linear-to-b from-mint to-sky p-6 text-center">
            <Leaf className="mx-auto h-36" />
            <Heart className="mx-auto mt-2 text-violet" size={22} />
            <h3 className="mt-2 font-extrabold">Small, honest numbers</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">Your profile only personalizes insights. It is never shared, and you can edit or delete it anytime.</p>
          </Card>
        </aside>
      </div>
    </>
  );
}
