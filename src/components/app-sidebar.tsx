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
  CogIcon,
  DroneIcon,
  HeartIcon,
  HomeIcon,
  PlaneTakeoff,
  ShoppingBag,
  ShoppingCartIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: HomeIcon,
  },
  {
    title: 'All Products',
    url: '/dashboard/products',
    icon: DroneIcon,
  },
  {
    title: 'My Cart',
    url: '/dashboard/cart',
    icon: ShoppingCartIcon,
  },
  {
    title: 'My Orders',
    url: '/dashboard/orders',
    icon: ShoppingBag,
  },
  {
    title: 'Saved Items',
    url: '/dashboard/saved',
    icon: HeartIcon,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: CogIcon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const itemsWithActiveState = navItems.map((item) => ({
    ...item,
    active:
      item.url === '/dashboard' || item.url === '/'
        ? pathname === item.url
        : pathname.startsWith(item.url),
  }));

  // Sidebar header and main nav always render immediately
  return (
    <Sidebar
      collapsible='offcanvas'
      {...props}
    >
      {/* Header - Always visible */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href='/'
                className='h-12 flex items-center justify-center gap-3'
              >
                <PlaneTakeoff className='size-5!' />
                <span className='text-base font-semibold'>Widebay Drones</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation - Always visible */}
      <SidebarContent className='mt-5'>
        <NavMain items={itemsWithActiveState} />
      </SidebarContent>

      {/* Footer - Only this part waits for session */}
      <SidebarFooter>
        {status === 'loading' ? (
          // Loading skeleton just for the user section
          <div className='flex items-center gap-3 px-3 py-2'>
            <div className='h-10 w-10 rounded-lg bg-muted animate-pulse' />
            <div className='grid flex-1 gap-1'>
              <div className='h-4 bg-muted rounded animate-pulse' />
              <div className='h-3 bg-muted rounded animate-pulse w-32' />
            </div>
          </div>
        ) : session?.user ? (
          // Authenticated user
          <NavUser
            user={{
              name: session.user.name || 'User',
              email: session.user.email || '',
              avatar: session.user.image || '',
            }}
          />
        ) : (
          // Not logged in - show Sign In button
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
