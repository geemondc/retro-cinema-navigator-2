
'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarContent
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

const homeUrl = "https://studio--retrocinema-navigator-20-irr41.us-central1.hosted.app/";

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
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4 flex items-center gap-3 border-b border-white/5 bg-black/20">
        <Film className="w-8 h-8 text-accent shrink-0" />
        <a href={homeUrl} className="flex-1 group-data-[collapsible=icon]:hidden no-underline overflow-hidden">
          <h2 className="text-lg font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent hover:opacity-80 transition-opacity whitespace-nowrap">
            External Links
          </h2>
        </a>
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild tooltip={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-6 px-4">
                  <span className="text-accent">{link.icon}</span>
                  <span className="truncate font-medium">{link.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
