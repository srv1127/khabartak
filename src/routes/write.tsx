import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PenLine, Check } from "lucide-react";

export const Route = createFileRoute("/write")({
  head: () => ({ meta: [{ title: "ब्लॉग लिखें — खबरतक" }] }),
  component: WriteBlog,
});

function WriteBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("राजनीति");
  const [body, setBody] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setTitle("");
      setBody("");
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
        <PenLine className="h-3.5 w-3.5" /> लेखक के लिए
      </div>
      <h1 className="text-3xl font-black text-ink md:text-5xl">
        अपनी <span className="text-brand">कहानी</span> लिखें
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        एक लेखक के रूप में जुड़ें और हिंदी पाठकों तक अपनी आवाज़ पहुंचाएं।
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5 rounded-md border border-border bg-card p-6">
        <div>
          <label className="mb-2 block text-sm font-bold text-ink">शीर्षक</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="आपके आर्टिकल का शीर्षक..."
            className="w-full rounded-md border border-input bg-background px-3 py-3 text-lg font-semibold focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-ink">श्रेणी</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {["राजनीति", "खेल", "बिज़नेस", "मनोरंजन", "टेक्नोलॉजी", "शहर"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-ink">आर्टिकल</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={12}
            placeholder="यहां अपनी कहानी लिखें..."
            className="w-full rounded-md border border-input bg-background px-3 py-3 text-base leading-relaxed focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="rounded-md border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted"
          >
            ड्राफ्ट सेव
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-2.5 text-sm font-bold text-brand-foreground hover:opacity-90"
          >
            {done ? <><Check className="h-4 w-4" /> प्रकाशित!</> : "प्रकाशित करें"}
          </button>
        </div>
      </form>
    </div>
  );
}
