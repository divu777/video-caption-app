import { useRef } from "react";
import VideoAdder from "./VideoAdder";
import bentoImg1 from "./../assets/caption1.jpg";
import bentoImg2 from "./../assets/caption.jpg";
const Landing = () => {
  const videoAdderRef = useRef<HTMLDivElement>(null);

  const scrollToVideoAdder = () => {
    videoAdderRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex flex-col bg-black text-white items-center justify-evenly h-screen overflow-x-hidden p-20">
      <div className="flex flex-col justify-center items-center text-center gap-10">
        <h1 className=" text-8xl w-2/3">Experience Video in its Purest Form</h1>
        <p className=" w-3/5">
          Make your videos sing with clear captions! Subly is the web app that
          lets you upload your videos and add captions in minutes. No editing
          software needed! Subly makes your videos
        </p>
      </div>
      <div className="bento-Box h-screen flex w-screen justify-center p-10 gap-5">
        <div className=" flex-grow w-1/4">
          <img src={bentoImg1} alt="" className=" h-full rounded-3xl" />
        </div>
        <div className="flex flex-grow w-2/4 flex-col gap-5 ">
          <div className=" flex flex-col  h-1/3  bg-gray-900 rounded-3xl justify-evenly items-center">
            <div className="flex flex-col justify-center items-center bg-gray-900">
              <h3 className="text-2xl font-bold mb-2 bg-gray-900">Add Captions Easily</h3>
              <p className="text-sm bg-gray-900">
                Upload your video and get clear captions in minutes. No editing
                software required!
              </p>
            </div>
            <button
              onClick={scrollToVideoAdder}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Upload Now
            </button>
          </div>
          <div className=" h-2/3 flex justify-evenly gap-5">
            <div
              className="  w-1/2 rounded-3xl text-5xl text-wrap p-10 tracking-wide"
              style={{
                background: "#FF004D",
              }}
            >
              99% Smooth Playback
            </div>
            <div
              className=" w-1/2 rounded-3xl text-5xl text-wrap p-10 tracking-wide"
              style={{
                background: "#ff1493 ",
              }}
            >
              1 Million+ Satisfied Users
            </div>
          </div>
        </div>
        <div className=" flex-grow w-1/4">
          <img src={bentoImg2} alt="" className=" h-full rounded-3xl" />
        </div>
      </div>
      <div ref={videoAdderRef} className="w-screen h-screen ">
        <VideoAdder />
      </div>
    </div>
  );
};

export default Landing;
