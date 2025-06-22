
import React, { useState, useEffect, useCallback } from 'react';
import { Testimonial } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-white p-8 rounded-lg shadow-xl mx-auto max-w-md text-center h-full flex flex-col justify-between">
    <div>
      {testimonial.avatarUrl && (
        <img
          src={testimonial.avatarUrl}
          alt={testimonial.author}
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
        />
      )}
      <p className="text-brand-text-light italic text-lg mb-6">"{testimonial.quote}"</p>
    </div>
    <div>
      <p className="font-playfair font-semibold text-brand-primary text-xl">{testimonial.author}</p>
      <p className="text-sm text-gray-500">{testimonial.location}</p>
    </div>
  </div>
);

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length > 1) {
      const timer = setTimeout(goToNext, 7000); // Auto-scroll every 7 seconds
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, testimonials.length]); // Not including goToNext as it changes with currentIndex but its logic remains same.

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-16 bg-brand-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-brand-text text-center mb-12">
          Words From Our Customers
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {testimonials.length > 1 && (
            <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-0 sm:-left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-brand-primary p-3 rounded-full shadow-md transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-0 sm:-right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-brand-primary p-3 rounded-full shadow-md transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
            </>
          )}
        </div>
         {testimonials.length > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-brand-primary' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
