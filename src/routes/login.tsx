import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "लॉगिन — खबरतक" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-md border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-sm bg-brand font-display text-xl font-black text-brand-foreground">
            ख
          </div>
          <h1 className="text-2xl font-black text-ink">वापस आपका स्वागत है</h1>
          <p className="mt-1 text-sm text-muted-foreground">खबरतक में लॉगिन करें</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">ईमेल</label>
            <input
              type="email"
              placeholder="aap@example.com"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink">पासवर्ड</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <button className="w-full rounded-md bg-brand py-2.5 text-sm font-bold text-brand-foreground hover:opacity-90">
            लॉगिन करें
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          नए यूज़र हैं?{" "}
          <Link to="/write" className="font-semibold text-brand hover:underline">
            ब्लॉग लिखकर शुरू करें
          </Link>
        </p>
      </div>
    </div>
  );
}
