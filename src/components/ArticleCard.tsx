import { Link } from "@tanstack/react-router";
import { type Article, getAuthor } from "@/data/articles";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const author = getAuthor(article.authorId);

  if (featured) {
    return (
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="group grid gap-6 md:grid-cols-2"
      >
        <div className="aspect-[16/10] overflow-hidden rounded-md bg-muted">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="mb-3 inline-block w-fit bg-brand px-2 py-1 text-xs font-bold uppercase tracking-wider text-brand-foreground">
            {article.category}
          </span>
          <h2 className="mb-3 text-2xl font-black leading-tight text-ink group-hover:text-brand md:text-4xl">
            {article.title}
          </h2>
          <p className="mb-4 text-base text-muted-foreground md:text-lg">{article.summary}</p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{author?.name}</span>
            <span>•</span>
            <span>{article.publishedAt}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-2 text-xs font-bold uppercase tracking-wider text-brand">
          {article.category}
        </span>
        <h3 className="mb-2 text-lg font-bold leading-snug text-ink group-hover:text-brand">
          {article.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{article.summary}</p>
        <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{author?.name}</span>
          <span>•</span>
          <span>{article.publishedAt}</span>
        </div>
      </div>
    </Link>
  );
}
