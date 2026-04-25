import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { authors, getArticlesByAuthor } from "@/data/articles";
import { ArticleCard } from "@/components/ArticleCard";

export const Route = createFileRoute("/author/$id")({
  loader: ({ params }) => {
    const author = authors.find((a) => a.id === params.id);
    if (!author) throw notFound();
    return { author, posts: getArticlesByAuthor(author.id) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.author.name} — खबरतक` }] : [],
  }),
  component: AuthorPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-black">लेखक नहीं मिला</h1>
      <Link to="/" className="mt-4 inline-block text-brand underline">
        होम पर जाएं
      </Link>
    </div>
  ),
});

function AuthorPage() {
  const { author, posts } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-12 flex flex-col items-center gap-4 border-b border-border pb-10 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand text-3xl font-black text-brand-foreground">
          {author.avatar}
        </div>
        <h1 className="text-3xl font-black text-ink md:text-4xl">{author.name}</h1>
        <p className="max-w-xl text-base text-muted-foreground">{author.bio}</p>
        <div className="text-sm font-semibold text-brand">{posts.length} आर्टिकल्स</div>
      </div>

      <h2 className="mb-6 border-b-2 border-ink pb-2 text-2xl font-black">
        इनके आर्टिकल्स
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
