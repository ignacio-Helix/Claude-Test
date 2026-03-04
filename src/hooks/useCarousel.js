import { useState, useEffect, useRef, useCallback } from 'react';

export default function useCarousel(totalSlides, interval = 5000) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent(((index % totalSlides) + totalSlides) % totalSlides);
  }, [totalSlides]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const resetAutoplay = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % totalSlides);
    }, interval);
  }, [totalSlides, interval]);

  useEffect(() => {
    resetAutoplay();
    return () => clearInterval(timerRef.current);
  }, [resetAutoplay]);

  const goToAndReset = useCallback((index) => {
    goTo(index);
    resetAutoplay();
  }, [goTo, resetAutoplay]);

  const nextAndReset = useCallback(() => {
    next();
    resetAutoplay();
  }, [next, resetAutoplay]);

  const prevAndReset = useCallback(() => {
    prev();
    resetAutoplay();
  }, [prev, resetAutoplay]);

  return { current, goTo: goToAndReset, next: nextAndReset, prev: prevAndReset };
}
