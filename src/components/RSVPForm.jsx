import { useState, useCallback, useEffect } from 'react';
import { useConfig } from '../context/EventConfigContext';

const STORAGE_KEY = 'tk-card-rsvp';

export default function RSVPForm() {
  const { config } = useConfig();
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('');
  const [partySize, setPartySize] = useState('1');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msgText, setMsgText] = useState('');
  const [msgType, setMsgType] = useState('');
  const [nameError, setNameError] = useState(false);
  const [submitted, setSubmitted] = useState(null); // { att, party, at }
  const [showForm, setShowForm] = useState(true);

  // Load saved RSVP
  useEffect(() => {
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (prev && prev.att) {
        setSubmitted(prev);
        setShowForm(false);
        setAttending(prev.att);
        if (prev.party) setPartySize(String(prev.party));
      }
    } catch (e) { /* ignore */ }
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Honeypot check
    if (honeypot) return;

    const trimmedName = name.trim();
    setNameError(!trimmedName);

    if (!trimmedName) {
      setMsgText('Bạn cho chủ thiệp biết tên nhé.');
      setMsgType('is-err');
      return;
    }

    if (!attending) {
      setMsgText('Bạn chọn có tham dự hay không nhé.');
      setMsgType('is-err');
      return;
    }

    setIsSubmitting(true);
    setMsgText('');
    setMsgType('');

    // Simulate API call with setTimeout
    setTimeout(() => {
      const rsvpData = {
        att: attending,
        party: attending !== 'NO' ? parseInt(partySize) : null,
        at: Date.now(),
        name: trimmedName,
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvpData));
      } catch (e) { /* ignore */ }

      setSubmitted(rsvpData);
      setShowForm(false);
      setIsSubmitting(false);
    }, 800);
  }, [name, attending, partySize, phone, honeypot, isSubmitting]);

  const handleChangeAnswer = useCallback(() => {
    setSubmitted(null);
    setShowForm(true);
  }, []);

  const getStatusLabel = () => {
    if (!submitted) return '';
    const labels = {
      YES: 'Bạn đã xác nhận sẽ tham dự',
      MAYBE: 'Bạn đã báo sẽ cố gắng sắp xếp',
      NO: 'Bạn đã báo không tham dự được',
    };
    return labels[submitted.att] || '';
  };

  const getHeadLabel = () => {
    if (!submitted) return '';
    if (submitted.att === 'YES') return 'Hẹn gặp bạn nhé!';
    if (submitted.att === 'MAYBE') return 'Cảm ơn bạn!';
    if (submitted.att === 'NO') return 'Cảm ơn bạn đã báo!';
    return 'Cảm ơn!';
  };

  return (
    <section className="c-sec reveal" id="xac-nhan">
      <h2 className="c-h2">Bạn sẽ đến chứ?</h2>

      <div className="c-pass-slot"></div>

      {/* Submitted: show pass or done card */}
      {submitted && !showForm && (
        <div className="c-pass-wrap">
          {(submitted.att === 'YES' || submitted.att === 'MAYBE') ? (
            <>
              <div className="c-pass" role="img" aria-label="Xác nhận tham dự của bạn">
                <div className="c-pass-top">
                  <small>{submitted.att === 'YES' ? 'Đã xác nhận tham dự' : 'Sẽ cố gắng tham dự'}</small>
                  <b>{submitted.name || 'Quý khách'}</b>
                  <span>{config.title}</span>
                </div>
                <div className="c-pass-bot">
                  <div>
                    <small>Thời gian</small>
                    {config.whenText}
                  </div>
                  <div>
                    <small>Số người</small>
                    {submitted.party || 1} người
                  </div>
                  <div className="is-wide">
                    <small>Địa điểm</small>
                    {config.venue.name}
                  </div>
                </div>
              </div>
              <p className="c-pass-note">
                Mở lại link này bất cứ lúc nào để xem giờ và đường đi.
              </p>
            </>
          ) : (
            <div className="c-done">
              <b>{getHeadLabel()}</b>
              <span className="c-muted">
                {submitted.at
                  ? `Bạn đã trả lời lúc ${new Date(submitted.at).toLocaleString('vi-VN', {
                      hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit'
                    })}.`
                  : 'Chủ thiệp đã nhận được phản hồi của bạn.'}
              </span>
            </div>
          )}
          <p style={{ marginTop: '16px' }}>
            <button type="button" className="c-btn c-btn-ghost c-btn-sm" onClick={handleChangeAnswer}>
              Đổi câu trả lời
            </button>
          </p>
        </div>
      )}

      {/* RSVP Form */}
      {showForm && (
        <form className="c-form" noValidate onSubmit={handleSubmit}>
          <label>
            <span className="c-req">Tên của bạn</span>
            <input
              name="name"
              maxLength={80}
              required
              autoComplete="name"
              placeholder="Nguyễn Văn An"
              value={name}
              onChange={(e) => { setName(e.target.value); setNameError(false); }}
              className={nameError ? 'is-bad' : ''}
            />
          </label>

          <fieldset>
            <legend className="c-sr">Tham dự</legend>
            <div className="c-answer">
              <label>
                <input
                  type="radio"
                  name="attending"
                  value="YES"
                  checked={attending === 'YES'}
                  onChange={(e) => setAttending(e.target.value)}
                />
                <span>
                  <i>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                  </i>
                  Sẽ đến
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="attending"
                  value="MAYBE"
                  checked={attending === 'MAYBE'}
                  onChange={(e) => setAttending(e.target.value)}
                />
                <span>
                  <i>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M12 7.5V12l3 2" />
                    </svg>
                  </i>
                  Cố gắng
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="attending"
                  value="NO"
                  checked={attending === 'NO'}
                  onChange={(e) => setAttending(e.target.value)}
                />
                <span>
                  <i>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 7l10 10M17 7 7 17" />
                    </svg>
                  </i>
                  Không đến
                </span>
              </label>
            </div>
          </fieldset>

          <label className={`c-party${attending === 'NO' ? ' is-hidden' : ''}`}>
            <span>Bạn đi mấy người?</span>
            <select
              name="partySize"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
            >
              <option value="1">1 người</option>
              <option value="2">2 người</option>
              <option value="3">3 người</option>
              <option value="4">4 người</option>
              <option value="5">5 người</option>
              <option value="6">6 người trở lên</option>
            </select>
          </label>

          <label>
            <span>Số điện thoại</span>
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              maxLength={20}
              autoComplete="tel"
              placeholder="0901 234 567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          {/* Honeypot */}
          <input
            className="c-hp"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />

          <button type="submit" className="c-btn c-btn-lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="c-spin"></span> Đang gửi…
              </>
            ) : (
              'Gửi câu trả lời'
            )}
          </button>

          {msgText && (
            <p className={`c-form-msg ${msgType}`} role="status" aria-live="polite">
              {msgText}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
