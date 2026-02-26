import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import carousel1 from "@/assets/carousel-1.jpeg";
import carousel2 from "@/assets/carousel-2.jpeg";
import carousel3 from "@/assets/carousel-3.jpeg";
import carousel4 from "@/assets/carousel-4.jpeg";

const slides = [
  {
    id: 1,
    image: carousel1,
    label: "Children enjoying nutritious meals together",
    category: "Food Program"
  },
  {
    id: 2,
    image: carousel2,
    label: "Children receiving clothing and uniforms",
    category: "Clothing Initiative"
  },
  {
    id: 3,
    image: carousel3,
    label: "Students with school supplies and stationery",
    category: "Education Support"
  },
  {
    id: 4,
    image: carousel4,
    label: "Community meal distribution in villages",
    category: "Community Outreach"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full bg-card rounded-2xl overflow-hidden shadow-card border border-border">
      {/* Main Carousel */}
      <div className="relative aspect-[21/9] md:aspect-[3/1]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].label}
              className="w-full h-full object-cover"
            />
            {/* Overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {/* Category Badge */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
              <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {slides[currentSlide].category}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-card/90 hover:bg-card rounded-full flex items-center justify-center shadow-soft transition-all hover:scale-110 border border-border"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-card/90 hover:bg-card rounded-full flex items-center justify-center shadow-soft transition-all hover:scale-110 border border-border"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 py-4 bg-secondary">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
