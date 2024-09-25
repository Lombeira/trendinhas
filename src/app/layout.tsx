import { ThemeProvider } from '@/components/theme-provider';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

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
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      <link rel="icon" href="/favicon-32x32.png" />
      {/* google-site-verification */}
      <meta
        name='google-site-verification'
        content='RZZknuDz2BTh3-pKGGmx5zJoqaQB9zPoXsaWlU8xTMg'
      />
      <meta
        name='google-adsense-account'
        content='ca-pub-4531969799798016'
      ></meta>
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
          <Analytics />
          <SpeedInsights />
          <Script id='clarity-script' strategy='afterInteractive'>
            {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${config.clarity}");
          `}
          </Script>
          <Script
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=${config.gtag}`}
          />
          <Script
            id='gtag-init'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.gtag}', {
            page_path: window.location.pathname,
            });
          `,
            }}
          />
          <Script
            charSet='UTF-8'
            src='https://cdn.sendwebpush.com/sendwebpush/client_services/66ecb24ebb17a.js'
            strategy='afterInteractive'
          ></Script>
        </ThemeProvider>
      </body>
    </html>
  );
}
