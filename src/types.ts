export interface YouTubeVideo {
  title: string;
  titleUrl: string;
  channelTitle: string;
  channelUrl: string;
  time: string;
}

export interface ChannelStats {
  channelTitle: string;
  channelUrl: string;
  videoCount: number;
  lastWatched: string;
}

export interface UnwrappedStats {
  topChannels: ChannelStats[];
  mostWatchedVideo: YouTubeVideo | null;
  mostRecentVideo: YouTubeVideo | null;
  totalVideos: number;
  uniqueChannels: number;
  watchTimeByMonth: { [key: string]: number };
}

export interface RawYouTubeData {
  header: string;
  title: string;
  titleUrl: string;
  subtitles: Array<{
    name: string;
    url: string;
  }> | null;
  time: string;
  products: string[];
  activityControls: string[];
}