import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  restaurant: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  restaurant,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageArray = images;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + imageArray.length) % imageArray.length
    );
  };

  if (imageArray.length === 0) {
    return (
      <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
        <p className="text-blue-600 font-medium">No image available</p>
      </div>
    );
  }

  return (
    <div className="relative h-48 overflow-hidden rounded-lg group">
      <img
        src={imageArray[currentIndex]}
        alt={`${restaurant} - Image ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src =
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop";
        }}
      />

      {imageArray.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {imageArray.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
