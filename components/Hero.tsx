
import React from 'react';
import { HeroSlide } from '../types';
import ImageSlider from './ImageSlider';
import Button from './ui/Button';

interface HeroProps {
  slides: HeroSlide[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
  const imageSliderSlides = slides.map(slide => ({ imageUrl: slide.imageUrl, altText: slide.title }));

  const handleCtaClick = (link: string, text: string) => {
    if (link.startsWith('#')) {
      // Allow default anchor behavior
      return;
    }
    alert(`Action: ${text} - Navigating to ${link} (Not a real link)`);
  };


  return (
    <section className="relative text-white">
      <ImageSlider slides={imageSliderSlides} autoPlayInterval={6000} showArrows={true} showDots={true}>
        {(currentSlideData, currentIndex) => {
          const activeSlide = slides[currentIndex];
          if (!activeSlide) return null;
          return (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-8 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold mb-4 animate-fadeInUp">
                {activeSlide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl animate-fadeInUp animation-delay-300">
                {activeSlide.subtitle}
              </p>
              <Button
                href={activeSlide.ctaLink.startsWith('#') ? activeSlide.ctaLink : undefined}
                onClick={activeSlide.ctaLink.startsWith('#') ? undefined : (e) => {
                  e.preventDefault(); // Prevent navigation if it's not an anchor
                  handleCtaClick(activeSlide.ctaLink, activeSlide.ctaText);
                }}
                size="lg"
                variant="primary"
                className="animate-fadeInUp animation-delay-600"
              >
                {activeSlide.ctaText}
              </Button>
            </div>
          );
        }}
      </ImageSlider>
      <style>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </section>
  );
};

export default Hero;
