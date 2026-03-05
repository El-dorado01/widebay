import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function RootNotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background'>
      <div className='mb-8'>
        <h1 className='text-9xl font-black text-accent/10 absolute -translate-y-1/2 left-1/2 -translate-x-1/2 select-none'>
          404
        </h1>
        <div className='relative'>
          <h2 className='text-5xl font-bold mb-4 relative z-10'>Whoops!</h2>
          <p className='text-muted-foreground text-xl max-w-md mx-auto relative z-10'>
            We couldn't find the page you were looking for.
          </p>
        </div>
      </div>

      <Button
        asChild
        size='lg'
        className='bg-accent hover:bg-accent/90 text-white px-8 h-14 text-lg rounded-full shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95'
      >
        <Link href='/'>
          <Home className='mr-2 size-5' />
          Return to Homepage
        </Link>
      </Button>
    </div>
  );
}
