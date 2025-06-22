
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface Slide {
  imageUrl: string;
  altText?: string;
}

interface ImageSliderProps {
  slides: Slide[];
  autoPlayInterval?: number; // in milliseconds
  showDots?: boolean;
  showArrows?: boolean;
  children?: (currentSlideData: Slide, currentIndex: number) => React.ReactNode; // For custom content overlay
  imageHeightClass?: string; // e.g. 'h-64', 'h-96', 'h-[500px]'
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  slides,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  children,
  imageHeightClass = 'h-[calc(100vh-5rem)] md:h-[calc(100vh-8rem)] max-h-[700px]', // Default height for hero
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (autoPlayInterval > 0 && slides.length > 1) {
      const timer = setTimeout(goToNext, autoPlayInterval);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, autoPlayInterval, slides.length]); // Deliberately not including goToNext to avoid re-creating timer if goToNext changes due to currentIndex

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className={`relative w-full overflow-hidden ${imageHeightClass}`}>
      <div
        className="flex transition-transform ease-in-out duration-700 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full relative">
            <img
              src={slide.imageUrl}
              alt={slide.altText || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {children && (
              <div className="absolute inset-0">
                {children(slide, currentIndex)}
              </div>
            )}
          </div>
        ))}
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-opacity"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-opacity"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === slideIndex ? 'bg-white' : 'bg-gray-400 hover:bg-gray-200'
              }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;

