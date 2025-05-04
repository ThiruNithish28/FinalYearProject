const ResourceView = ({ youtube_Resource}) => {
  return (
    <div class="lg:w-[860px] flex flex-wrap gap-2.5 p-2 justify-center">
      {youtube_Resource?.map((res) => (
        <a
          id={res.id.videoId}
          href={`https://www.youtube.com/watch?v=${res.id.videoId}`}
          target="_blank"
          className="mt-4 block w-60 md:w-1/3 lg:w-1/4 hover:bg-gray-border rounded-lg p-2"
          key={res.id.videoId}
        >
          <img
            src={res.snippet.thumbnails.medium.url}
            alt={res.snippet.title}
            className="w-full rounded-lg"
          />
          <p>
            {res.snippet.title.length > 25
              ? res.snippet.title.slice(0, 25) + "..."
              : res.snippet.title}
          </p>
        </a>
      ))}
    </div>
  );
};
export default ResourceView;