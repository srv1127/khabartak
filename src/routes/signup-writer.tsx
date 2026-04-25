import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/signup-writer")({
  head: () => ({ meta: [{ title: "लेखक बनें — खबरतक" }] }),
  component: SignupWriter,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "पूरा नाम डालें").max(100),
  email: z.string().trim().email("सही ईमेल डालें").max(255),
  password: z.string().min(6, "कम से कम 6 अक्षर").max(72),
  phone: z.string().trim().min(7, "सही फोन नंबर").max(20),
  bio: z.string().trim().min(20, "कम से कम 20 अक्षर का परिचय").max(500),
});

function SignupWriter() {
  const nav = useNavigate();
  const { refreshProfile } = useAuth();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", phone: "", bio: "" });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [idDoc, setIdDoc] = useState<File | null>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const parsed = schema.safeParse(form);
    if (!parsed.success) { setErr(parsed.error.issues[0].message); return; }
    if (!idDoc) { setErr("पहचान पत्र (Aadhaar/PAN) अपलोड करें"); return; }

    setLoading(true);
    const redirect = `${window.location.origin}/`;
    const { data: signUp, error: signErr } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: { emailRedirectTo: redirect, data: { full_name: parsed.data.full_name } },
    });
    if (signErr || !signUp.user) { setErr(signErr?.message || "साइनअप विफल"); setLoading(false); return; }

    const uid = signUp.user.id;

    // Upload KYC
    const idExt = idDoc.name.split(".").pop() || "bin";
    const idPath = `${uid}/id.${idExt}`;
    const { error: idErr } = await supabase.storage.from("kyc-documents").upload(idPath, idDoc, { upsert: true });
    if (idErr) { setErr("पहचान पत्र अपलोड में दिक्कत: " + idErr.message); setLoading(false); return; }

    // Upload avatar (optional)
    let avatarUrl: string | null = null;
    if (avatar) {
      const ext = avatar.name.split(".").pop() || "jpg";
      const path = `${uid}/avatar.${ext}`;
      const { error: aErr } = await supabase.storage.from("avatars").upload(path, avatar, { upsert: true });
      if (!aErr) avatarUrl = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
    }

    // Update profile and request approval
    const { error: pErr } = await supabase.from("profiles").update({
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      bio: parsed.data.bio,
      avatar_url: avatarUrl,
      id_document_url: idPath,
      status: "pending",
    }).eq("id", uid);

    if (pErr) { setErr("प्रोफाइल सेव में दिक्कत: " + pErr.message); setLoading(false); return; }

    await refreshProfile();
    setLoading(false);
    nav({ to: "/write" });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-black text-ink md:text-4xl">
        खबरतक के लिए <span className="text-brand">लेखक</span> बनें
      </h1>
      <p className="mt-2 text-muted-foreground">
        नीचे अपनी पूरी जानकारी और पहचान पत्र अपलोड करें। एडमिन की मंज़ूरी के बाद आप आर्टिकल प्रकाशित कर सकेंगे।
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5 rounded-md border border-border bg-card p-6">
        <Field label="पूरा नाम"><input required value={form.full_name} onChange={set("full_name")} className={input} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="ईमेल"><input required type="email" value={form.email} onChange={set("email")} className={input} /></Field>
          <Field label="फोन नंबर"><input required value={form.phone} onChange={set("phone")} className={input} /></Field>
        </div>
        <Field label="पासवर्ड (कम से कम 6 अक्षर)"><input required type="password" value={form.password} onChange={set("password")} className={input} /></Field>
        <Field label="आपका परिचय (Bio)">
          <textarea required rows={4} value={form.bio} onChange={set("bio")} className={`${input} resize-y`} placeholder="आप कौन हैं, क्या लिखते हैं, अनुभव…" />
        </Field>
        <Field label="प्रोफाइल फोटो (वैकल्पिक)">
          <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)} className="text-sm" />
        </Field>
        <Field label="पहचान पत्र — Aadhaar / PAN (निजी, सिर्फ़ एडमिन देख सकता है)">
          <input required type="file" accept="image/*,.pdf" onChange={(e) => setIdDoc(e.target.files?.[0] || null)} className="text-sm" />
        </Field>

        {err && <p className="text-sm font-semibold text-brand">{err}</p>}

        <button disabled={loading} className="w-full rounded-md bg-brand py-2.5 text-sm font-bold text-brand-foreground hover:opacity-90 disabled:opacity-50">
          {loading ? "भेज रहे हैं…" : "अप्लाई करें"}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          पहले से अकाउंट है? <Link to="/login" className="font-semibold text-brand hover:underline">लॉगिन करें</Link>
        </p>
      </form>
    </div>
  );
}

const input = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-ink">{label}</label>
      {children}
    </div>
  );
}
