import React, { useState, useEffect, useRef } from "react";

interface Caption {
  timestamp: number;
  text: string;
}

interface VideoPlayerProps {
  videoUrl: string;
  captions: Caption[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, captions }) => {
  const [currentCaption, setCurrentCaption] = useState<Caption | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const caption = captions.find(
          (cap) =>
            cap.timestamp >= currentTime && cap.timestamp < currentTime + 0.5
        );
        setCurrentCaption(caption || null);
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [captions]);

  return (
    <div className="relative">
      <video ref={videoRef} controls className="w-screen h-screen">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {currentCaption && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white p-2 rounded">
          {currentCaption.text}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
