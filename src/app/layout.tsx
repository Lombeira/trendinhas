import { ThemeProvider } from '@/components/theme-provider';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { GoogleScripts } from '@/components/scripts/GoogleScripts';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    absolute: config.blog.metadata.title.absolute,
    default: config.blog.metadata.title.default,
    template: config.blog.metadata.title.template,
  },
  description: config.blog.metadata.description,
  openGraph: {
    title: config.blog.metadata.title.default,
    description: config.blog.metadata.description,
    images: [
      signOgImageUrl({
        title: config.blog.name,
      }),
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      {/* google-site-verification */}
      <meta
        name='google-site-verification'
        content='RZZknuDz2BTh3-pKGGmx5zJoqaQB9zPoXsaWlU8xTMg'
      />
      {/* Script async do Google Tag Manager */}
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-9W2W432781'
        strategy='afterInteractive'
      />
      {/* Script de inicialização do Google Analytics */}
      <Script id='gtag-init' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-9W2W432781');
        `}
      </Script>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased max-w-6xl m-auto',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
