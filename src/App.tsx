import{ useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ChannelList } from './components/ChannelList';
import { StatsCard } from './components/StatsCard';
import { WatchTimeChart } from './components/WatchTimeChart';
import { analyzeYouTubeHistory } from './utils/analyzeHistory';
import { UnwrappedStats } from './types';
import { Youtube, PlaySquare, Users, Clock } from 'lucide-react';

export default function App() {
  const [stats, setStats] = useState<UnwrappedStats | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (data: any) => {
    setLoading(true);
    const stats = analyzeYouTubeHistory(data);
    setStats(stats);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">YouTube Unwrapped</h1>
          <p className="text-lg text-gray-600">
            Upload your YouTube history and discover your viewing patterns
          </p>
        </div>

        {!stats ? (
          <FileUpload onDataProcess={handleFileSelect} />
        ) : (
          <div className="space-y-8">
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
                value={stats.topChannels[0]?.channelTitle || 'N/A'}
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

            {stats.mostRecentVideo && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Recent Video</h3>
                <div>
                  <a
                    href={stats.mostRecentVideo.titleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    {stats.mostRecentVideo.title}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    by {stats.mostRecentVideo.channelTitle}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Watched on {new Date(stats.mostRecentVideo.time).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin h-5 w-5 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  );
}