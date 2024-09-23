'use client';
import { cn } from '@/lib/utils';
import { GetPostsResult } from '@/lib/wisp';
import { formatDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Badge } from './ui/badge';

export const BlogPostPreview: FunctionComponent<{
  post: GetPostsResult['posts'][0];
  index: number;
}> = ({ post, index }) => {
  return (
    <div className='flex flex-col break-words shadow-lg rounded-b-xl hover:scale-[1.02] transition-transform'>
      <Link href={`/blog/${post.slug}`}>
        <div className='aspect-[16/9] relative'>
          <Image
            alt={post.title}
            className='object-cover rounded-t-xl'
            src={post.image || '/images/placeholder.webp'}
            blurDataURL='/images/placeholder.webp'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw'
            fill
            priority={index === 0}
          />
        </div>
      </Link>
      <div className='grid h-full grid-cols-1 gap-3 md:col-span-2 mt-4 p-4 cursor-pointer'>
        <h2 className='font-sans font-semibold tracking-tighter text-primary text-xl md:text-2xl'>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className='prose lg:prose-lg italic tracking-tighter text-muted-foreground'>
          {formatDate(
            post.publishedAt || post.updatedAt,
            "dd 'de' MMMMMMM ',' yyyy",
            {
              locale: ptBR,
            }
          )}
        </div>
        <div className='prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground'>
          {post.description}
        </div>
        <div className='text-sm text-muted-foreground self-end'>
          {post.tags.map((tag) => (
            <div key={tag.id} className='mr-2 inline-block'>
              <Link href={`/tag/${tag.name}`}>
                <Badge className='min-h-6'>#{tag.name}</Badge>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlogPostsPreview: FunctionComponent<{
  posts: GetPostsResult['posts'];
  className?: string;
}> = ({ posts, className }) => {
  return (
    <div
      className={cn(
        'grid md:min-h-[70vh] grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2 md:my-16 my-8',
        className
      )}
    >
      {posts.map((post, index) => (
        <BlogPostPreview index={index} key={post.id} post={post} />
      ))}
    </div>
  );
};
