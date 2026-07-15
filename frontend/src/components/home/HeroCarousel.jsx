import { useState, useEffect } from "react";

const SLIDE_INTERVAL = 4000;

function HeroCarousel({ images = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-r-[2rem]">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`AIDAS model ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Subtle bottom gradient so dots stay readable over any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent pointer-events-none" />

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Show slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;