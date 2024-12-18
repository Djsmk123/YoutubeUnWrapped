import { ExternalLink, Play } from 'lucide-react';
import { YouTubeVideo } from '../types';
import { videoThumbnail } from '../utils/thumbnail';


interface VideoListProps {
  videos: YouTubeVideo[];
  title: string;
}

export function VideoList({ videos, title }: VideoListProps) {

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
        <div className="flex items-center">
        
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {
          videos.slice(0, 5).map((video)=>  {
            const thumbnailUrl = videoThumbnail(video.titleUrl);
            return (
                
                <li key={video.titleUrl} className="px-6 py-4 hover:bg-gray-50 flex items-start gap-4">
                  <div className="flex-shrink-0">
              
                  </div>
                  <div className="flex-1 min-w-0">
                    <a
                      href={video.titleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 font-medium hover:text-indigo-600 flex items-center gap-1 group"
                    >
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100">
                        <Play className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span className="truncate" style={{maxWidth: '30ch'}}>{video.title}</span>
                      <img
                        src={thumbnailUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAgAX9X49ia04Y63sF0XMU8VghOaEMbTPfhQ&s'}
                        alt={video.title}
                        className="w-16 h-16 object-cover rounded-lg ml-auto"
                      />
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span>{video.channelTitle}</span>
                      <span>•</span>
                      <span>{video.noOfTimesPlayed} times watched</span>
                      <span>•</span>
                      <span>{new Date(video.time).toLocaleDateString()}</span>
                    </div>
                  </div>
                </li>
            );

          })
        }
      </ul>
    </div>
  );
}