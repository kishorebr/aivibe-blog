import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/api';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai-automation-blog.vercel.app';
  
  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
  
  // Post routes
  const posts = getAllPosts();
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  // Category routes
  const categories = getAllCategories();
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
  
  // Tag routes
  const tags = getAllTags();
  const tagRoutes = tags.map((tag) => ({
    url: `${baseUrl}/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));
  
  return [...routes, ...postRoutes, ...categoryRoutes, ...tagRoutes];
}