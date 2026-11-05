import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../context/EventConfigContext';
import './admin.css';

/* ---- Accordion Section ---- */
function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="adm-section">
      <button
        type="button"
        className={`adm-section-btn${open ? ' is-open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        {title}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className={`adm-section-body${open ? ' is-open' : ''}`}>{children}</div>
    </div>
  );
}

/* ---- Text field helper ---- */
function Field({ label, value, onChange, type = 'text', multiline = false }) {
  return (
    <div className="adm-field">
      <label>{label}</label>
      {multiline ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

/* ---- Color field helper ---- */
function ColorField({ label, value, onChange }) {
  return (
    <div className="adm-color">
      <label>{label}</label>
      <input type="color" value={value || '#000000'} onChange={(e) => onChange(e.target.value)} />
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        maxLength={7}
      />
    </div>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { config, replaceConfig, resetConfig } = useConfig();
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(config)));
  const [toast, setToast] = useState('');

  // Sync draft when config changes externally
  useEffect(() => {
    setDraft(JSON.parse(JSON.stringify(config)));
  }, [config]);

  // Set page title
  useEffect(() => {
    document.title = 'Quản trị thiệp mời';
  }, []);

  // Helpers to update draft
  const set = useCallback((path, value) => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }, []);

  const handleSave = useCallback(() => {
    replaceConfig(draft);
    showToast('✓ Đã lưu thay đổi');
  }, [draft, replaceConfig, showToast]);

  const handleReset = useCallback(() => {
    if (window.confirm('Reset tất cả về mặc định?')) {
      resetConfig();
      showToast('↺ Đã khôi phục mặc định');
    }
  }, [resetConfig, showToast]);

  /* ---- Agenda list helpers ---- */
  const addAgendaItem = () => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.agenda.push({ title: '', description: '' });
      return next;
    });
  };
  const removeAgendaItem = (index) => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.agenda.splice(index, 1);
      return next;
    });
  };
  const updateAgendaItem = (index, field, value) => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.agenda[index][field] = value;
      return next;
    });
  };

  /* ---- AdditionalInfo list helpers ---- */
  const addInfoItem = () => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.additionalInfo) next.additionalInfo = [];
      next.additionalInfo.push({ label: '', value: '' });
      return next;
    });
  };
  const removeInfoItem = (index) => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.additionalInfo.splice(index, 1);
      return next;
    });
  };
  const updateInfoItem = (index, field, value) => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.additionalInfo[index][field] = value;
      return next;
    });
  };

  return (
    <div className="adm-page">
      {/* Header */}
      <header className="adm-page-header">
        <div className="adm-page-header-in">
          <div>
            <h1>⚙️ Quản trị thiệp mời</h1>
            <p>Chỉnh sửa nội dung, màu sắc và bản đồ</p>
          </div>
          <button
            type="button"
            className="c-btn c-btn-ghost c-btn-sm"
            onClick={() => navigate('/')}
          >
            ← Xem thiệp
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="adm-page-body">
        <div className="adm-page-content">
          {/* 1. Thông tin chung */}
          <Section title="📋 Thông tin chung" defaultOpen={true}>
            <Field label="Tên sự kiện" value={draft.title} onChange={(v) => set('title', v)} />
            <Field label="Tổ chức" value={draft.organization} onChange={(v) => set('organization', v)} />
            <Field label="Dòng chữ trên (eyebrow)" value={draft.eyebrow} onChange={(v) => set('eyebrow', v)} />
          </Section>

          {/* 2. Thời gian */}
          <Section title="📅 Thời gian">
            <Field label="Ngày ISO (dùng cho countdown)" value={draft.date} onChange={(v) => set('date', v)} type="text" />
            <Field label="Ngày" value={draft.dateDisplay?.day} onChange={(v) => set('dateDisplay.day', v)} />
            <Field label="Tháng" value={draft.dateDisplay?.month} onChange={(v) => set('dateDisplay.month', v)} />
            <Field label="Năm" value={draft.dateDisplay?.year} onChange={(v) => set('dateDisplay.year', v)} />
            <Field label="Thứ" value={draft.dateDisplay?.weekday} onChange={(v) => set('dateDisplay.weekday', v)} />
            <Field label="Giờ" value={draft.dateDisplay?.time} onChange={(v) => set('dateDisplay.time', v)} />
            <Field label="Dòng hiển thị (whenText)" value={draft.whenText} onChange={(v) => set('whenText', v)} />
          </Section>

          {/* 3. Địa điểm */}
          <Section title="📍 Địa điểm">
            <Field label="Tên địa điểm" value={draft.venue?.name} onChange={(v) => set('venue.name', v)} />
            <Field label="Địa chỉ ngắn" value={draft.venue?.address} onChange={(v) => set('venue.address', v)} />
            <Field label="Địa chỉ đầy đủ" value={draft.venue?.fullAddress} onChange={(v) => set('venue.fullAddress', v)} />
            <Field label="Từ khóa tìm trên Google Maps" value={draft.venue?.mapQuery} onChange={(v) => set('venue.mapQuery', v)} />
          </Section>

          {/* 4. Phong bì */}
          <Section title="✉️ Phong bì">
            <Field label="Chữ trên con dấu" value={draft.envelope?.sealLetter} onChange={(v) => set('envelope.sealLetter', v)} />
            <Field label="Dòng gửi tới" value={draft.envelope?.recipientLabel} onChange={(v) => set('envelope.recipientLabel', v)} />
            <Field label="Tên người nhận" value={draft.envelope?.recipientName} onChange={(v) => set('envelope.recipientName', v)} />
            <Field label="Dòng trong thư" value={draft.envelope?.letterLabel} onChange={(v) => set('envelope.letterLabel', v)} />
          </Section>

          {/* 5. Lời nhắn */}
          <Section title="💬 Lời nhắn">
            <Field label="Câu trích dẫn" value={draft.message?.quote} onChange={(v) => set('message.quote', v)} multiline />
            <Field label="Ký tên" value={draft.message?.signBy} onChange={(v) => set('message.signBy', v)} />
          </Section>

          {/* 6. Lịch trình */}
          <Section title="🕐 Lịch trình">
            {(draft.agenda || []).map((item, i) => (
              <div className="adm-list-item" key={i}>
                <div className="adm-list-fields">
                  <input
                    placeholder="Tiêu đề (VD: Đón khách)"
                    value={item.title || ''}
                    onChange={(e) => updateAgendaItem(i, 'title', e.target.value)}
                  />
                  <input
                    placeholder="Mô tả (tùy chọn)"
                    value={item.description || ''}
                    onChange={(e) => updateAgendaItem(i, 'description', e.target.value)}
                  />
                </div>
                <button type="button" className="adm-list-remove" onClick={() => removeAgendaItem(i)} aria-label="Xóa">
                  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 14, height: 14 }}>
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button type="button" className="adm-list-add" onClick={addAgendaItem}>
              + Thêm mục
            </button>
          </Section>

          {/* 7. Thông tin thêm */}
          <Section title="ℹ️ Thông tin thêm">
            {(draft.additionalInfo || []).map((item, i) => (
              <div className="adm-list-item" key={i}>
                <div className="adm-list-fields">
                  <input
                    placeholder="Nhãn (VD: Trang phục)"
                    value={item.label || ''}
                    onChange={(e) => updateInfoItem(i, 'label', e.target.value)}
                  />
                  <input
                    placeholder="Nội dung (VD: Lịch sự)"
                    value={item.value || ''}
                    onChange={(e) => updateInfoItem(i, 'value', e.target.value)}
                  />
                </div>
                <button type="button" className="adm-list-remove" onClick={() => removeInfoItem(i)} aria-label="Xóa">
                  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 14, height: 14 }}>
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button type="button" className="adm-list-add" onClick={addInfoItem}>
              + Thêm mục
            </button>
          </Section>

          {/* 8. Lời cảm ơn */}
          <Section title="🙏 Lời cảm ơn">
            <Field label="Dòng chính" value={draft.thanks?.text} onChange={(v) => set('thanks.text', v)} />
            <Field label="Dòng phụ" value={draft.thanks?.subText} onChange={(v) => set('thanks.subText', v)} />
            <Field label="Ký tên" value={draft.thanks?.signBy} onChange={(v) => set('thanks.signBy', v)} />
          </Section>

          {/* 9. Màu sắc */}
          <Section title="🎨 Màu sắc">
            <ColorField label="Nền (bg)" value={draft.theme?.bg} onChange={(v) => set('theme.bg', v)} />
            <ColorField label="Bề mặt (sf)" value={draft.theme?.sf} onChange={(v) => set('theme.sf', v)} />
            <ColorField label="Chữ (ink)" value={draft.theme?.ink} onChange={(v) => set('theme.ink', v)} />
            <ColorField label="Chữ mờ (soft)" value={draft.theme?.soft} onChange={(v) => set('theme.soft', v)} />
            <ColorField label="Nhấn (ac)" value={draft.theme?.ac} onChange={(v) => set('theme.ac', v)} />
          </Section>

          {/* 10. Ảnh thiệp */}
          <Section title="🖼️ Ảnh thiệp">
            <Field label="URL ảnh thiệp" value={draft.cardImage} onChange={(v) => set('cardImage', v)} type="url" />
            <div className="adm-preview">
              {draft.cardImage ? (
                <img src={draft.cardImage} alt="Preview" onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <div className="adm-preview-empty">Chưa có ảnh</div>
              )}
            </div>
          </Section>
        </div>
      </div>

      {/* Bottom sticky actions */}
      <div className="adm-page-actions">
        <div className="adm-page-actions-in">
          <button type="button" className="c-btn c-btn-lg" onClick={handleSave}>
            💾 Lưu thay đổi
          </button>
          <button type="button" className="c-btn c-btn-lg c-btn-ghost" onClick={handleReset}>
            ↺ Reset mặc định
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && <div className="adm-toast">{toast}</div>}
    </div>
  );
}
