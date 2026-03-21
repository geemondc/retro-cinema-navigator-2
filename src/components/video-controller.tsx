
'use client';

import { useState, type FormEvent, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Home, Drama, CarFront, Youtube, ListVideo, Film } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import placeholderData from '@/app/lib/placeholder-images.json';

type Theme = 'home' | 'theater' | 'drive-in';

const fullPlaylistUrl = "https://studio--retrocinema-navigator.us-central1.hosted.app/";

const playlists = [
    { 
      name: "Prequels", 
      playlistUrl: fullPlaylistUrl, 
      icon: <ListVideo className="h-5 w-5 mr-2" />, 
      preview: { 
        title: "Prequel Teaser", 
        url: "https://www.youtube.com/watch?v=slNjuRKN1-U", 
        image: placeholderData.youtubeThumbnails[0]
      }
    },
    { 
      name: "Foundation", 
      playlistUrl: fullPlaylistUrl, 
      icon: <Youtube className="h-5 w-5 mr-2" />, 
      preview: { 
        title: "Foundation Ep 1", 
        url: "https://www.youtube.com/watch?v=M17P5U9NBZ4", 
        image: placeholderData.youtubeThumbnails[1]
      } 
    },
];

export default function VideoController() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [videoType, setVideoType] = useState<'iframe' | 'video' | null>(null);
  const [theme, setTheme] = useState<Theme>('theater');
  const [videoSize, setVideoSize] = useState(80);
  const { toast } = useToast();

  const themeClasses: Record<Theme, string> = {
    home: 'theme-home',
    theater: 'theme-theater',
    'drive-in': 'theme-drive-in',
  };

  const getEmbedUrl = (url: string): { url: string; type: 'iframe' | 'video' } | null => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
        const videoId = urlObj.searchParams.get('v');
        return { url: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`, type: 'iframe' };
      }
      if (urlObj.hostname.includes('youtu.be')) {
        const videoId = urlObj.pathname.slice(1);
        return { url: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`, type: 'iframe' };
      }
      if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('list')) {
        const listId = urlObj.searchParams.get('list');
        return { url: `https://www.youtube.com/embed/videoseries?list=${listId}&autoplay=1&rel=0`, type: 'iframe' };
      }
      if (urlObj.hostname.includes('vimeo.com')) {
        const videoId = urlObj.pathname.slice(1);
        return { url: `https://player.vimeo.com/video/${videoId}?autoplay=1`, type: 'iframe' };
      }
      if (url.match(/\.(mp4|webm|ogg)$/)) {
        return { url: url, type: 'video' };
      }
    } catch (error) {
        return null;
    }
    return null;
  };

  const handleLoadVideo = (url: string) => {
    const result = getEmbedUrl(url);
    if (result) {
      setEmbedUrl(result.url);
      setVideoType(result.type);
    } else {
      toast({
        variant: "destructive",
        title: "Unsupported URL",
        description: "Please enter a valid YouTube, Vimeo, or direct video file URL.",
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUrl) return;
    handleLoadVideo(currentUrl);
  };

  return (
    <div className={`w-full transition-all duration-700 ${themeClasses[theme]}`} data-theme-hint={theme}>
      <div className="min-h-[calc(100vh-230px)] w-full bg-black/40 backdrop-brightness-50">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto transition-all duration-500" style={{ maxWidth: `${videoSize}%`}}>
            <Card className="glass-card mb-6 border-accent/20">
              <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    placeholder="Paste any video URL... (YouTube, Vimeo, .mp4)"
                    value={currentUrl}
                    onChange={(e) => setCurrentUrl(e.target.value)}
                    className="flex-grow !text-base bg-black/40 border-white/10 focus:border-accent"
                  />
                  <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-white">
                    Load Video
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="aspect-video bg-black rounded-lg shadow-[0_0_50px_rgba(125,249,255,0.1)] overflow-hidden flex items-center justify-center border-2 border-primary/20 relative group">
              {videoType && embedUrl ? (
                videoType === 'iframe' ? (
                  <iframe
                    key={embedUrl}
                    src={embedUrl}
                    title="Video Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <video key={embedUrl} controls autoPlay className="w-full h-full">
                    <source src={embedUrl} type={`video/${embedUrl.split('.').pop()}`} />
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="text-center text-muted-foreground p-8 animate-pulse">
                  <Film className="w-20 h-20 mx-auto mb-4 text-accent/30" />
                  <h3 className="text-2xl font-bold text-white mb-2">RetroCinema Navigator 2.0</h3>
                  <p className="max-w-md mx-auto text-muted-foreground/80">Paste a futuristic transmission URL above to begin your cinematic journey across the stars.</p>
                </div>
              )}
            </div>

            <Card className="glass-card mt-6 border-accent/10">
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <Label className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4 block">Viewing Environment</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={theme === 'home' ? 'default' : 'secondary'} 
                      onClick={() => setTheme('home')}
                      className={`flex-1 sm:flex-none ${theme === 'home' ? 'bg-primary shadow-[0_0_15px_rgba(102,51,153,0.5)]' : ''}`}
                    >
                      <Home className="h-4 w-4 mr-2" /> Home
                    </Button>
                    <Button 
                      variant={theme === 'theater' ? 'default' : 'secondary'} 
                      onClick={() => setTheme('theater')}
                      className={`flex-1 sm:flex-none ${theme === 'theater' ? 'bg-primary shadow-[0_0_15px_rgba(102,51,153,0.5)]' : ''}`}
                    >
                      <Drama className="h-4 w-4 mr-2" /> Theater
                    </Button>
                    <Button 
                      variant={theme === 'drive-in' ? 'default' : 'secondary'} 
                      onClick={() => setTheme('drive-in')}
                      className={`flex-1 sm:flex-none ${theme === 'drive-in' ? 'bg-primary shadow-[0_0_15px_rgba(102,51,153,0.5)]' : ''}`}
                    >
                      <CarFront className="h-4 w-4 mr-2" /> Drive-In
                    </Button>
                  </div>
                </div>
                <div className="w-full">
                  <Label htmlFor="video-size" className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4 block">Screen Scale</Label>
                  <Slider 
                    id="video-size" 
                    value={[videoSize]} 
                    onValueChange={(val) => setVideoSize(val[0])} 
                    min={40} 
                    max={100} 
                    step={5}
                    className="cursor-pointer"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto">
              <Card className="glass-card border-white/5 bg-black/40">
                  <CardHeader>
                      <CardTitle className="text-accent">Curated Playlists</CardTitle>
                      <CardDescription>Select a collection to preload into the cinema.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                      {playlists.map(p => (
                          <div key={p.name} className="flex gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                              <button onClick={() => handleLoadVideo(p.preview.url)} className="text-left rounded-md overflow-hidden group relative w-32 shrink-0 border border-white/10 shadow-lg">
                                  <Image 
                                    src={p.preview.image.url} 
                                    alt={p.preview.image.alt} 
                                    width={p.preview.image.width} 
                                    height={p.preview.image.height} 
                                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    data-ai-hint={p.preview.image.hint}
                                  />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-1">
                                      <p className="text-white text-xs font-bold text-center">PREVIEW</p>
                                  </div>
                              </button>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg mb-2 flex items-center truncate text-white">
                                  <span className="text-accent shrink-0">{p.icon}</span> 
                                  <span className="ml-2 truncate">{p.name}</span>
                                </h3>
                                <Button asChild variant="outline" size="sm" className="border-accent/30 hover:border-accent hover:bg-accent/10">
                                  <a href={p.playlistUrl} target="_blank" rel="noopener noreferrer">
                                    Watch Full Playlist
                                  </a>
                                </Button>
                              </div>
                          </div>
                      ))}
                  </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
