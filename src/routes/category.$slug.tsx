import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArticleCard, type ArticleRow } from "@/components/ArticleCard";
import { fetchArticles } from "@/lib/articles";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = getCategoryBySlug(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.cat.hindi} — खबरतक` },
      { name: "description", content: loaderData.cat.tagline },
      { property: "og:title", content: `${loaderData.cat.hindi} — खबरतक` },
      { property: "og:description", content: loaderData.cat.tagline },
    ] : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-black">श्रेणी नहीं मिली</h1>
      <Link to="/" className="mt-4 inline-block text-brand underline">होम पर जाएं</Link>
    </div>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticles({ category: cat.key, limit: 30 }).then((a) => { setArticles(a); setLoading(false); });
  }, [cat.key]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 border-b-2 border-ink pb-4">
        <h1 className="text-3xl font-black text-ink md:text-5xl">
          {cat.hindi}
        </h1>
        <p className="mt-2 text-muted-foreground">{cat.tagline}</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c.key}
            to="/category/$slug"
            params={{ slug: c.slug }}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              c.key === cat.key ? "border-brand bg-brand text-brand-foreground" : "border-border bg-card hover:border-brand hover:text-brand"
            }`}
          >
            {c.hindi}
          </Link>
        ))}
      </div>

      {loading ? (
        <p className="py-12 text-center text-muted-foreground">लोड हो रहा है…</p>
      ) : articles.length === 0 ? (
        <div className="rounded-md border border-dashed border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">इस श्रेणी में अभी कोई आर्टिकल नहीं।</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
      )}
    </div>
  );
}
