import { ThemeProvider } from '@/components/theme-provider';
import { config } from '@/config';
import { signOgImageUrl } from '@/lib/og-image';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from './GoogleAnalytics';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
      {/* google-site-verification */}
      <meta
        name='google-site-verification'
        content='RZZknuDz2BTh3-pKGGmx5zJoqaQB9zPoXsaWlU8xTMg'
      />
      <GoogleAnalytics />
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
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
