import { useEffect, useRef } from 'react';

export default function useScrollAnimation(selector = '.animate-on-scroll', staggerDelay = 0.08) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(selector);
    if (!items.length) return;

    items.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
      el.style.transitionDelay = `${index * staggerDelay}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, staggerDelay]);

  return containerRef;
}
