import { useConfig } from '../context/EventConfigContext';

const calendarDate = (value) => value.slice(0, 19).replace(/[-:]/g, '');

function buildCalendarUrl(config) {
  const details = `${config.openingHours}\n\n${config.message.quote}\n\n${window.location.origin}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${config.title} · GTISD Hub`,
    dates: `${calendarDate(config.date)}/${calendarDate(config.endDate)}`,
    ctz: 'Asia/Ho_Chi_Minh',
    location: config.venue.fullAddress,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function downloadICS(config) {
  const escapeICS = (value) => String(value || '').replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\r?\n/g, '\\n');
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const body = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//GTISD//Opening Week//VI', 'BEGIN:VEVENT',
    'UID:gtisd-opening-week@gtisd', `DTSTAMP:${timestamp}`,
    `DTSTART;TZID=Asia/Ho_Chi_Minh:${calendarDate(config.date)}`,
    `DTEND;TZID=Asia/Ho_Chi_Minh:${calendarDate(config.endDate)}`,
    `SUMMARY:${escapeICS(`${config.title} · GTISD Hub`)}`,
    `LOCATION:${escapeICS(config.venue.fullAddress)}`,
    `DESCRIPTION:${escapeICS(`${config.openingHours}\n${config.message.quote}`)}`,
    'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', `DESCRIPTION:${escapeICS(config.title)}`, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([body], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'gtisd-tuan-le-khai-truong.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export default function EventDetails() {
  const { config } = useConfig();

  return (
    <section className="c-sec reveal" id="dia-diem">
      <div className="c-when">
        {/* Date section */}
        <div className="c-when-date">
          <b>{config.dateDisplay.day}</b>
          <span>tháng {config.dateDisplay.month} · {config.dateDisplay.year}</span>
          <em>{config.openingHours}</em>
        </div>

        {/* Place section */}
        <div className="c-when-place">
          <h3>{config.venue.name}</h3>
          <p>{config.venue.address}</p>
        </div>

        <div className="c-when-acts">
          <a className="c-btn c-btn-sm c-btn-map" href={config.venue.mapLink} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            Chỉ đường
          </a>
          <a className="c-btn c-btn-sm c-btn-calendar" href={buildCalendarUrl(config)} target="_blank" rel="noopener noreferrer">
            Lưu lịch
          </a>
          <button type="button" className="c-btn c-btn-sm c-btn-ics" onClick={() => downloadICS(config)}>
            Lịch điện thoại
          </button>
        </div>

        <div className="c-map">
          <iframe src={config.venue.embedUrl} title="Bản đồ Google Maps GTISD Hub" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div>
      </div>
    </section>
  );
}
