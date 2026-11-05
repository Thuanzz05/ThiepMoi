import { useState, useEffect, useCallback } from 'react';
import { useConfig } from '../context/EventConfigContext';

export default function Envelope({ onOpen }) {
  const { config } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    // Check if already seen this session
    try {
      const seen = sessionStorage.getItem('tk-card-env');
      if (seen === '1') {
        setIsGone(true);
        onOpen();
        return;
      }
    } catch (e) { /* ignore */ }
    // Lock scroll
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [onOpen]);

  const handleOpen = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    try { sessionStorage.setItem('tk-card-env', '1'); } catch (e) { /* ignore */ }
    document.documentElement.style.overflow = '';
    setTimeout(() => {
      setIsGone(true);
      onOpen();
    }, 3950);
  }, [isOpen, onOpen]);

  if (isGone) return null;

  return (
    <div className={`c-env${isOpen ? ' is-open' : ''}`} role="dialog" aria-label="Phong bì thiệp">
      <div className="c-env-in" onClick={handleOpen}>
        <div className="c-env-back"></div>
        <div className="c-env-letter">
          <small>{config.envelope.letterLabel}</small>
          <b>{config.title}</b>
        </div>
        <div className="c-env-front">
          <p>
            <small>{config.envelope.recipientLabel}</small>
            <b>{config.envelope.recipientName}</b>
          </p>
        </div>
        <div className="c-env-flap"></div>
        <span className="c-env-seal" aria-hidden="true">{config.envelope.sealLetter}</span>
      </div>
      <button type="button" className="c-btn c-btn-lg c-env-open" onClick={handleOpen}>
        Mở thiệp
      </button>
    </div>
  );
}
