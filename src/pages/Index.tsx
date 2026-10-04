import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Marquee } from "@/components/Marquee";
import { DashboardCards } from "@/components/DashboardCards";
import { SearchFilterBar } from "@/components/SearchFilterBar";
import { VideoGrid } from "@/components/VideoGrid";
import { videos } from "@/data/videos";

const Index = () => {
  const [viewMode, setViewMode] = useState<'theater' | 'drive-in'>('theater');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'oldest' | 'newest'>('oldest');
  const [category, setCategory] = useState<'all' | 'foundation' | 'prequel'>('all');

  const filtered = useMemo(() => {
    let list = videos;
    if (category !== 'all') list = list.filter((v) => v.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((v) => v.title.toLowerCase().includes(q));
    }
    if (sort === 'newest') list = [...list].reverse();
    return list;
  }, [search, sort, category]);

  return (
    <SidebarProvider>
      <Helmet>
        <link rel="canonical" href="https://retrocinemafutureready.lovable.app/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Future Ready Playlist",
          itemListElement: videos.map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "VideoObject",
              name: v.title,
              thumbnailUrl: `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`,
              contentUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
              embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
              uploadDate: "2024-01-01",
            },
          })),
        })}</script>
      </Helmet>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border px-2">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          </header>

          <Marquee />

          <main className="flex-1 p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <h1 className="font-display text-3xl md:text-5xl font-black text-center tracking-wider text-neon-pink glow-pink animate-fade-up" style={{ lineHeight: '1.1' }}>
              FUTURE READY PLAYLIST
            </h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto text-sm md:text-base animate-fade-up">
              The complete Future Ready video series by Dr. Gee — 36 Prequel episodes
              and 21 Foundation episodes covering mindset, wellness, and building a
              life on your own terms. Browse, search, and watch the full collection.
            </p>

            <DashboardCards viewMode={viewMode} onViewModeChange={setViewMode} />
            <SearchFilterBar
              search={search} onSearchChange={setSearch}
              sort={sort} onSortChange={setSort}
              category={category} onCategoryChange={setCategory}
            />
            <VideoGrid videos={filtered} viewMode={viewMode} />
          </main>

          <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
            © 2026 Future Ready
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
