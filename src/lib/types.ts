export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author?: string;
  tags: string[];
  category: string;
  source?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author?: string;
  tags: string[];
  category: string;
  source?: string;
}