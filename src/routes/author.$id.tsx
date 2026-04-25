import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchAuthor, fetchArticlesByAuthor } from "@/lib/articles";
import { ArticleCard } from "@/components/ArticleCard";

export const Route = createFileRoute("/author/$id")({
  loader: async ({ params }) => {
    const author = await fetchAuthor(params.id);
    if (!author) throw notFound();
    const posts = await fetchArticlesByAuthor(params.id);
    return { author, posts };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.author.full_name} — खबरतक` }] : [],
  }),
  component: AuthorPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-black">लेखक नहीं मिला</h1>
      <Link to="/" className="mt-4 inline-block text-brand underline">होम पर जाएं</Link>
    </div>
  ),
});

function AuthorPage() {
  const { author, posts } = Route.useLoaderData();
  const initial = (author.full_name || "ख").charAt(0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-12 flex flex-col items-center gap-4 border-b border-border pb-10 text-center">
        {author.avatar_url ? (
          <img src={author.avatar_url} alt={author.full_name} className="h-24 w-24 rounded-full object-cover" />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand text-3xl font-black text-brand-foreground">
            {initial}
          </div>
        )}
        <h1 className="text-3xl font-black text-ink md:text-4xl">{author.full_name}</h1>
        {author.bio && <p className="max-w-xl text-base text-muted-foreground">{author.bio}</p>}
        <div className="text-sm font-semibold text-brand">{posts.length} आर्टिकल्स</div>
      </div>

      <h2 className="mb-6 border-b-2 border-ink pb-2 text-2xl font-black">इनके आर्टिकल्स</h2>

      {posts.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">अभी कोई आर्टिकल प्रकाशित नहीं।</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((a: import("@/components/ArticleCard").ArticleRow) => <ArticleCard key={a.id} article={a} />)}
        </div>
      )}
    </div>
  );
}
