import { useEffect } from 'react';

/**
 * Custom hook that adds IntersectionObserver-based reveal animations.
 * Elements with class "reveal" will get "is-in" class when scrolled into view.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal:not(.is-in)');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px' }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    } else {
      // Fallback: show all immediately
      elements.forEach((el) => el.classList.add('is-in'));
    }
  });
}
