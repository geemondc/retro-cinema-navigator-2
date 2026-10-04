import { Film, Video } from "lucide-react";

interface DashboardCardsProps {
  viewMode: 'theater' | 'drive-in';
  onViewModeChange: (mode: 'theater' | 'drive-in') => void;
}

export function DashboardCards({ viewMode, onViewModeChange }: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
      {/* Viewing Mode Card */}
      <div className="bg-card border border-border rounded-lg p-6 card-glow">
        <div className="flex items-center gap-3 mb-4">
          <Film className="h-5 w-5 text-neon-purple" />
          <h2 className="font-display text-sm tracking-wider text-muted-foreground">Viewing Mode</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onViewModeChange('theater')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all active:scale-[0.97] ${
              viewMode === 'theater'
                ? 'bg-neon-purple text-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Theater
          </button>
          <button
            onClick={() => onViewModeChange('drive-in')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all active:scale-[0.97] ${
              viewMode === 'drive-in'
                ? 'bg-neon-purple text-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Drive-In
          </button>
        </div>
      </div>

      {/* Total Videos Card */}
      <div className="bg-card border border-border rounded-lg p-6 card-glow">
        <div className="flex items-center gap-3 mb-4">
          <Video className="h-5 w-5 text-neon-purple" />
          <h2 className="font-display text-sm tracking-wider text-muted-foreground">Total Videos</h2>
        </div>
        <p className="text-4xl font-bold text-neon-purple font-display">57</p>
        <p className="text-sm text-muted-foreground mt-1">Total runtime: 5h 42m</p>
      </div>
    </div>
  );
}
