import Header from '@/components/header';
import VideoController from '@/components/video-controller';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Header />
      <main className="flex-1">
        <VideoController />
      </main>
      <Footer />
    </div>
  );
}
