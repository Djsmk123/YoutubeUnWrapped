import { ChannelStats } from '../types';
import { ExternalLink } from 'lucide-react';

interface ChannelListProps {
  channels: ChannelStats[];
}

export function ChannelList({ channels }: ChannelListProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Top 10 Most Watched Channels</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {channels.slice(0, 10).map((channel, index) => (
          <li key={channel.channelUrl} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg font-medium text-indigo-600 w-8">{index + 1}</span>
                <a
                  href={channel.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center ml-4"
                >
                  <img
                    src={channel.thumbnailUrl || `https://i.ytimg.com/i/noavatar_100x100.png`} // Fallback image
                    alt={channel.channelTitle}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <span className="text-gray-900 font-medium hover:text-indigo-600">
                      {channel.channelTitle}
                    </span>
                    <p className="text-sm text-gray-500">
                      {channel.videoCount} videos watched · Last watched {new Date(channel.lastWatched).toLocaleDateString()}
                    </p>
                  </div>
                </a>
              </div>
              <ExternalLink className="h-4 w-4" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
