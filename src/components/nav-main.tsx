'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    active?: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu className='space-y-1'>
          {items.map((item) => (
            <SidebarMenuItem
              className='h-12'
              key={item.title}
            >
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`h-full transition-all duration-200 ${
                  item.active
                    ? 'bg-accent text-white hover:bg-accent hover:text-white shadow-sm'
                    : 'text-sidebar-foreground hover:bg-accent hover:text-white'
                }`}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon className='ml-1 mr-2 size-5!' />}
                  <span className='font-medium'>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
