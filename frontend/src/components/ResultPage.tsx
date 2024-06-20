import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";

const ResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const videoUrl = searchParams.get("videoUrl") || "";
  const captionsParam = searchParams.get("captions");
  const [captions, setCaptions] = useState<any[]>([]);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (captionsParam) {
      try {
        const parsedCaptions = JSON.parse(captionsParam);
        setCaptions(parsedCaptions);
      } catch (error) {
        console.error("Error parsing captions:", error);
        setCaptions([]);
      }
    }
    setShowVideo(true);
  }, [captionsParam]);

  if (!videoUrl) {
    return <div>Error: No video URL provided</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {showVideo && (
        <div>
          <VideoPlayer videoUrl={videoUrl} captions={captions} />
        </div>
      )}
    </div>
  );
};

export default ResultPage;
