"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CogIcon, DroneIcon, HeartIcon, HomeIcon, PlaneTakeoff, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: HomeIcon,
      active: true,
    },
    {
      title: "All Products",
      url: "#",
      icon: DroneIcon,
    },
    {
      title: "My Cart",
      url: "#",
      icon: ShoppingCartIcon,
    },
    {
      title: "Saved Items",
      url: "#",
      icon: HeartIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: CogIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="#" className="h-10 flex items-center justify-center gap-2">
                <PlaneTakeoff className="size-5!" />
                <span className="text-base font-semibold">Widebay Drones</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
