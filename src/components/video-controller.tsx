'use client';

import { useState, type FormEvent, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Home, Drama, CarFront, Sparkles, Youtube, ListVideo, Film } from 'lucide-react';
import { getAIRecommendations } from '@/app/actions';

type Theme = 'home' | 'theater' | 'drive-in';

interface Video {
  title: string;
  url: string;
  thumbnail: string;
}

const prequelVideos: Video[] = [
    { title: "Prequel Teaser", url: "https://www.youtube.com/watch?v=slNjuRKN1-U", thumbnail: "https://i.ytimg.com/vi/slNjuRKN1-U/hqdefault.jpg" },
    { title: "Another Prequel", url: "https://www.youtube.com/watch?v=video2-id", thumbnail: "https://placehold.co/120x90.png" },
];

const foundationVideos: Video[] = [
    { title: "Foundation Ep 1", url: "https://www.youtube.com/watch?v=M17P5U9NBZ4", thumbnail: "https://i.ytimg.com/vi/M17P5U9NBZ4/hqdefault.jpg" },
    { title: "Foundation Ep 2", url: "https://www.youtube.com/watch?v=video4-id", thumbnail: "https://placehold.co/120x90.png" },
];

const playlists = [
    { name: "Prequels", id: "PLd1rdbpKgWxRA8sky8S5H0W0zpSF8rEcB", icon: <ListVideo className="h-5 w-5 mr-2" />, videos: prequelVideos },
    { name: "Foundation", id: "PLd1rdbpKgWxTw-pfKMVrFXwpylJur6yjC", icon: <Youtube className="h-5 w-5 mr-2" />, videos: foundationVideos },
]

export default function VideoController() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [videoType, setVideoType] = useState<'iframe' | 'video' | null>(null);
  const [theme, setTheme] = useState<Theme>('theater');
  const [videoSize, setVideoSize] = useState(80);
  const [viewingHistory, setViewingHistory] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const themeClasses: Record<Theme, string> = {
    home: 'theme-home',
    theater: 'theme-theater',
    drive: 'theme-drive-in',
  };

  const getEmbedUrl = (url: string): { url: string; type: 'iframe' | 'video' } | null => {
    try {
      if (url.includes('youtube.com/watch')) {
        const videoId = new URL(url).searchParams.get('v');
        return { url: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`, type: 'iframe' };
      }
      if (url.includes('youtu.be/')) {
        const videoId = new URL(url).pathname.slice(1);
        return { url: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`, type: 'iframe' };
      }
      if (url.includes('youtube.com/playlist')) {
        const listId = new URL(url).searchParams.get('list');
        return { url: `https://www.youtube.com/embed/videoseries?list=${listId}&autoplay=1&rel=0`, type: 'iframe' };
      }
      if (url.includes('vimeo.com/')) {
        const videoId = new URL(url).pathname.slice(1);
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
      toast({
        variant: 'destructive',
        title: 'Unsupported URL',
        description: 'Please enter a valid YouTube, Vimeo, or direct video file URL.',
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUrl) return;
    handleLoadVideo(currentUrl);
  };
  
  const handleGetRecommendations = async () => {
    if (viewingHistory.length === 0) {
      toast({ title: "Viewing History Empty", description: "Watch some videos to get recommendations." });
      return;
    }
    setIsGenerating(true);
    const result = await getAIRecommendations({ viewingHistory, numberOfRecommendations: 4 });
    if (result.error) {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    } else if (result.recommendations) {
      setRecommendations(result.recommendations);
    }
    setIsGenerating(false);
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
      <div className="min-h-[calc(100vh-69px)] w-full bg-black/60 backdrop-brightness-75">
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
          
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <Card className="glass-card">
                  <CardHeader>
                      <CardTitle>Curated Playlists</CardTitle>
                      <CardDescription>Start with our hand-picked video collections.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      {playlists.map(p => (
                          <div key={p.id}>
                            <h3 className="font-bold text-lg mb-2 flex items-center">{p.icon} {p.name}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {p.videos.map(v => (
                                    <button key={v.url} onClick={() => handleLoadVideo(v.url)} className="text-left rounded-md overflow-hidden group relative">
                                        <Image src={v.thumbnail} alt={v.title} width={120} height={90} className="w-full object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint="video thumbnail"/>
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <p className="text-white text-xs text-center p-1">{v.title}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                          </div>
                      ))}
                  </CardContent>
              </Card>

              <Card className="glass-card">
                  <CardHeader>
                      <CardTitle>AI Recommendations</CardTitle>
                      <CardDescription>Discover new content based on your viewing history.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Button onClick={handleGetRecommendations} disabled={isGenerating}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          {isGenerating ? 'Analyzing...' : 'Generate For Me'}
                      </Button>
                      {recommendations.length > 0 && (
                           <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                           {recommendations.map((recUrl, index) => {
                               const videoInfo = getEmbedUrl(recUrl);
                               const isYouTube = recUrl.includes("youtube.com") || recUrl.includes("youtu.be");
                               const videoId = isYouTube ? (new URL(recUrl).searchParams.get('v') || new URL(recUrl).pathname.slice(1)) : null;
                               const thumb = videoInfo && isYouTube && videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "https://placehold.co/120x90.png";

                               return (
                                   <button key={`${recUrl}-${index}`} onClick={() => handleLoadVideo(recUrl)} className="text-left rounded-md overflow-hidden group relative">
                                       <Image src={thumb} alt={`Recommendation ${index + 1}`} width={120} height={90} className="w-full object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint="video thumbnail"/>
                                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                   </button>
                               );
                           })}
                       </div>
                      )}
                  </CardContent>
              </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
