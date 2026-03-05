'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  FolderTree,
  LayoutDashboard,
  PackageSearch,
  PlaneTakeoff,
  Users,
  TrendingUp,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: PackageSearch,
  },
  {
    title: 'Categories',
    url: '/admin/categories',
    icon: FolderTree,
  },
  {
    title: 'Featured Items',
    url: '/admin/featured',
    icon: TrendingUp,
  },
  {
    title: 'Users & Orders',
    url: '/admin/users', // Example, can be built later
    icon: Users,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const itemsWithActiveState = navItems.map((item) => ({
    ...item,
    active: pathname.startsWith(item.url),
  }));

  return (
    <Sidebar
      collapsible='offcanvas'
      variant='floating'
      {...props}
    >
      {/* Header - Always visible */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href='/admin/dashboard'
                className='h-12 flex items-center justify-center gap-3 bg-primary/10 text-primary hover:bg-primary/20 transition-colors rounded-xl'
              >
                <PlaneTakeoff className='size-5' />
                <span className='text-base font-bold'>Admin Panel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className='mt-5'>
        <NavMain items={itemsWithActiveState} />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        {status === 'loading' ? (
          <div className='flex items-center gap-3 px-3 py-2'>
            <div className='h-10 w-10 rounded-lg bg-muted animate-pulse' />
            <div className='grid flex-1 gap-1'>
              <div className='h-4 bg-muted rounded animate-pulse' />
              <div className='h-3 bg-muted rounded animate-pulse w-32' />
            </div>
          </div>
        ) : session?.user ? (
          <NavUser
            user={{
              name: session.user.name || 'Admin',
              email: session.user.email || '',
              avatar: session.user.image || '',
            }}
          />
        ) : (
          <div className='p-2'>
            <SidebarMenuButton asChild>
              <Link href='/login'>Sign In</Link>
            </SidebarMenuButton>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
