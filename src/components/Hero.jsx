import { useConfig } from '../context/EventConfigContext';

export default function Hero() {
  const { config } = useConfig();
  return (
    <header className="c-hero">
      <div className="c-hero-in">
        <p className="c-org">{config.organization}</p>
        <p className="c-eyebrow">{config.eyebrow}</p>
        <h1 className="c-title">{config.title}</h1>
        <p className="c-date">
          <span>{config.dateDisplay.day}</span>
          <i></i>
          <span>{config.dateDisplay.month}</span>
          <i></i>
          <span>{config.dateDisplay.year}</span>
        </p>
        <p className="c-time">{config.dateDisplay.time} · {config.dateDisplay.weekday}</p>
        <p className="c-place">{config.venue.name}</p>
      </div>
      <a className="c-scroll" href="#noi-dung" aria-label="Xem thiệp">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </header>
  );
}
