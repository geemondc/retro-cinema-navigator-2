'use client'

import {
  Link as LinkIcon,
  Stethoscope,
  ShoppingCart,
  Compass,
  CalendarCheck,
  Clapperboard,
} from 'lucide-react';

const footerLinks = [
  { href: "https://ready-future-hub-life.lovable.app/", label: "Future Ready Link Hub" },
  { href: "https://dr-gee-advice-hub.lovable.app/", label: "The Dr. Recommends" },
  { href: "https://www.etsy.com/shop/FutureReadyShop", label: "Etsy Shop" },
  { href: "https://www.futurereadydiscoveries.com", label: "Future Ready Discoveries" },
  { href: "https://www.futurereadyownyourday.com", label: "Own Your Day" },
  { href: "https://studio--cinematic-ndr9p.us-central1.hosted.app/", label: "CineMatic" },
];

export default function Footer() {
  return (
    <footer className="bg-background/50 border-t border-white/10 backdrop-blur-sm p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="text-center text-xs text-muted-foreground mt-6 pt-6 border-t border-white/10">
          &copy; {new Date().getFullYear()} RetroCinema Navigator. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
