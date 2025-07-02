'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger
} from '@/components/ui/sidebar';
import {
  Link as LinkIcon,
  Stethoscope,
  ShoppingCart,
  Compass,
  CalendarCheck,
  Clapperboard,
  Film,
} from 'lucide-react';
import NextLink from 'next/link';

const links = [
  { href: "https://ready-future-hub-life.lovable.app/", label: "Future Ready Link Hub", icon: <LinkIcon /> },
  { href: "https://dr-gee-advice-hub.lovable.app/", label: "The Dr. Recommends Page", icon: <Stethoscope /> },
  { href: "https://www.etsy.com/shop/FutureReadyShop", label: "Inside/Out Sweatshirt at ETSY.COM", icon: <ShoppingCart /> },
  { href: "https://www.futurereadydiscoveries.com", label: "Future Ready Discoveries", icon: <Compass /> },
  { href: "https://www.futurereadyownyourday.com", label: "Own Your Day", icon: <CalendarCheck /> },
  { href: "https://studio--cinematic-ndr9p.us-central1.hosted.app/", label: "CineMatic", icon: <Clapperboard /> },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-2 flex items-center gap-2">
        <Film className="w-8 h-8 text-accent" />
        <div className="flex-1 group-data-[collapsible=icon]:hidden">
          <h2 className="text-lg font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            External Links
          </h2>
        </div>
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarMenu className="flex-1 p-2">
        {links.map((link) => (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton asChild tooltip={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.icon}
                <span className="truncate">{link.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </Sidebar>
  );
}
