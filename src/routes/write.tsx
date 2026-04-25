import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES } from "@/lib/categories";
import { PenLine, Check } from "lucide-react";

export const Route = createFileRoute("/write")({
  head: () => ({ meta: [{ title: "ब्लॉग लिखें — खबरतक" }] }),
  component: WriteBlog,
});

const schema = z.object({
  title: z.string().trim().min(8, "शीर्षक कम से कम 8 अक्षर").max(160),
  summary: z.string().trim().min(20, "सारांश कम से कम 20 अक्षर").max(280),
  body: z.string().trim().min(100, "आर्टिकल कम से कम 100 अक्षर").max(20000),
  category: z.string(),
});

function slugify(s: string) {
  return s.toLowerCase().trim()
    .replace(/[^a-z0-9\u0900-\u097F]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || `post-${Date.now()}`;
}

function WriteBlog() {
  const { user, profile, loading } = useAuth();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [body, setBody] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <p className="p-12 text-center">लोड हो रहा है…</p>;

  if (!user) {
    return (
      <Center>
        <h1 className="text-2xl font-black">पहले लॉगिन करें</h1>
        <p className="mt-2 text-muted-foreground">आर्टिकल लिखने के लिए लेखक खाता ज़रूरी है।</p>
        <div className="mt-4 flex justify-center gap-3">
          <Link to="/login" className="rounded-md bg-brand px-4 py-2 text-sm font-bold text-brand-foreground">लॉगिन</Link>
          <Link to="/signup-writer" className="rounded-md border border-brand px-4 py-2 text-sm font-bold text-brand">लेखक बनें</Link>
        </div>
      </Center>
    );
  }

  if (!profile || profile.status === "none") {
    return (
      <Center>
        <h1 className="text-2xl font-black">पहले अपनी पहचान सबमिट करें</h1>
        <p className="mt-2 text-muted-foreground">लेखक के रूप में पब्लिश करने के लिए नाम, फोन, बायो और पहचान पत्र देना ज़रूरी है।</p>
        <Link to="/signup-writer" className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-sm font-bold text-brand-foreground">अप्लाई करें</Link>
      </Center>
    );
  }

  if (profile.status === "pending") {
    return (
      <Center>
        <h1 className="text-2xl font-black text-brand">समीक्षा में है</h1>
        <p className="mt-2 text-muted-foreground">आपकी एप्लिकेशन एडमिन की समीक्षा में है। मंज़ूरी मिलते ही आप यहाँ से आर्टिकल पब्लिश कर सकेंगे।</p>
      </Center>
    );
  }

  if (profile.status === "rejected") {
    return (
      <Center>
        <h1 className="text-2xl font-black text-brand">एप्लिकेशन रिजेक्ट</h1>
        {profile.rejection_reason && <p className="mt-2 text-muted-foreground">कारण: {profile.rejection_reason}</p>}
      </Center>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const parsed = schema.safeParse({ title, summary, body, category });
    if (!parsed.success) { setErr(parsed.error.issues[0].message); return; }
    setSubmitting(true);

    let coverUrl: string | null = null;
    if (cover) {
      const ext = cover.name.split(".").pop() || "jpg";
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: cErr } = await supabase.storage.from("article-images").upload(path, cover);
      if (!cErr) coverUrl = supabase.storage.from("article-images").getPublicUrl(path).data.publicUrl;
    }

    const slug = `${slugify(parsed.data.title)}-${Math.random().toString(36).slice(2, 6)}`;
    const words = parsed.data.body.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.round(words / 200))} मिनट`;

    const { error } = await supabase.from("articles").insert({
      slug,
      title: parsed.data.title,
      summary: parsed.data.summary,
      body: parsed.data.body,
      category: parsed.data.category,
      cover_image: coverUrl,
      read_time: readTime,
      author_id: user.id,
      published: true,
    });
    setSubmitting(false);
    if (error) { setErr(error.message); return; }
    setDone(true);
    setTimeout(() => nav({ to: "/article/$slug", params: { slug } }), 800);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
        <PenLine className="h-3.5 w-3.5" /> लेखक के लिए
      </div>
      <h1 className="text-3xl font-black text-ink md:text-5xl">अपनी <span className="text-brand">कहानी</span> लिखें</h1>

      <form onSubmit={submit} className="mt-8 space-y-5 rounded-md border border-border bg-card p-6">
        <Field label="शीर्षक">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="आपके आर्टिकल का शीर्षक…" className="w-full rounded-md border border-input bg-background px-3 py-3 text-lg font-semibold focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </Field>
        <Field label="संक्षेप (Summary)">
          <textarea required rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="1-2 लाइन में बताएँ…" className={input} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="श्रेणी">
            <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className={input}>
              {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.hindi}</option>)}
            </select>
          </Field>
          <Field label="कवर इमेज (वैकल्पिक)">
            <input type="file" accept="image/*" onChange={(e) => setCover(e.target.files?.[0] || null)} className="text-sm" />
          </Field>
        </div>
        <Field label="आर्टिकल">
          <textarea required rows={14} value={body} onChange={(e) => setBody(e.target.value)} placeholder="यहाँ अपनी कहानी लिखें… (पैराग्राफ्स को खाली लाइन से अलग करें)" className={`${input} text-base leading-relaxed`} />
        </Field>

        {err && <p className="text-sm font-semibold text-brand">{err}</p>}

        <button disabled={submitting} className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-2.5 text-sm font-bold text-brand-foreground hover:opacity-90 disabled:opacity-50">
          {done ? <><Check className="h-4 w-4" /> प्रकाशित!</> : submitting ? "प्रकाशित हो रहा है…" : "प्रकाशित करें"}
        </button>
      </form>
    </div>
  );
}

const input = "w-full rounded-md border border-input bg-background px-3 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-ink">{label}</label>
      {children}
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">{children}</div>
  );
}
