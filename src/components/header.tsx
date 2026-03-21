
'use client';

import { Film } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';

export default function Header() {
  const homeUrl = "https://studio--retrocinema-navigator-20-irr41.us-central1.hosted.app/";
  
  return (
    <header className="py-4 px-6 border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center gap-3">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="hover:text-accent transition-colors" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:block">Toggle Menu</span>
        </div>
        <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block" />
        <a href={homeUrl} className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
            <Film className="w-8 h-8 text-accent shrink-0" />
            <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              RetroCinema Navigator 2.0
            </h1>
        </a>
      </div>
    </header>
  );
}
