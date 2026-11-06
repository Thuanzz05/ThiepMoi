import { useConfig } from '../context/EventConfigContext';

export default function Hero() {
  const { config } = useConfig();
  return (
    <header className="c-hero">
      <div className="c-hero-in">
        <div className="c-brand">
          <img src={config.logo} alt="Logo GTISD" width="64" height="64" />
          <p className="c-org">{config.organization.replace(', ', ',\n')}</p>
        </div>
        <p className="c-eyebrow">{config.eyebrow}</p>
        <h1 className="c-title">{config.title}</h1>
        <p className="c-date">{config.dateRange}</p>
        <p className="c-time">{config.openingHours}</p>
        <p className="c-place">{config.venue.name}<br />{config.venue.address}</p>
      </div>
      <a className="c-scroll" href="#noi-dung" aria-label="Xem thiệp">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </header>
  );
}
