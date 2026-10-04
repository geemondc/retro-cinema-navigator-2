import { Eye, Clock } from "lucide-react";
import type { Video } from "@/data/videos";

interface VideoGridProps {
  videos: Video[];
  viewMode: 'theater' | 'drive-in';
}

export function VideoGrid({ videos, viewMode }: VideoGridProps) {
  const isTheater = viewMode === 'theater';

  return (
    <div
      className={`grid gap-4 animate-fade-up ${
        isTheater
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      }`}
      style={{ animationDelay: '0.3s' }}
    >
      {videos.map((video) => (
        <a
          key={video.id}
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:card-glow-hover hover:border-primary/30 active:scale-[0.98]"
        >
          <div className="relative aspect-video overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute bottom-2 right-2 bg-background/80 text-xs px-2 py-0.5 rounded font-medium backdrop-blur-sm">
              {video.duration}
            </span>
          </div>
          <div className={`p-3 ${isTheater ? 'p-4' : 'p-2'}`}>
            <h2 className={`font-semibold text-foreground truncate ${isTheater ? 'text-sm' : 'text-xs'}`}>
              {video.title}
            </h2>
            <div className={`flex items-center gap-3 mt-1.5 text-muted-foreground ${isTheater ? 'text-xs' : 'text-[10px]'}`}>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {video.views}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {video.duration}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
