export const videoThumbnail = (url?: string) => {
  if (!url) return '';
  const videoId = url.split('v=')[1];
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/1.jpg`;
};
