
export function getYoutubeVideoPath(url: string) {
  const youtubeUrlRegex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{11})/;
  const match = url.match(youtubeUrlRegex);
  if (match) {
    const videoId = match[1];
    const urlPath = new URL(url)
    return `${urlPath.origin}/embed/${videoId}`;
  }
  return ''
}