'use client';

import { Film } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';

export default function Header() {
  return (
    <header className="py-4 px-6 border-b border-white/10 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center gap-3">
        <SidebarTrigger />
        <a href="https://studio--retrocinema-navigator-20-irr41.us-central1.hosted.app/" className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
            <Film className="w-8 h-8 text-accent" />
            <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              RetroCinema Navigator 2.0
            </h1>
        </a>
      </div>
    </header>
  );
}
