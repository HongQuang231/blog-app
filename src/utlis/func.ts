
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

export function splitText(text: string, number: number) {
  const numberOfText = text.length;
  if (numberOfText <= number) return text;
  return text.slice(0, number) + '...';
}

export function formatDate(updatedDate: string | undefined): any {
  if (!updatedDate) {
    return formatDate(new Date().toISOString().toString());
  }
  // Regular expression to match various date formats (YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY)
  const regex = /^(\d{4})-(\d{2})-(\d{2})|(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = updatedDate.match(regex);

  if (match) {
    // If matched, extract parts and build formatted date
    const year = match[1] ? match[1] : match[6];
    const month = match[2] ? match[2] : (match[4].length === 1) ? `0${match[4]}` : match[4];
    const day = match[3] ? match[3] : (match[5].length === 1) ? `0${match[5]}` : match[5];
    return `${year}-${month}-${day}`;
  } else {
    // If not matched, return original string
    return updatedDate;
  }
}