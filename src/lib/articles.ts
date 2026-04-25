import { supabase } from "@/integrations/supabase/client";
import type { ArticleRow } from "@/components/ArticleCard";

export async function fetchArticles(opts?: { category?: string; limit?: number }): Promise<ArticleRow[]> {
  let q = supabase
    .from("articles")
    .select("id,slug,title,summary,body,category,cover_image,read_time,author_id,created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (opts?.category) q = q.eq("category", opts.category);
  if (opts?.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error || !data) return [];

  // batch fetch authors
  const ids = Array.from(new Set(data.map((a) => a.author_id)));
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id,full_name,avatar_url")
    .in("id", ids);
  const map = new Map((profiles ?? []).map((p) => [p.id, { full_name: p.full_name, avatar_url: p.avatar_url }]));
  return data.map((a) => ({ ...a, author: map.get(a.author_id) ?? null }));
}

export async function fetchArticleBySlug(slug: string): Promise<ArticleRow | null> {
  const { data } = await supabase
    .from("articles")
    .select("id,slug,title,summary,body,category,cover_image,read_time,author_id,created_at")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (!data) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name,avatar_url")
    .eq("id", data.author_id)
    .maybeSingle();
  return { ...data, author: profile ?? null } as ArticleRow;
}

export async function fetchAuthor(id: string) {
  const { data } = await supabase
    .from("profiles")
    .select("id,full_name,bio,avatar_url,status")
    .eq("id", id)
    .maybeSingle();
  return data;
}

export async function fetchArticlesByAuthor(id: string): Promise<ArticleRow[]> {
  const { data } = await supabase
    .from("articles")
    .select("id,slug,title,summary,body,category,cover_image,read_time,author_id,created_at")
    .eq("author_id", id)
    .eq("published", true)
    .order("created_at", { ascending: false });
  return (data ?? []) as ArticleRow[];
}
