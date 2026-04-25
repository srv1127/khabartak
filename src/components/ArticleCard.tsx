import { Link } from "@tanstack/react-router";
import { getCategoryHindi } from "@/lib/categories";

export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  cover_image: string | null;
  read_time: string | null;
  author_id: string;
  created_at: string;
  author?: { full_name: string; avatar_url: string | null } | null;
};

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "अभी-अभी";
  if (diff < 3600) return `${Math.floor(diff / 60)} मिनट पहले`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} घंटे पहले`;
  return `${Math.floor(diff / 86400)} दिन पहले`;
}

export function ArticleCard({ article, featured = false }: { article: ArticleRow; featured?: boolean }) {
  const cover = article.cover_image || "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800";
  const authorName = article.author?.full_name || "खबरतक टीम";

  if (featured) {
    return (
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="group grid gap-6 md:grid-cols-2"
      >
        <div className="aspect-[16/10] overflow-hidden rounded-md bg-muted">
          <img src={cover} alt={article.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="mb-3 inline-block w-fit bg-brand px-2 py-1 text-xs font-bold uppercase tracking-wider text-brand-foreground">
            {getCategoryHindi(article.category)}
          </span>
          <h2 className="mb-3 text-2xl font-black leading-tight text-ink group-hover:text-brand md:text-4xl">{article.title}</h2>
          <p className="mb-4 text-base text-muted-foreground md:text-lg">{article.summary}</p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{authorName}</span>
            <span>•</span>
            <span>{timeAgo(article.created_at)}</span>
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
        <img src={cover} alt={article.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-2 text-xs font-bold uppercase tracking-wider text-brand">
          {getCategoryHindi(article.category)}
        </span>
        <h3 className="mb-2 text-lg font-bold leading-snug text-ink group-hover:text-brand">{article.title}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{article.summary}</p>
        <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{authorName}</span>
          <span>•</span>
          <span>{timeAgo(article.created_at)}</span>
        </div>
      </div>
    </Link>
  );
}
