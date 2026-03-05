// app/dashboard/layout.tsx
import { AppSidebar } from '@/components/app-sidebar';
import { SearchForm } from '@/components/search-form';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={{ '--sidebar-width': '16rem' } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <header className='flex border-b h-16 shrink-0 items-center justify-center md:justify-between gap-2 px-4'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1 hover:bg-sidebar-accent' />
          </div>
          <SearchForm className='w-full text-white!' />
        </header>
        <main className='flex-1 w-full'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
