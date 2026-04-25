import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArticleCard, type ArticleRow } from "@/components/ArticleCard";
import { fetchArticles } from "@/lib/articles";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/trending")({
  head: () => ({ meta: [{ title: "ट्रेंडिंग खबरें — खबरतक" }] }),
  component: TrendingPage,
});

function TrendingPage() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles({ limit: 24 }).then((a) => {
      setArticles(a);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <TrendingUp className="h-7 w-7 text-brand" />
        <h1 className="text-3xl font-black text-ink md:text-4xl">
          ट्रेंडिंग <span className="text-brand">खबरें</span>
        </h1>
      </div>
      <p className="mb-8 max-w-2xl text-muted-foreground">
        अभी सबसे नई और चर्चित खबरें, हिंदी पाठकों के लिए।
      </p>

      {loading && <p className="py-12 text-center text-muted-foreground">लोड हो रहा है…</p>}
      {!loading && articles.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">अभी कोई आर्टिकल नहीं।</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <div key={a.id} className="relative">
            <span className="absolute -left-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-lg font-black text-background shadow-md">
              {i + 1}
            </span>
            <ArticleCard article={a} />
          </div>
        ))}
      </div>
    </div>
  );
}
