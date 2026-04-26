import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArticleCard, type ArticleRow } from "@/components/ArticleCard";
import { fetchArticles } from "@/lib/articles";
import { CATEGORIES } from "@/lib/categories";
import { Masthead } from "@/components/Masthead";
import { TributeCard } from "@/components/TributeCard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticles({ category: activeCat ?? undefined, limit: 30 }).then((a) => {
      setArticles(a);
      setLoading(false);
    });
  }, [activeCat]);

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <Masthead />
      <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3 overflow-hidden rounded-sm border-2 border-double border-ink bg-paper px-4 py-2">
        <span className="shrink-0 bg-ink px-2 py-1 font-serif-display text-xs font-black uppercase tracking-[0.2em] text-paper">
          ताज़ा
        </span>
        <p className="truncate font-serif-display text-sm italic text-ink">
          आज का अख़बार • मौसम, स्वास्थ्य, शिक्षा, AI ज्ञान और प्रेरक कहानियाँ — एक ही जगह
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCat(null)}
          className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
            activeCat === null ? "border-brand bg-brand text-brand-foreground" : "border-border bg-card hover:border-brand hover:text-brand"
          }`}
        >
          सभी
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCat(c.key)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeCat === c.key ? "border-brand bg-brand text-brand-foreground" : "border-border bg-card hover:border-brand hover:text-brand"
            }`}
          >
            {c.hindi}
          </button>
        ))}
      </div>

      {loading && <p className="py-12 text-center text-muted-foreground">लोड हो रहा है…</p>}

      {!loading && articles.length === 0 && (
        <div className="rounded-md border border-dashed border-border bg-card p-12 text-center">
          <h2 className="text-xl font-bold text-ink">अभी कोई आर्टिकल नहीं</h2>
          <p className="mt-2 text-muted-foreground">
            हमारे लेखक जल्द ही नए आर्टिकल पोस्ट करेंगे।
          </p>
          <Link to="/signup-writer" className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-sm font-bold text-brand-foreground">
            लेखक बनें
          </Link>
        </div>
      )}

      {featured && <ArticleCard article={featured} featured />}

      {rest.length > 0 && (
        <>
          <div className="mt-12 mb-6 flex items-center justify-between border-b-2 border-ink pb-2">
            <h2 className="text-2xl font-black text-ink">
              और भी <span className="text-brand">पढ़ें</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        </>
      )}

      <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.slice(0, 4).map((c) => (
          <Link
            key={c.key}
            to="/category/$slug"
            params={{ slug: c.slug }}
            className="rounded-sm border-2 border-double border-ink bg-paper p-5 transition-colors hover:bg-accent"
          >
            <h3 className="font-serif-display text-lg font-black text-ink">{c.hindi}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.tagline}</p>
          </Link>
        ))}
      </section>

      <section className="mt-16">
        <TributeCard />
      </section>
      </div>
    </>
  );
}
