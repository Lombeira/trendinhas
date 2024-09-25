import { BlogPostsPreview } from '@/components/BlogPostPreview';
import { BlogPostsPagination } from '@/components/BlogPostsPagination';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { wisp } from '@/lib/wisp';

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const result = await wisp.getPosts({ limit: 6, page });
  const shouldPaginate = result.pagination.totalPages > 1;

  return (
    <div className='container mx-auto px-5 mb-10'>
      <meta
        name='description'
        content='Somos apaixonados por informação, e criamos este blog com um propósito simples: centralizar as notícias mais interessantes em um único lugar. Sabe aquele momento em que você quer ficar por dentro de tudo, mas não tem paciência para abrir mil abas? A gente te entende! Foi pensando nisso que decidimos reunir em um só espaço tudo o que é relevante, curioso e que vai fazer você pensar: "Por que ninguém me contou isso antes?"'
      ></meta>
      <Header />
      <BlogPostsPreview posts={result.posts} />
      {shouldPaginate && <BlogPostsPagination pagination={result.pagination} />}
      <Footer />
    </div>
  );
};

export default Page;
