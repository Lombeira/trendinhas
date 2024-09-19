import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';
import { wisp } from '@/lib/wisp';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: 'Tags',
    description: 'Diferentes categorias das nossas matérias',
    url: `${config.baseUrl}/tag`,
    openGraph: {
      title: 'Tags',
      description: 'Diferentes categorias das nossas matérias',
      url: `${config.baseUrl}/tag`,
      images: [
        signOgImageUrl({
          title: 'Tags',
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
        <h1 className='mb-2 text-3xl md:text-4xl font-bold'>Palavras chave</h1>
        <p className='text-lg opacity-50'>Lista de todas as tags</p>
      </div>
      <div className='group py-2 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
        <ul className='flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none group-hover:[animation-play-state:paused] animate-infinite-scroll-reverse'>
          {result.tags.map((tag) => (
            <li key={tag.id}>
              <Link
                href={`/tag/${tag.name}`}
                className='text-primary mr-2 inline-block text-nowrap'
              >
                <div className='bg-zinc-800 p-4 px-6 rounded flex gap-2'>
                  #{tag.name}
                  <ArrowUpRight size={16} className='self-center' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <ul
          className='flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none group-hover:[animation-play-state:paused] animate-infinite-scroll-reverse'
          aria-hidden='true'
        >
          {result.tags.map((tag) => (
            <li key={tag.id}>
              <Link
                href={`/tag/${tag.name}`}
                className='text-primary mr-2 inline-block text-nowrap'
              >
                <div className='bg-zinc-800 p-4 px-6 rounded flex gap-2'>
                  #{tag.name}
                  <ArrowUpRight size={16} className='self-center' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='group py-2 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
        <ul className='flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none group-hover:[animation-play-state:paused] animate-infinite-scroll'>
          {result.tags.map((tag) => (
            <li key={tag.id}>
              <Link
                href={`/tag/${tag.name}`}
                className='text-primary mr-2 inline-block text-nowrap'
              >
                <div className='bg-zinc-800 p-4 px-6 rounded flex gap-2'>
                  #{tag.name}
                  <ArrowUpRight size={16} className='self-center' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <ul
          className='flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none group-hover:[animation-play-state:paused] animate-infinite-scroll'
          aria-hidden='true'
        >
          {result.tags.map((tag) => (
            <li key={tag.id}>
              <Link
                href={`/tag/${tag.name}`}
                className='text-primary mr-2 inline-block text-nowrap'
              >
                <div className='bg-zinc-800 p-4 px-6 rounded flex gap-2'>
                  #{tag.name}
                  <ArrowUpRight size={16} className='self-center' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='group py-2 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
        <ul className='flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none group-hover:[animation-play-state:paused] animate-infinite-scroll-reverse'>
          {result.tags.map((tag) => (
            <li key={tag.id}>
              <Link
                href={`/tag/${tag.name}`}
                className='text-primary mr-2 inline-block text-nowrap'
              >
                <div className='bg-zinc-800 p-4 px-6 rounded flex gap-2'>
                  #{tag.name}
                  <ArrowUpRight size={16} className='self-center' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <ul
          className='flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none group-hover:[animation-play-state:paused] animate-infinite-scroll-reverse'
          aria-hidden='true'
        >
          {result.tags.map((tag) => (
            <li key={tag.id}>
              <Link
                href={`/tag/${tag.name}`}
                className='text-primary mr-2 inline-block text-nowrap'
              >
                <div className='bg-zinc-800 p-4 px-6 rounded flex gap-2'>
                  #{tag.name}
                  <ArrowUpRight size={16} className='self-center' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
