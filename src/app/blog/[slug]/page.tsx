import { BlogPostContent } from '@/components/BlogPostContent';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RelatedPosts } from '@/components/RelatedPosts';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';
import { wisp } from '@/lib/wisp';
import { notFound } from 'next/navigation';
import type { NewsArticle, WithContext } from 'schema-dts';

export async function generateMetadata({
  params: { slug },
}: {
  params: Params;
}) {
  const result = await wisp.getPost(slug);
  if (!result || !result.post) {
    return {
      title: 'Blog post not found',
    };
  }

  const { title, description, image } = result.post;
  const generatedOgImage = signOgImageUrl({ title, brand: config.blog.name });

  return {
    title,
    description,
    url: `${config.baseUrl}/blog/${slug}`,
    openGraph: {
      title,
      description,
      images: image ? [generatedOgImage, image] : [generatedOgImage],
      url: `${config.baseUrl}/blog/${slug}`,
    },
  };
}

interface Params {
  slug: string;
}

const Page = async ({ params: { slug } }: { params: Params }) => {
  const result = await wisp.getPost(slug);
  const { posts } = await wisp.getRelatedPosts({ slug, limit: 3 });

  if (!result || !result.post) {
    return notFound();
  }

  const { title, publishedAt, updatedAt, image, author, tags } = result.post;

  const jsonLd: WithContext<NewsArticle> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    image: image ? image : undefined,
    datePublished: publishedAt ? publishedAt.toString() : undefined,
    dateModified: updatedAt.toString(),
    author: {
      '@type': 'Person',
      name: author.name || 'Redator Trendinhas',
      url: 'https://www.trendinhas.com.br/',
    },
    publisher: {
      '@type': 'Organization',
      name: title,
      logo: {
        '@type': 'ImageObject',
        url: image ? image : undefined,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${config.baseUrl}/blog/${slug}`,
      },
    },
  };

  return (
    <>
      <meta
        name='news_keywords'
        content={tags.map((tag) => tag.name).join(', ')}
      ></meta>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='container mx-auto px-5'>
        <Header />
        <BlogPostContent post={result.post} />
        <RelatedPosts posts={posts} />
        <Footer />
      </div>
    </>
  );
};

export default Page;
