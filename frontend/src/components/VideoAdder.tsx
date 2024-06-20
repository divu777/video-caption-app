import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VideoAdder = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [captions, setCaptions] = useState([]);
  const [text, setText] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [showResultButton, setShowResultButton] = useState(false);
  const navigate = useNavigate();

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setShowVideo(true);
    }, 2000); // Simulate a 2-second upload time
  };

  const handleViewResult = () => {
    navigate(
      `/result?videoUrl=${encodeURIComponent(
        videoUrl
      )}&captions=${encodeURIComponent(JSON.stringify(captions))}`
    );
  };
  const handleAddCaption = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/caption", {
        videoUrl,
        captions: [{ text, timestamp: parseFloat(timestamp) }],
      });
      const response = await axios.get(
        `http://localhost:3000/captions/${encodeURIComponent(videoUrl)}`
      );
      setCaptions(response.data.captions);
      setText("");
      setTimestamp("");
      setShowResultButton(true);
    } catch (error) {
      console.error("Error submitting caption:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="mb-8 flex gap-4 justify-center w-full max-w-3xl">
        <input
          type="text"
          placeholder="Enter Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="p-4 rounded-full border w-full text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpload}
          className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out"
          disabled={isUploading}
        >
          {isUploading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 inline-block"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Upload"
          )}
        </button>
      </div>

      {showVideo && (
        <div className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 text-center">
            <h1 className="text-3xl font-bold mb-6 text-white">Video Player</h1>
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <video controls className="rounded-lg w-full h-full object-cover">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Enter Caption"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 p-3 rounded-full border bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Timestamp (s)"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  className="w-1/3 p-3 rounded-full border bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleAddCaption}
                className="w-full p-3 rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white hover:from-pink-600 hover:to-red-700 transition duration-300 ease-in-out"
              >
                Add Caption
              </button>
              {showResultButton && (
                <button
                  onClick={handleViewResult}
                  className="w-full p-3 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 transition duration-300 ease-in-out"
                >
                  See Result
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoAdder;
