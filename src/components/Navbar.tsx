import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { to: "/", label: "होम" },
  { to: "/trending", label: "ट्रेंडिंग" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, profile, isAdmin, signOut } = useAuth();

  const isWriter = profile?.status === "approved";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand font-display text-lg font-black text-brand-foreground">
            ख
          </span>
          <span className="text-xl font-black tracking-tight text-ink">
            खबर<span className="text-brand">तक</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted hover:text-brand"
              activeProps={{ className: "text-brand bg-accent" }}
            >
              {l.label}
            </Link>
          ))}
          {isWriter && (
            <Link to="/write" className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-muted hover:text-brand" activeProps={{ className: "text-brand bg-accent" }}>
              ब्लॉग लिखें
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-muted hover:text-brand" activeProps={{ className: "text-brand bg-accent" }}>
              एडमिन
            </Link>
          )}

          {user ? (
            <button
              onClick={() => signOut()}
              className="ml-2 rounded-md border border-border px-4 py-2 text-sm font-bold text-foreground hover:bg-muted"
            >
              लॉगआउट
            </button>
          ) : (
            <>
              <Link to="/signup-writer" className="ml-2 rounded-md border border-brand px-4 py-2 text-sm font-bold text-brand hover:bg-accent">
                लेखक बनें
              </Link>
              <Link to="/login" className="ml-2 rounded-md bg-brand px-4 py-2 text-sm font-bold text-brand-foreground hover:opacity-90">
                लॉगिन
              </Link>
            </>
          )}
        </nav>

        <button onClick={() => setOpen(!open)} className="rounded-md p-2 md:hidden" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col p-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-muted" activeProps={{ className: "text-brand bg-accent" }}>
                {l.label}
              </Link>
            ))}
            {isWriter && <Link to="/write" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-muted">ब्लॉग लिखें</Link>}
            {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-muted">एडमिन</Link>}
            {user ? (
              <button onClick={() => { signOut(); setOpen(false); }} className="mt-2 rounded-md border border-border px-3 py-3 text-base font-bold text-foreground">
                लॉगआउट
              </button>
            ) : (
              <>
                <Link to="/signup-writer" onClick={() => setOpen(false)} className="mt-2 rounded-md border border-brand px-3 py-3 text-center text-base font-bold text-brand">लेखक बनें</Link>
                <Link to="/login" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-brand px-3 py-3 text-center text-base font-bold text-brand-foreground">लॉगिन</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
