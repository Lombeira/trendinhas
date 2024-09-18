'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { config } from '@/config';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';
import { SearchPosts } from './SearchPosts';

interface MenuItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
}

const menuItems: MenuItem[] = [
  { name: 'Notícias', href: '/' },
  { name: 'Palavras-chave', href: '/tag' },
  { name: 'Sobre', href: '/about' },
];

export const Navigation: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <nav>
      <div className='hidden md:flex items-center'>
        {menuItems.map((item) => (
          <div key={item.href} className='ml-4 md:ml-8'>
            <a
              href={item.href}
              target={item.openInNewTab ? '_blank' : '_self'}
              className={cn(
                'hover:text-gray-600 transition-all',
                pathname === item.href && 'font-semibold'
              )}
            >
              {item.name}
            </a>
          </div>
        ))}
      </div>
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger>
            <Menu size='24' />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.openInNewTab ? '_blank' : '_self'}
                    className={cn(
                      'block py-2 hover:text-gray-600 transition-all',
                      pathname === item.href && 'font-semibold'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export const Header: FunctionComponent = () => {
  return (
    <header className='flex flex-col mt-8 mb-8 md:mt-12 md:mb-12 transition-all'>
      <div className='flex items-center justify-between'>
        <Link href='/'>
          <h1 className='text-3xl md:text-5xl font-bold tracking-tighter leading-tight'>
            {config.blog.name}
          </h1>
        </Link>

        <div className='hidden w-72 md:hidden lg:flex'>
          <SearchPosts />
        </div>

        <Navigation />
      </div>
      <div className='flex mt-2 w-64 md:flex lg:hidden md:mt-4'>
        <SearchPosts />
      </div>
    </header>
  );
};
