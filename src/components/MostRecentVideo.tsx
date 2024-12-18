import { UnwrappedStats } from "../types";
import { videoThumbnail } from "../utils/thumbnail"; 

export function MostRecentVideo({ stats }: { stats: UnwrappedStats }) {
    const mostRecentVideoThumbnail = stats.mostRecentVideo
        ? videoThumbnail(stats.mostRecentVideo.titleUrl)
        : '';
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Recent Video</h3>
      {stats.mostRecentVideo && (
        <img
          src={mostRecentVideoThumbnail}
          alt={stats.mostRecentVideo?.channelTitle}
          className="w-16 h-16 rounded-full mr-4"
        />
      )}
      <div className="mt-4">
        <a
          href={stats.mostRecentVideo?.titleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-medium text-indigo-600 hover:text-indigo-700"
        >
          {stats.mostRecentVideo?.title}
        </a>
        <p className="text-sm text-gray-500 mt-1">
          by {stats.mostRecentVideo?.channelTitle}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Watched on {new Date(stats.mostRecentVideo?.time??"").toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
