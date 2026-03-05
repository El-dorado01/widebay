import { Heart, Settings, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IconArrowBack } from '@tabler/icons-react';

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: 'heart' | 'settings' | 'construction';
  backLink?: string;
  backText?: string;
}

const iconMap = {
  heart: Heart,
  settings: Settings,
  construction: Construction,
};

export default function ComingSoon({
  title,
  description,
  icon = 'construction',
  backLink = '/dashboard',
  backText = 'Back to Dashboard',
}: ComingSoonProps) {
  const Icon = iconMap[icon];

  return (
    <div className='flex flex-col items-center justify-center flex-1 min-h-[85vh] p-8 text-center'>
      {/* Icon badge */}
      <div className='relative mb-8'>
        <div className='absolute inset-0 bg-accent/15 blur-2xl rounded-full scale-150' />
        <div className='relative bg-sidebar border-2 border-dashed border-accent/30 rounded-3xl p-8 shadow-lg'>
          <Icon
            className='size-12 text-accent mx-auto'
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Badge */}
      <span className='inline-flex items-center gap-1.5 bg-accent/10 text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-accent/20'>
        <Construction className='size-3' />
        Under Construction
      </span>

      <h1 className='text-3xl font-bold tracking-tight mb-3'>{title}</h1>
      <p className='text-muted-foreground text-base max-w-sm leading-relaxed mb-8'>
        {description}
      </p>

      <Button
        asChild
        variant='outline'
        className='h-11 px-6 rounded-xl border-2'
      >
        <Link href={backLink}>
          {' '}
          <IconArrowBack className='size-4' /> {backText}
        </Link>
      </Button>
    </div>
  );
}
