import { getAllPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts - AIVibe',
  description: 'Browse all AI and automation articles on AIVibe. Discover insights, tools, and trends that transform everyday life.',
  keywords: 'ai posts, automation articles, artificial intelligence, aivibe blog',
};

export default function AllPostsPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">All Posts</h1>
        <p className="text-gray-600">
          Explore all our articles about AI and automation for everyday life.
        </p>
      </header>
      
      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-4">
            Check back soon for the latest content on AI and automation!
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 text-gray-600">
            Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </>
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