export const youtube_Search = async (query) => {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&maxResults=10&type=video&key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "YouTube API request failed with status: " + response.status
    );
  }

  const data = await response.json();
  return data.items;
};
