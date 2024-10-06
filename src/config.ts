const buildConfig = () => {
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
  if (!blogId) throw new Error('NEXT_PUBLIC_BLOG_ID is missing');
  const name = process.env.NEXT_PUBLIC_BLOG_DISPLAY_NAME || '';
  const copyright = process.env.NEXT_PUBLIC_BLOG_COPYRIGHT || '';
  const defaultTitle = process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE || '';
  const defaultDescription = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || '';
  const gaTrackingId = process.env.NEXT_PUBLIC_GOOGLE_ID || '';
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '';

  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    blog: {
      name,
      copyright,
      metadata: {
        title: {
          absolute: defaultTitle,
          default: defaultTitle,
          template: `%s - ${defaultTitle}`,
        },
        description:
          'Somos apaixonados por informação, e criamos este blog com um propósito simples: centralizar as notícias mais interessantes em um único lugar. Sabe aquele momento em que você quer ficar por dentro de tudo, mas não tem paciência para abrir mil abas? A gente te entende! Foi pensando nisso que decidimos reunir em um só espaço tudo o que é relevante, curioso e que vai fazer você pensar: "Por que ninguém me contou isso antes?"',
      },
    },
    ogImageSecret:
      process.env.OG_IMAGE_SECRET ||
      'secret_used_for_signing_and_verifying_the_og_image_url',
    wisp: {
      blogId,
    },
    gtag: gaTrackingId,
    clarity: clarityId,
  };
};

export const config = buildConfig();
