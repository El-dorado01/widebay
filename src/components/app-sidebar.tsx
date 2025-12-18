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
  ShoppingCartIcon,
} from 'lucide-react';
import Link from 'next/link';

const navMain = [
  {
    title: 'Home',
    url: '/',
    icon: HomeIcon,
    active: true,
  },
  {
    title: 'All Products',
    url: '/products',
    icon: DroneIcon,
  },
  {
    title: 'My Cart',
    url: '/cart',
    icon: ShoppingCartIcon,
  },
  {
    title: 'Saved Items',
    url: '/saved',
    icon: HeartIcon,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: CogIcon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();

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
                className='h-10 flex items-center justify-center gap-2'
              >
                <PlaneTakeoff className='size-5' />
                <span className='text-base font-semibold'>Widebay Drones</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation - Always visible */}
      <SidebarContent className='mt-5'>
        <NavMain items={navMain} />
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
