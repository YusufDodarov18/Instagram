import { useEffect, useState } from "react";
import "./pictires.css";

const images = [
  "https://static.cdninstagram.com/images/instagram/xig/homepage/screenshots/screenshot1-2x.png",
  "https://static.cdninstagram.com/images/instagram/xig/homepage/screenshots/screenshot2-2x.png",
  "https://static.cdninstagram.com/images/instagram/xig/homepage/screenshots/screenshot3-2x.png",
  "https://static.cdninstagram.com/images/instagram/xig/homepage/screenshots/screenshot4-2x.png",
];

const Pictures = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-container">
      <img
        src={images[currentImageIndex]}
        className="slideshow-image"
        alt={`Instagram Screenshot ${currentImageIndex + 1}`}
      />
    </div>
  );
};

export default Pictures;
