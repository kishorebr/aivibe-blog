import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post, PostMeta } from './types';

// Function to strip HTML tags and create clean excerpt
function stripHtmlAndCreateExcerpt(text: string, maxLength: number = 150): string {
  // Remove HTML tags
  const withoutHtml = text.replace(/<[^>]*>/g, '');
  // Remove extra whitespace and newlines
  const cleaned = withoutHtml.replace(/\s+/g, ' ').trim();
  // Truncate to maxLength
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  return cleaned.substring(0, maxLength).trim() + '...';
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPostSlugs() {
  try {
    return fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error('Error reading post directory:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = remark()
      .use(html)
      .processSync(content)
      .toString();
    
    // Create clean excerpt from either frontmatter excerpt or content
    let cleanExcerpt = '';
    if (data.excerpt) {
      cleanExcerpt = stripHtmlAndCreateExcerpt(data.excerpt);
    } else {
      // If no excerpt in frontmatter, create one from content
      cleanExcerpt = stripHtmlAndCreateExcerpt(content);
    }

    return {
      slug: realSlug,
      title: data.title,
      date: data.date,
      excerpt: cleanExcerpt,
      content: processedContent,
      coverImage: data.coverImage || '',
      author: data.author || 'AIVibe',
      tags: data.tags || [],
      category: data.category || 'General',
      source: data.source || '',
    };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  try {
    const slugs = getPostSlugs();
    const posts = slugs
      .map((slug) => {
        const realSlug = slug.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, slug);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Create clean excerpt from either frontmatter excerpt or content
        let cleanExcerpt = '';
        if (data.excerpt) {
          cleanExcerpt = stripHtmlAndCreateExcerpt(data.excerpt);
        } else {
          // If no excerpt in frontmatter, create one from content
          cleanExcerpt = stripHtmlAndCreateExcerpt(content);
        }
        
        return {
          slug: realSlug,
          title: data.title,
          date: data.date,
          excerpt: cleanExcerpt,
          coverImage: data.coverImage || '',
          author: data.author || 'AIVibe',
          tags: data.tags || [],
          category: data.category || 'General',
          source: data.source || '',
        };
      })
      .sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));
    
    return posts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export function getPostsByTag(tag: string): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categoriesSet = new Set<string>();
  
  posts.forEach(post => {
    categoriesSet.add(post.category);
  });
  
  return Array.from(categoriesSet);
}