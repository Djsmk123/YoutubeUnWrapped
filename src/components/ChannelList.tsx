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
        {channels.map((channel, index) => (
          <li key={channel.channelUrl} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg font-medium text-indigo-600 w-8">{index + 1}</span>
                <div>
                  <a
                    href={channel.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-medium hover:text-indigo-600 flex items-center"
                  >
                    {channel.channelTitle}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                  <p className="text-sm text-gray-500">
                    {channel.videoCount} videos watched · Last watched {new Date(channel.lastWatched).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}