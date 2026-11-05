// ========================================
// CẤU HÌNH SỰ KIỆN - Chỉnh sửa thông tin tại đây
// ========================================

const eventConfig = {
  // --- Thông tin chung ---
  title: 'Hội nghị Khách hàng 2026',
  organization: 'Công ty Cổ phần ABC',
  eyebrow: 'Trân trọng kính mời',

  // --- Thời gian ---
  date: '2026-11-19T18:30:00+07:00',
  dateDisplay: {
    day: '19',
    month: '11',
    year: '2026',
    weekday: 'Thứ Năm',
    time: '18:30',
  },
  whenText: '18:30 · Thứ Năm 19/11/2026',

  // --- Địa điểm ---
  venue: {
    name: 'Trung tâm Hội nghị White Palace',
    address: '194 Hoàng Văn Thụ, Phú Nhuận, TP.HCM',
    fullAddress: 'Trung tâm Hội nghị White Palace, 194 Hoàng Văn Thụ, Phú Nhuận, TP.HCM',
    mapQuery: 'Trung tâm Hội nghị White Palace, 194 Hoàng Văn Thụ, Phú Nhuận, TP.HCM',
  },

  // --- Phong bì ---
  envelope: {
    sealLetter: 'A',
    recipientLabel: 'Kính gửi',
    recipientName: 'Quý khách',
    letterLabel: 'Trân trọng kính mời',
  },

  // --- Lời nhắn ---
  message: {
    quote: 'Sự hiện diện của Quý vị là niềm vinh hạnh của chúng tôi.',
    signBy: 'Ban tổ chức',
  },

  // --- Lịch trình ---
  agenda: [
    { title: 'Đón khách' },
    { title: 'Khai mạc' },
  ],

  // --- Thông tin thêm ---
  additionalInfo: [
    { label: 'Trang phục', value: 'Lịch sự' },
  ],

  // --- Lời cảm ơn ---
  thanks: {
    text: 'Rất hân hạnh được đón tiếp!',
    subText: 'Cảm ơn bạn',
    signBy: 'Ban tổ chức',
  },

  // --- Theme (màu sắc) ---
  theme: {
    bg: '#0f1a2e',
    sf: '#18263f',
    ink: '#ffffff',
    soft: '#b6c3dc',
    ac: '#5fb2ff',
  },

  // --- Ảnh thiệp ---
  cardImage: 'https://api-event.tickmi.com/api/v1/invite-cards/vwvxydp/img/og?v=637',
};

export default eventConfig;
