'use client';

import { useState, type FormEvent, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Home, Drama, CarFront, Youtube, ListVideo, Film } from 'lucide-react';

type Theme = 'home' | 'theater' | 'drive-in';

const playlists = [
    { 
      name: "Prequels", 
      playlistUrl: "https://www.youtube.com/playlist?list=PLd1rdbpKgWxRA8sky8S5H0W0zpSF8rEcB", 
      icon: <ListVideo className="h-5 w-5 mr-2" />, 
      preview: { title: "Prequel Teaser", url: "https://www.youtube.com/watch?v=slNjuRKN1-U", thumbnail: "https://i.ytimg.com/vi/slNjuRKN1-U/hqdefault.jpg" }
    },
    { 
      name: "Foundation", 
      playlistUrl: "https://www.youtube.com/playlist?list=PLd1rdbpKgWxTw-pfKMVrFXwpylJur6yjC", 
      icon: <Youtube className="h-5 w-5 mr-2" />, 
      preview: { title: "Foundation Ep 1", url: "https://www.youtube.com/watch?v=M17P5U9NBZ4", thumbnail: "https://i.ytimg.com/vi/M17P5U9NBZ4/hqdefault.jpg" } 
    },
];

export default function VideoController() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [videoType, setVideoType] = useState<'iframe' | 'video' | null>(null);
  const [theme, setTheme] = useState<Theme>('theater');
  const [videoSize, setVideoSize] = useState(80);
  const [viewingHistory, setViewingHistory] = useState<string[]>([]);

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
        console.error("URL parsing error:", error);
        return null;
    }
    return null;
  };

  const handleLoadVideo = (url: string) => {
    const result = getEmbedUrl(url);
    if (result) {
      setEmbedUrl(result.url);
      setVideoType(result.type);
      if (!viewingHistory.includes(url)) {
        setViewingHistory(prev => [...prev, url]);
      }
    } else {
      console.error('Unsupported URL', 'Please enter a valid YouTube, Vimeo, or direct video file URL.');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUrl) return;
    handleLoadVideo(currentUrl);
  };

  const themeHint = useMemo(() => {
    switch(theme) {
      case 'home': return 'home';
      case 'theater': return 'theater';
      case 'drive-in': return 'drive-in';
      default: return 'theater';
    }
  }, [theme]);

  return (
    <div className={`w-full transition-all duration-700 ${themeClasses[theme]}`} data-theme-hint={themeHint}>
      <div className="min-h-[calc(100vh-230px)] w-full bg-black/60 backdrop-brightness-75">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="w-full mx-auto transition-all duration-500" style={{ maxWidth: `${videoSize}%`}}>
            <Card className="glass-card mb-6">
              <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="text"
                    placeholder="Paste any video URL... (YouTube, Vimeo, .mp4)"
                    value={currentUrl}
                    onChange={(e) => setCurrentUrl(e.target.value)}
                    className="flex-grow !text-base"
                  />
                  <Button type="submit" className="w-full sm:w-auto">Load Video</Button>
                </form>
              </CardContent>
            </Card>

            <div className="aspect-video bg-black rounded-lg shadow-2xl shadow-primary/20 overflow-hidden flex items-center justify-center border-2 border-primary/20">
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
                <div className="text-center text-muted-foreground p-8">
                  <Film className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                  <h3 className="text-xl font-semibold">Welcome to RetroCinema Navigator 2.0</h3>
                  <p>Paste a video URL above to begin your cinematic experience.</p>
                </div>
              )}
            </div>

            <Card className="glass-card mt-6">
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider mb-2 block">Theme</Label>
                  <div className="flex gap-2">
                    <Button variant={theme === 'home' ? 'default' : 'secondary'} onClick={() => setTheme('home')}><Home /> <span className="hidden sm:inline ml-2">Home</span></Button>
                    <Button variant={theme === 'theater' ? 'default' : 'secondary'} onClick={() => setTheme('theater')}><Drama /> <span className="hidden sm:inline ml-2">Theater</span></Button>
                    <Button variant={theme === 'drive-in' ? 'default' : 'secondary'} onClick={() => setTheme('drive-in')}><CarFront /> <span className="hidden sm:inline ml-2">Drive-In</span></Button>
                  </div>
                </div>
                <div className="w-full">
                  <Label htmlFor="video-size" className="text-xs font-semibold uppercase tracking-wider mb-2 block">Screen Size</Label>
                  <Slider id="video-size" value={[videoSize]} onValueChange={(val) => setVideoSize(val[0])} min={40} max={100} step={5} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10 max-w-2xl mx-auto">
              <Card className="glass-card">
                  <CardHeader>
                      <CardTitle>Curated Playlists</CardTitle>
                      <CardDescription>Start with our hand-picked video collections.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                      {playlists.map(p => (
                          <div key={p.name} className="flex gap-4 items-center">
                              <button onClick={() => handleLoadVideo(p.preview.url)} className="text-left rounded-md overflow-hidden group relative w-32 shrink-0">
                                  <Image src={p.preview.thumbnail} alt={p.preview.title} width={128} height={72} className="w-full object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint="video thumbnail"/>
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-1">
                                      <p className="text-white text-xs text-center">{p.preview.title}</p>
                                  </div>
                              </button>
                              <div className="flex-1">
                                <h3 className="font-bold text-lg mb-2 flex items-center">{p.icon} {p.name}</h3>
                                <Button asChild>
                                  <a href="https://studio--retrocinema-navigator.us-central1.hosted.app/" target="_blank" rel="noopener noreferrer">
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
