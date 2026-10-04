import { Search } from "lucide-react";

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  sort: 'oldest' | 'newest';
  onSortChange: (val: 'oldest' | 'newest') => void;
  category: 'all' | 'foundation' | 'prequel';
  onCategoryChange: (val: 'all' | 'foundation' | 'prequel') => void;
}

export function SearchFilterBar({
  search, onSearchChange, sort, onSortChange, category, onCategoryChange,
}: SearchFilterBarProps) {
  const tabs: { label: string; value: 'all' | 'foundation' | 'prequel' }[] = [
    { label: 'All Videos', value: 'all' },
    { label: 'Foundation Videos', value: 'foundation' },
    { label: 'Prequel Videos', value: 'prequel' },
  ];

  return (
    <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <label htmlFor="video-search" className="sr-only">Search videos by title</label>
          <input
            id="video-search"
            type="text"
            aria-label="Search videos by title"
            placeholder="Search by title... (e.g. Future Ready)"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
        <label htmlFor="video-sort" className="sr-only">Sort videos</label>
        <select
          id="video-sort"
          aria-label="Sort videos"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as 'oldest' | 'newest')}
          className="bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="oldest">Oldest First</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onCategoryChange(tab.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all active:scale-[0.97] ${
              category === tab.value
                ? 'bg-neon-purple text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
