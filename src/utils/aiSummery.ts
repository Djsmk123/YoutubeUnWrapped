import {  UnwrappedStats } from '../types';

export async function generateAISummary(stats: UnwrappedStats): Promise<string[]> {
  const points: string[] = [];

  points.push(`You watched ${stats.totalVideos} videos in the last year.`);
  points.push(`You watched videos from ${stats.uniqueChannels} unique channels.`);
  points.push(`Your most watched video is ${stats.mostWatchedVideo[0].title} from ${stats.mostWatchedVideo[0].channelTitle}.`);
  points.push(`Your most recent video is ${stats.mostRecentVideo?.title} from ${stats.mostRecentVideo?.channelTitle}.`);
  points.push(`The top 3 channels you watched are ${stats.topChannels[0].channelTitle}, ${stats.topChannels[1].channelTitle}, and ${stats.topChannels[2].channelTitle}.`);

  return points;
}