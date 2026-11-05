import { useState, useEffect } from 'react';

export default function BottomDock() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.c-hero');
    if (!hero) return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > hero.offsetHeight * 0.6);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`c-dock${isVisible ? ' is-on' : ''}`} aria-label="Lối tắt">
      <a href="#xac-nhan">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
        <span>Trả lời</span>
      </a>
      <a href="#dia-diem">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        <span>Đường đi</span>
      </a>
    </nav>
  );
}
