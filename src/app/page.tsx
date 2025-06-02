import { getAllPosts, getAllCategories, getAllTags } from '@/lib/api';
import PostCard from '@/components/PostCard';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-2 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">AI-Powered Insights</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
              Welcome to AIVibe
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover how AI and automation are transforming everyday life. From smart homes to productivity tools, 
              we bring you the latest insights and practical guides to help you embrace the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="#latest-posts"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  Explore Articles
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/categories"
                className="group border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                Browse Categories
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">{posts.length}+</div>
                <div className="text-gray-600">Expert Articles</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">{categories.length}+</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">AI Updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section id="latest-posts" className="container mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay ahead with our curated collection of AI and automation articles
          </p>
        </div>
        
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No posts found</h3>
            <p className="text-gray-600 text-lg">
              Check back soon for the latest content on AI and automation!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/posts"
                className="group inline-flex items-center bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Articles
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Categories and Tags */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Categories */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Explore Categories</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="space-y-4">
                {categories.length === 0 ? (
                  <div className="text-gray-500 text-center py-8">No categories found</div>
                ) : (
                  categories.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group flex justify-between items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-blue-200"
                    >
                      <span className="text-gray-800 group-hover:text-blue-600 transition-colors font-medium text-lg">
                        {category}
                      </span>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {posts.filter(post => post.category === category).length}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Tags */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Trending Topics</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex flex-wrap gap-3">
                {tags.length === 0 ? (
                  <span className="text-gray-500 text-center py-8 w-full">No tags found</span>
                ) : (
                  tags.slice(0, 12).map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 px-4 py-2 rounded-full hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300 border border-gray-200 hover:border-transparent font-medium"
                    >
                      #{tag}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Newsletter */}
      <section className="container mx-auto px-4 mb-20">
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Newsletter</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Ahead of the AI Curve</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Subscribe to our newsletter and receive the latest insights on AI and automation
              for everyday life, delivered straight to your inbox every week.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterSubscription />
            </div>
          </div>
        </div>
      </section>

      {/* Email Us */}
      <section className="container mx-auto px-4 mb-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-200 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Get in Touch</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Have questions, suggestions, or want to share your AI automation story? 
              We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3 text-gray-700">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-lg font-medium">Email Us:</span>
              </div>
              <a 
                href="mailto:aivibetrue@gmail.com"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3"
              >
                <span>aivibetrue@gmail.com</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
