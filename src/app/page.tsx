import Header from '@/components/header';
import VideoController from '@/components/video-controller';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <VideoController />
      </main>
    </div>
  );
}
