import { useState } from "react";
import { FileUpload } from "./components/FileUpload";
import { ChannelList } from "./components/ChannelList";
import { StatsCard } from "./components/StatsCard";
import { WatchTimeChart } from "./components/WatchTimeChart";
import { analyzeYouTubeHistory } from "./utils/analyzeHistory";
import { UnwrappedStats } from "./types";
import { Youtube, PlaySquare, Users, Clock } from "lucide-react";
import { AISummary } from "./components/dashboard/AiSummery";
import { Footer } from "./layout/footer";
import { VideoList } from "./components/VideoList";
import { BackButton } from "./ui/BackButton";
import { DownloadInstruction } from "./components/DownloadInstruction";

export default function App() {
  const [stats, setStats] = useState<UnwrappedStats | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (data: any) => {
    setLoading(true);
    const stats = analyzeYouTubeHistory(data);
    setStats(stats);
    setLoading(false);
  };
  const handleReset = () => {
    setStats(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            YouTube Unwrapped
          </h1>
          <p className="text-lg text-gray-600">
            Upload your YouTube history and discover your viewing patterns
          </p>

         
        </div>

        {/* File upload or results section */}
        {!stats ? (
          <div>
            
          <FileUpload onDataProcess={handleFileSelect} />
          <DownloadInstruction></DownloadInstruction>
          </div>
         
        ) : (
          <div className="space-y-8">
            <div className="flex justify-end">
              <BackButton onClick={handleReset} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard
                title="Total Videos"
                value={stats.totalVideos}
                icon={<PlaySquare className="h-6 w-6 text-indigo-600" />}
              />
              <StatsCard
                title="Unique Channels"
                value={stats.uniqueChannels}
                icon={<Users className="h-6 w-6 text-indigo-600" />}
              />
              <StatsCard
                title="Top Channel"
                value={stats.topChannels[0]?.channelTitle || "N/A"}
                icon={<Youtube className="h-6 w-6 text-indigo-600" />}
              />
              <StatsCard
                title="Videos This Month"
                value={Object.values(stats.watchTimeByMonth)[0] || 0}
                icon={<Clock className="h-6 w-6 text-indigo-600" />}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChannelList channels={stats.topChannels} />
              <WatchTimeChart watchTimeData={stats.watchTimeByMonth} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VideoList
                videos={stats.mostWatchedVideo}
                title="Most Rewatched Videos"
              />
              <AISummary stats={stats} />
            </div>
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin h-5 w-5 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
