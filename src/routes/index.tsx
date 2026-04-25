import { createFileRoute } from "@tanstack/react-router";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/")({
  component: Index,
});

const categories = ["सभी", "राजनीति", "खेल", "बिज़नेस", "मनोरंजन", "टेक्नोलॉजी", "शहर"];

function Index() {
  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Breaking strip */}
      <div className="mb-8 flex items-center gap-3 overflow-hidden rounded-md border border-border bg-card px-4 py-2">
        <span className="shrink-0 bg-brand px-2 py-1 text-xs font-black uppercase tracking-wider text-brand-foreground">
          ब्रेकिंग
        </span>
        <p className="truncate text-sm font-medium">
          संसद का शीतकालीन सत्र शुरू • दिल्ली में AQI 'गंभीर' श्रेणी में • भारत-ऑस्ट्रेलिया सीरीज़ जीती
        </p>
      </div>

      {/* Featured */}
      <ArticleCard article={featured} featured />

      {/* Categories */}
      <div className="mt-12 mb-6 flex items-center justify-between border-b-2 border-ink pb-2">
        <h2 className="text-2xl font-black text-ink">
          ट्रेंडिंग <span className="text-brand">अभी</span>
        </h2>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
