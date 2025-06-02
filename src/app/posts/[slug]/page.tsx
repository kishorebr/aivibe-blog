import { getPostBySlug, getAllPosts } from '@/lib/api';
import { formatDate, getReadingTime } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  // Need to await params in Next.js App Router
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author || 'AI Automation Blog' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'AI Automation Blog'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  // Need to await params in Next.js App Router
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const readingTime = getReadingTime(post.content);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>{formatDate(post.date)}</span>
            <span className="mx-2">•</span>
            <span>{readingTime} min read</span>
            <span className="mx-2">•</span>
            <Link 
              href={`/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-blue-600 hover:underline"
            >
              {post.category}
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          
          {post.author && (
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold mr-3">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
          )}
          
          {post.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}
        </header>
        
        {/* Post Content */}
        <div 
          className="prose prose-lg max-w-none mb-8 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
        
        {/* Source Link */}
        {post.source && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              <span className="font-medium">Source:</span>{' '}
              <a 
                href={post.source} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {post.source}
              </a>
            </p>
          </div>
        )}
        
        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Home
          </Link>
          <Link
            href="/posts"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </article>
    </div>
  );
}