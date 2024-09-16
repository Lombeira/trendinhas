import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';
import Markdown from 'react-markdown';

const content = `# Sobre nós


Ei! Bem-vindo ao nosso cantinho de notícias, onde o café nunca esfria e as novidades não param de chegar. 😄

Somos apaixonados por informação, e criamos este blog com um propósito simples: centralizar as notícias mais interessantes em um único lugar. Sabe aquele momento em que você quer ficar por dentro de tudo, mas não tem paciência para abrir mil abas? A gente te entende! Foi pensando nisso que decidimos reunir em um só espaço tudo o que é relevante, curioso e que vai fazer você pensar: "Por que ninguém me contou isso antes?"

Aqui, você vai encontrar de tudo um pouco – de tecnologia a entretenimento, de cultura pop a fatos curiosos, passando por aquelas notícias que fazem o seu dia ser mais interessante. Tudo sem enrolação, direto ao ponto, mas com aquele toque leve e descontraído que a gente adora.

Nosso objetivo? Tornar o ato de se informar algo divertido, prático e, claro, cheio de conteúdo de qualidade. Não importa se você é um viciado em notícias ou só quer saber o que está rolando de mais importante no mundo, estamos aqui para facilitar sua vida.

Então, fique à vontade, navegue pelo site, e se prepare para descobrir o que está acontecendo de mais interessante por aí – tudo num só lugar!

Com amor,

Trendinhas`;

export async function generateMetadata() {
  return {
    title: 'Sobre nós',
    description: 'Notícias diversas sobre o brasil e o mundo.',
    openGraph: {
      title: 'Sobre nós',
      description: 'Notícias diversas sobre o brasil e o mundo.',
      images: [
        signOgImageUrl({
          title: 'Trendinhas',
          label: 'Sobre nós',
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className='container mx-auto px-5'>
      <Header />
      <div className='prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content'>
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
