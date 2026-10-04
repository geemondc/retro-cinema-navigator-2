import { Film, Link2, Stethoscope, ShoppingBag, Compass, Sun } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Future Ready Link Hub", url: "/", icon: Link2 },
  { title: "The Dr. Recommends Page", url: "/recommends", icon: Stethoscope },
  { title: "Inside/Out Sweatshirt at ETSY.COM", url: "https://etsy.com", icon: ShoppingBag, external: true },
  { title: "Future Ready Discoveries", url: "/discoveries", icon: Compass },
  { title: "Own Your Day", url: "/own-your-day", icon: Sun },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="pt-6">
        <div className="flex items-center gap-3 px-4 mb-8">
          <Film className="h-8 w-8 text-primary shrink-0" />
          {!collapsed && (
            <span className="font-display text-sm font-bold text-primary tracking-wider">
              RetroCinema Navigator
            </span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.external ? (
                      <a
                        href={item.url}
                        aria-label={item.title}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {collapsed ? (
                          <span className="sr-only">{item.title}</span>
                        ) : (
                          <span className="text-sm">{item.title}</span>
                        )}
                      </a>
                    ) : (
                      <NavLink
                        to={item.url}
                        end
                        aria-label={item.title}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                        activeClassName="bg-sidebar-accent text-primary font-medium"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {collapsed ? (
                          <span className="sr-only">{item.title}</span>
                        ) : (
                          <span className="text-sm">{item.title}</span>
                        )}
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
