"use client";
import "swiper/css";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { API } from "@/shared/utils/config";
import Video from "../videos/video";

const InstaSlider = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const getFullUrl = (file: string) => {
    if (file.startsWith("http")) return file;
    return `${API}/images/${file}`;
  };

  if (images.length === 1) {
    const file = images[0];

    return (
      <div className="relative w-full aspect-square  bg-secondary">
        {file.toLowerCase().endsWith(".mp4") ? (
          <Video src={getFullUrl(file)} />
        ) : (
          <img
            src={getFullUrl(file)}
            alt="Post"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square">
      <div className="absolute top-2 right-2 z-20 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
        {activeIndex + 1}/{images.length}
      </div>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {images.map((file, index) => (
          <SwiperSlide key={index}>
            <div className="w-full aspect-square bg-secondary">
              {file.toLowerCase().endsWith(".mp4") ? (
                <Video src={getFullUrl(file)} />
              ) : (
                <img
                  src={getFullUrl(file)}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-center"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default InstaSlider;
