import { RawYouTubeData, UnwrappedStats, ChannelStats, YouTubeVideo } from '../types';

function parseRawData(data: RawYouTubeData[]): YouTubeVideo[] {
  return data.map(item => ({
    title: item.title.replace('Watched ', ''),
    titleUrl: item.titleUrl,
    channelTitle: item.subtitles?.[0]?.name || 'Unknown Channel',
    channelUrl: item.subtitles?.[0]?.url || '',
    time: item.time
  }));
}

function getWatchTimeByMonth(videos: YouTubeVideo[]): { [key: string]: number } {
  const monthCounts: { [key: string]: number } = {};
  
  videos.forEach(video => {
    const date = new Date(video.time);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
  });

  return monthCounts;
}

export function analyzeYouTubeHistory(rawData: RawYouTubeData[]): UnwrappedStats {
  const videos = parseRawData(rawData);
  const channelMap = new Map<string, ChannelStats>();
  
  // Count videos per channel and track last watched
  videos.forEach((video) => {
    const existing = channelMap.get(video.channelUrl);
    if (existing) {
      existing.videoCount++;
      if (new Date(video.time) > new Date(existing.lastWatched)) {
        existing.lastWatched = video.time;
      }
    } else {
      channelMap.set(video.channelUrl, {
        channelTitle: video.channelTitle,
        channelUrl: video.channelUrl,
        videoCount: 1,
        lastWatched: video.time
      });
    }
  });

  // Sort channels by video count
  const topChannels = Array.from(channelMap.values())
    .sort((a, b) => b.videoCount - a.videoCount)
    .slice(0, 10);

  // Sort videos by date to get most recent
  const sortedByDate = [...videos].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return {
    topChannels,
    mostWatchedVideo: videos[0] || null,
    mostRecentVideo: sortedByDate[0] || null,
    totalVideos: videos.length,
    uniqueChannels: channelMap.size,
    watchTimeByMonth: getWatchTimeByMonth(videos)
  };
}