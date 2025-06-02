'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PostMeta } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
      {post.coverImage && (
        <div className="h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 w-full h-full"></div>
            </div>
          )}
          <img
            src={imageError ? 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format' : post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageLoading ? 'none' : 'block' }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(post.date)}</span>
          </div>
          <Link 
            href={`/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
          >
            {post.category}
          </Link>
        </div>
        <h2 className="text-xl font-bold mb-3 leading-tight">
          <Link href={`/posts/${post.slug}`} className="text-gray-800 hover:text-blue-600 transition-colors group-hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-200"
            >
              #{tag}
            </Link>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-400 px-2 py-1">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors group-hover:translate-x-1 transform duration-200"
        >
          Read Article
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}