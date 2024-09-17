import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { GetPostsResult } from '@wisp-cms/client';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Link from 'next/link';
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { wisp } from '@/lib/wisp';
import { Input } from './ui/input';
import { LoaderCircle, X } from 'lucide-react';

export function SearchPosts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<GetPostsResult['posts']>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedValue] = useDebounceValue(searchTerm, 400);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    setSearchTerm(formData.get('search') as string);
    form.reset();
    const searchInput = form.querySelector(
      'input[name="search"]'
    ) as HTMLInputElement | null;

    if (searchInput) {
      searchInput.focus();
    }
  };

  const searchPosts = useCallback(async () => {
    setIsSearching(true);
    if (debouncedValue) {
      const data = await wisp.getPosts({ query: debouncedValue });
      setResults(data.posts);
    }
    setIsSearching(false);
  }, [debouncedValue]);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
    }
    searchPosts();
  }, [debouncedValue, searchPosts]);

  // Fechar Popover ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false); // Fechar Popover
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClear = () => {
    setResults([]);
    setSearchTerm('');
  };

  if (!results) {
    return null;
  }

  const hasResults = results.length > 0;

  return (
    <div className='flex items-center'>
      <form className='flex gap-2 relative' onSubmit={handleSubmit}>
        <Popover open={isPopoverOpen && hasResults}>
          <PopoverTrigger
            onClick={() => setIsPopoverOpen(true)} // Abrir Popover ao clicar
          >
            <Input
              name='search'
              value={searchTerm}
              className='relative w-72'
              placeholder='Procure matérias'
              onChange={handleChange}
            />
            {isSearching && (
              <LoaderCircle className='absolute animate-spin right-2 bottom-2' />
            )}
            {searchTerm && hasResults && (
              <X onClick={handleClear} className='absolute right-2 bottom-2' />
            )}
          </PopoverTrigger>
          <PopoverContent ref={popoverRef}>
            <ScrollArea className='h-72 rounded-md'>
              <h4 className='mb-4 text-sm font-medium leading-none'>
                Matérias com o termo:
              </h4>
              {results?.map((result) => (
                <Fragment key={result.id}>
                  <Link className='text-sm' href={`/blog/${result.slug}`}>
                    {result.title}
                  </Link>
                  <Separator className='my-2' />
                </Fragment>
              ))}
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </form>
    </div>
  );
}
