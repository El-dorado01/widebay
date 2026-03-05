// app/admin/layout.tsx
'use client';

import { AdminSidebar } from '@/components/admin-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={{ '--sidebar-width': '17rem' } as React.CSSProperties}
    >
      <AdminSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-4 border-b px-6 bg-background'>
          <SidebarTrigger className='-ml-1' />
          <div className='flex flex-1 items-center justify-between'>
            <Badge
              variant='secondary'
              className='bg-primary/10 text-primary border-primary/20'
            >
              Administrator Mode
            </Badge>

            <Button
              asChild
              variant='ghost'
              size='sm'
              className='gap-2'
            >
              <Link href='/dashboard'>
                <ArrowLeft className='size-4' />
                Back to Store
              </Link>
            </Button>
          </div>
        </header>

        <div className='p-6'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
