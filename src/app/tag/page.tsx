import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';
import { wisp } from '@/lib/wisp';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: 'Tags',
    description: 'Diferentes categorias das nossas matérias',
    openGraph: {
      title: 'Tags',
      description: 'Diferentes categorias das nossas matérias',
      images: [
        signOgImageUrl({
          title: 'Blog Post Categories',
          brand: config.blog.name,
        }),
      ],
    },
  };
}

export default async function Page() {
  const result = await wisp.getTags();

  return (
    <div className='container mx-auto px-5'>
      <Header />
      <div className='mt-20 mb-12 text-center'>
        <h1 className='mb-2 text-4xl font-bold'>Palavras chave</h1>
        <p className='text-lg opacity-50'>Lista de todas as tags</p>
      </div>
      <div className='my-10 max-w-6xl text-balance text-center text-xl mb-48'>
        {result.tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/tag/${tag.name}`}
            className='text-primary mr-2 inline-block'
          >
            #{tag.name}
          </Link>
        ))}
      </div>
      {/* <div className='group w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
        <ul className='flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none group-hover:animate-none animate-infinite-scroll-reverse'>
          {result.tags.map((tag) => (
            <li key={tag.id}>
              <Link
                href={`/tag/${tag.name}`}
                className='text-primary mr-2 inline-block'
              >
                #{tag.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul
          className='flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none group-hover:animate-none animate-infinite-scroll-reverse'
          aria-hidden='true'
        >
          {result.tags.map((tag) => (
            <li key={tag.id}>
              <Link
                href={`/tag/${tag.name}`}
                className='text-primary mr-2 inline-block'
              >
                #{tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>  */}

      <Footer />
    </div>
  );
}
