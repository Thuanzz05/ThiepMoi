import { useState, useEffect, useCallback } from 'react';
import { useConfig } from '../context/EventConfigContext';

function getCountdownText(dateStr) {
  const at = new Date(dateStr).getTime();
  const ms = at - Date.now();
  if (ms > 864e5 * 1.5) return { text: `Còn ${Math.ceil(ms / 864e5)} ngày`, isLive: false };
  if (ms > 36e5) return { text: `Còn ${Math.ceil(ms / 36e5)} giờ`, isLive: false };
  if (ms > 0) return { text: 'Sắp bắt đầu', isLive: true };
  if (ms > -5 * 36e5) return { text: 'Đang diễn ra', isLive: true };
  return { text: 'Đã diễn ra', isLive: false };
}

function buildGCalUrl(config) {
  const d = config.dateDisplay;
  const startStr = `${d.year}${d.month}${d.day}T${d.time.replace(':', '')}00`;
  const endDate = new Date(new Date(config.date).getTime() + 3 * 36e5);
  const e2 = new Date(endDate.getTime() + 7 * 36e5);
  const z = (n) => String(n).padStart(2, '0');
  const endStr = `${e2.getUTCFullYear()}${z(e2.getUTCMonth() + 1)}${z(e2.getUTCDate())}T${z(e2.getUTCHours())}${z(e2.getUTCMinutes())}00`;
  const details = (config.message.quote || '') + '\n\n' + window.location.href.split('#')[0];
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(config.title)}&dates=${startStr}/${endStr}&ctz=Asia/Ho_Chi_Minh&location=${encodeURIComponent(config.venue.fullAddress)}&details=${encodeURIComponent(details)}`;
}

function downloadICS(config) {
  const d = config.dateDisplay;
  const startStr = `${d.year}${d.month}${d.day}T${d.time.replace(':', '')}00`;
  const endDate = new Date(new Date(config.date).getTime() + 3 * 36e5);
  const e2 = new Date(endDate.getTime() + 7 * 36e5);
  const z = (n) => String(n).padStart(2, '0');
  const endStr = `${e2.getUTCFullYear()}${z(e2.getUTCMonth() + 1)}${z(e2.getUTCDate())}T${z(e2.getUTCHours())}${z(e2.getUTCMinutes())}00`;
  const q = (s) => String(s || '').replace(/[\\;,]/g, '\\$&').replace(/\n/g, '\\n');
  const body = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ThiepMoi//Invite//VI', 'BEGIN:VEVENT',
    'UID:thiepmoi@local', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z',
    'DTSTART;TZID=Asia/Ho_Chi_Minh:' + startStr,
    'DTEND;TZID=Asia/Ho_Chi_Minh:' + endStr,
    'SUMMARY:' + q(config.title),
    'LOCATION:' + q(config.venue.fullAddress),
    'DESCRIPTION:' + q(config.message.quote),
    'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:' + q(config.title), 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR'
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }));
  a.download = 'thiep-moi.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

export default function EventDetails() {
  const { config } = useConfig();
  const [countdown, setCountdown] = useState(() => getCountdownText(config.date));
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setCountdown(getCountdownText(config.date));
    const timer = setInterval(() => {
      setCountdown(getCountdownText(config.date));
    }, 60000);
    return () => clearInterval(timer);
  }, [config.date]);

  const handleMapEmbed = useCallback(() => {
    setMapLoaded(true);
  }, []);

  // Reset map when mapQuery changes
  useEffect(() => {
    setMapLoaded(false);
  }, [config.venue.mapQuery]);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.venue.fullAddress)}`;

  return (
    <section className="c-sec reveal" id="dia-diem">
      <div className="c-when">
        {/* Date section */}
        <div className="c-when-date">
          <span className={`c-when-chip${countdown.isLive ? ' is-live' : ''}`}>
            {countdown.text}
          </span>
          <b>{config.dateDisplay.day}</b>
          <span>tháng {config.dateDisplay.month} · {config.dateDisplay.year}</span>
          <em>{config.dateDisplay.weekday} · {config.dateDisplay.time}</em>
        </div>

        {/* Place section */}
        <div className="c-when-place">
          <h3>{config.venue.name}</h3>
          <p>{config.venue.address}</p>
        </div>

        {/* Action buttons */}
        <div className="c-when-acts">
          <a className="c-btn c-btn-sm" href={buildGCalUrl(config)} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="5" width="17" height="15" rx="3" />
              <path d="M3.5 10h17M8 3v4M16 3v4" />
            </svg>
            Lưu lịch
          </a>
          <button type="button" className="c-btn c-btn-sm c-btn-ghost" onClick={() => downloadICS(config)}>
            Lịch điện thoại
          </button>
          <a className="c-btn c-btn-sm c-btn-ghost" href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            Chỉ đường
          </a>
        </div>

        {/* Map */}
        <div className="c-map">
          {mapLoaded ? (
            <iframe
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ"
              src={`https://www.google.com/maps?q=${encodeURIComponent(config.venue.mapQuery)}&output=embed`}
            />
          ) : (
            <button type="button" className="c-link" onClick={handleMapEmbed}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              Xem bản đồ ngay tại đây
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
