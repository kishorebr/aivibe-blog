import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/api';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Categories - AIVibe',
  description: 'Browse all categories of AI and automation content on AIVibe. Find articles about smart home, productivity, finance, healthcare, and general AI topics.',
  keywords: 'ai categories, automation topics, smart home ai, productivity tools, ai finance, healthcare ai',
};

export default function CategoriesPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Smart Home': '🏠',
      'Productivity': '⚡',
      'Finance': '💰',
      'Healthcare': '🏥',
      'General AI': '🤖',
      'Work': '💼',
      'Tools': '🛠️',
      'Technology': '💻',
    };
    return icons[category] || '📝';
  };

  const getCategoryDescription = (category: string) => {
    const descriptions: { [key: string]: string } = {
      'Smart Home': 'Discover how AI is transforming homes with intelligent automation, voice assistants, and connected devices.',
      'Productivity': 'Boost your efficiency with AI-powered tools, automation workflows, and productivity hacks.',
      'Finance': 'Explore AI applications in personal finance, investment strategies, and financial automation.',
      'Healthcare': 'Learn about AI innovations in healthcare, medical automation, and health monitoring.',
      'General AI': 'Stay updated with the latest AI trends, research, and general artificial intelligence topics.',
      'Work': 'Transform your workplace with AI tools, automation solutions, and professional productivity tips.',
      'Tools': 'Discover the best AI tools and software to enhance your daily tasks and workflows.',
      'Technology': 'Explore cutting-edge technology trends, innovations, and their practical applications.',
    };
    return descriptions[category] || 'Explore articles in this category to learn more about AI and automation.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-2 mb-6">
            <span className="text-2xl mr-2">📚</span>
            <span className="text-sm font-medium text-gray-700">Explore Topics</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Browse Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover AI and automation content organized by topics that matter to you. 
            From smart homes to productivity tools, find exactly what you're looking for.
          </p>
        </header>

        {/* Categories Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const categoryPosts = posts.filter(post => post.category === category);
              const latestPost = categoryPosts[0];
              
              return (
                <Link
                  key={category}
                  href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    {/* Category Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-4xl">{getCategoryIcon(category)}</span>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                          {categoryPosts.length} articles
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{category}</h2>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        {getCategoryDescription(category)}
                      </p>
                    </div>

                    {/* Latest Post Preview */}
                    {latestPost && (
                      <div className="p-6">
                        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">
                          Latest Article
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {latestPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {latestPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {new Date(latestPost.date).toLocaleDateString()}
                          </span>
                          <div className="flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                            Explore
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Posts by Category */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">All Articles by Category</h2>
            <p className="text-xl text-gray-600">
              Browse through all our content organized by topic
            </p>
          </div>

          {categories.map((category) => {
            const categoryPosts = posts.filter(post => post.category === category);
            
            return (
              <div key={category} className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{getCategoryIcon(category)}</span>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800">{category}</h3>
                      <p className="text-gray-600">{categoryPosts.length} articles</p>
                    </div>
                  </div>
                  <Link
                    href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center gap-2"
                  >
                    View All
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryPosts.slice(0, 3).map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>

                {categoryPosts.length > 3 && (
                  <div className="text-center mt-8">
                    <Link
                      href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                      View {categoryPosts.length - 3} More Articles
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}