import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "एडमिन — खबरतक" }] }),
  component: AdminPage,
});

type Pending = {
  id: string;
  full_name: string;
  phone: string | null;
  bio: string | null;
  status: string;
  id_document_url: string | null;
  avatar_url: string | null;
};

function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const [pending, setPending] = useState<Pending[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setRefreshing(true);
    const { data } = await supabase
      .from("profiles")
      .select("id,full_name,phone,bio,status,id_document_url,avatar_url")
      .in("status", ["pending", "approved", "rejected"])
      .order("status");
    setPending((data ?? []) as Pending[]);
    setRefreshing(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  if (loading) return <p className="p-12 text-center">लोड हो रहा है…</p>;

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-black">एडमिन एक्सेस ज़रूरी</h1>
        <p className="mt-2 text-muted-foreground">यह पेज सिर्फ़ एडमिन के लिए है।</p>
        <Link to="/" className="mt-4 inline-block text-brand underline">होम पर जाएं</Link>
      </div>
    );
  }

  const setStatus = async (id: string, status: "approved" | "rejected") => {
    await supabase.from("profiles").update({ status }).eq("id", id);
    if (status === "approved") {
      await supabase.from("user_roles").insert({ user_id: id, role: "writer" }).select();
    }
    load();
  };

  const viewKyc = async (path: string) => {
    const { data } = await supabase.storage.from("kyc-documents").createSignedUrl(path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-black text-ink md:text-4xl">
        एडमिन <span className="text-brand">पैनल</span>
      </h1>
      <p className="mt-2 text-muted-foreground">लेखक एप्लिकेशन समीक्षा करें।</p>

      <button onClick={load} disabled={refreshing} className="mt-4 rounded-md border border-border px-3 py-1.5 text-sm font-semibold hover:bg-muted">
        {refreshing ? "रीफ्रेश…" : "रीफ्रेश"}
      </button>

      <div className="mt-6 space-y-4">
        {pending.length === 0 && <p className="text-muted-foreground">कोई एप्लिकेशन नहीं।</p>}
        {pending.map((p) => (
          <div key={p.id} className="rounded-md border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-ink">{p.full_name || "(बिना नाम)"}</h3>
                <p className="mt-1 text-sm text-muted-foreground">📞 {p.phone || "—"}</p>
                <p className="mt-2 text-sm">{p.bio}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-bold uppercase ${
                p.status === "pending" ? "bg-accent text-brand" :
                p.status === "approved" ? "bg-green-100 text-green-800" :
                "bg-red-100 text-red-800"
              }`}>{p.status}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.id_document_url && (
                <button onClick={() => viewKyc(p.id_document_url!)} className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted">
                  पहचान पत्र देखें
                </button>
              )}
              {p.status !== "approved" && (
                <button onClick={() => setStatus(p.id, "approved")} className="rounded-md bg-brand px-3 py-1.5 text-xs font-bold text-brand-foreground">
                  मंज़ूर करें
                </button>
              )}
              {p.status !== "rejected" && (
                <button onClick={() => setStatus(p.id, "rejected")} className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted">
                  रिजेक्ट
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-md border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        <strong>सुझाव:</strong> पहला एडमिन बनाने के लिए, अपने यूज़र ID के साथ <code>user_roles</code> टेबल में <code>admin</code> रोल जोड़ें (Lovable Cloud → Database)।
      </div>
    </div>
  );
}
