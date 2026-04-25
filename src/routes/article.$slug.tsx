import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchArticleBySlug, fetchArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { getCategoryHindi } from "@/lib/categories";

export const Route = createFileRoute("/article/$slug")({
  loader: async ({ params }) => {
    const article = await fetchArticleBySlug(params.slug);
    if (!article) throw notFound();
    const related = (await fetchArticles({ category: article.category, limit: 4 })).filter((a) => a.slug !== article.slug).slice(0, 3);
    return { article, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.article.title} — खबरतक` },
          { name: "description", content: loaderData.article.summary },
          { property: "og:title", content: loaderData.article.title },
          { property: "og:description", content: loaderData.article.summary },
          ...(loaderData.article.cover_image ? [{ property: "og:image", content: loaderData.article.cover_image }] : []),
        ]
      : [],
  }),
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-black">आर्टिकल नहीं मिला</h1>
      <Link to="/" className="mt-4 inline-block text-brand underline">होम पर जाएं</Link>
    </div>
  ),
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData();
  const author = article.author;
  const paragraphs = article.body.split(/\n\n+/).filter(Boolean);
  const cover = article.cover_image || "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200";

  return (
    <article>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link to="/" className="text-sm font-semibold text-brand hover:underline">← वापस होम</Link>

        <span className="mt-6 inline-block bg-brand px-2 py-1 text-xs font-bold uppercase tracking-wider text-brand-foreground">
          {getCategoryHindi(article.category)}
        </span>

        <h1 className="mt-3 text-3xl font-black leading-tight text-ink md:text-5xl">{article.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">{article.summary}</p>

        {author && (
          <div className="mt-6 flex items-center gap-3 border-y border-border py-4">
            <Link to="/author/$id" params={{ id: article.author_id }} className="flex h-12 w-12 items-center justify-center rounded-full bg-brand font-bold text-brand-foreground">
              {(author.full_name || "ख").charAt(0)}
            </Link>
            <div>
              <Link to="/author/$id" params={{ id: article.author_id }} className="block font-bold text-ink hover:text-brand">
                {author.full_name}
              </Link>
              <div className="text-sm text-muted-foreground">
                {new Date(article.created_at).toLocaleDateString("hi-IN")} {article.read_time && `• ${article.read_time} पढ़ने का समय`}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-4xl px-4">
        <img src={cover} alt={article.title} className="aspect-[16/9] w-full rounded-md object-cover" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="prose prose-lg max-w-none space-y-5 text-lg leading-relaxed text-foreground">
          {paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-black first-letter:text-brand" : ""}>
              {p}
            </p>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 pb-8">
          <h2 className="mb-6 border-b-2 border-ink pb-2 text-2xl font-black">और पढ़ें</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        </div>
      )}
    </article>
  );
}
