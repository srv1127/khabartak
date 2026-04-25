import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "लॉगिन — खबरतक" }] }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email("सही ईमेल डालें").max(255),
  password: z.string().min(6, "कम से कम 6 अक्षर").max(72),
});

function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) { setErr(parsed.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (error) { setErr("गलत ईमेल या पासवर्ड"); return; }
    nav({ to: "/" });
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-md border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-sm bg-brand font-display text-xl font-black text-brand-foreground">ख</div>
          <h1 className="text-2xl font-black text-ink">वापस आपका स्वागत है</h1>
          <p className="mt-1 text-sm text-muted-foreground">खबरतक में लॉगिन करें</p>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">ईमेल</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">पासवर्ड</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
          </div>
          {err && <p className="text-sm font-semibold text-brand">{err}</p>}
          <button disabled={loading} className="w-full rounded-md bg-brand py-2.5 text-sm font-bold text-brand-foreground hover:opacity-90 disabled:opacity-50">
            {loading ? "लॉगिन हो रहा है…" : "लॉगिन करें"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          लेखक बनना चाहते हैं?{" "}
          <Link to="/signup-writer" className="font-semibold text-brand hover:underline">यहाँ साइनअप करें</Link>
        </p>
      </div>
    </div>
  );
}
