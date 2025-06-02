import { getPostsByCategory, getAllCategories } from '@/lib/api';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  // Need to await params in Next.js App Router
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;
  const category = categorySlug.replace(/-/g, ' ');
  const formattedCategory = category
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: `${formattedCategory} - AIVibe`,
    description: `Discover the latest ${formattedCategory.toLowerCase()} AI insights and automation trends on AIVibe.`,
    keywords: `${category}, ai, automation, artificial intelligence, aivibe`,
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Need to await params in Next.js App Router
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;
  const category = categorySlug.replace(/-/g, ' ');
  
  const formattedCategory = category
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const posts = getPostsByCategory(formattedCategory);
  
  if (posts.length === 0) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">{formattedCategory}</h1>
        <p className="text-gray-600">
          Explore articles about {formattedCategory.toLowerCase()} in AI and automation for everyday life.
        </p>
      </header>
      
      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-4">
            There are currently no posts in this category.
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
      
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}