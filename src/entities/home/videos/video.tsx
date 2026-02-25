import { PlayCircle, Volume2, VolumeX } from "lucide-react";
import React, { useRef, useState } from "react";

export default function Video({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted,setIsMuted]=useState<boolean>(true)

  const togglePlay = () => {
    if (!videoRef.current) return;


    if (videoRef.current.paused) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }; 

  const toggleVolume=()=>{
    if(videoRef.current){
      videoRef.current.muted=!isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative w-[100%]">
      <video
        src={src}
        ref={videoRef}
        className="rounded-[10px] w-[100%] max-h-[600px] sm:max-h-[400px] object-cover cursor-pointer"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        onClick={togglePlay}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {isPlaying ? null : (
          <PlayCircle
            className="text-white opacity-60 hover:opacity-100 transition duration-300"
            size={50}
            onClick={togglePlay}
          />
        )}
      </div>

       <div className="absolute bottom-3 right-3 bg-black/40 p-2 rounded-full backdrop-blur-sm">
        {isMuted ? (
          <VolumeX
            className="text-white cursor-pointer"
            size={20}
            onClick={toggleVolume}
          />
        ) : (
          <Volume2
            className="text-white cursor-pointer"
            size={20}
            onClick={toggleVolume}
          />
        )}
      </div>
    </div>
  );
}
