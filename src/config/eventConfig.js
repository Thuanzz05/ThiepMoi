// ========================================
// CẤU HÌNH SỰ KIỆN - Chỉnh sửa thông tin tại đây
// ========================================

const eventConfig = {
  // --- Thông tin chung ---
  title: 'TUẦN LỄ KHAI TRƯƠNG',
  organization: 'TRUNG TÂM GIAO DỊCH CÔNG NGHỆ XANH, ĐỔI MỚI SÁNG TẠO VÀ PHÁT TRIỂN BỀN VỮNG',
  eyebrow: 'GTISD · CAFE CÔNG NGHỆ XANH',
  logo: '/logo.png',
  registrationUrl: 'https://docs.google.com/spreadsheets/d/11zPgNVqSPDpFl5gqXH5m_b3GHgPjqhmYeDxjYGaFwaM/edit?usp=sharing',
  dateRange: '17/11 – 22/11/2026',
  openingHours: '08:30 – 17:00 mỗi ngày',

  // --- Thời gian ---
  date: '2026-11-17T08:30:00+07:00',
  endDate: '2026-11-22T17:00:00+07:00',
  dateDisplay: {
    day: '17–22',
    month: '11',
    year: '2026',
    weekday: 'Tuần lễ khai trương',
    time: '08:30 – 17:00',
  },
  whenText: '08:30 – 17:00 · 17/11 – 22/11/2026',

  // --- Địa điểm ---
  venue: {
    name: 'GTISD Hub · Cafe Công nghệ xanh',
    address: '40 P. Ngô Quyền, Cửa Nam, Hà Nội',
    fullAddress: 'GTISD Hub, 40 P. Ngô Quyền, Cửa Nam, Hà Nội',
    mapQuery: 'GTISD Hub, 40 P. Ngô Quyền, Cửa Nam, Hà Nội',
    mapLink: 'https://maps.app.goo.gl/iEWEKS6vqFuUwSmn8',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3346.008701406108!2d105.85162347476573!3d21.022553980625194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abece8d5218d%3A0xaa61796659aad162!2zNDAgUC4gTmfDtCBRdXnhu4FuLCBD4butYSBOYW0sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1793938357515!5m2!1svi!2s',
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
    quote: 'GTISD kiến tạo giá trị trong hệ sinh thái phát triển bền vững, sáng tạo và thúc đẩy các giải pháp phát triển bền vững trong mọi lĩnh vực kinh tế, môi trường và xã hội. GTISD Hub là nơi tổ chức các sự kiện, hội thảo, trưng bày các sản phẩm, ươm mầm, hỗ trợ hoạt động xúc tiến thương mại và đầu tư, khoa học công nghệ và chuyển giao, giao dịch tài chính xanh và bền vững.',
    signBy: 'Giới thiệu GTISD',
  },

  // --- Lịch trình ---
  agenda: [
    { title: 'Triển lãm sản phẩm công nghệ xanh' },
    { title: 'Không gian độc đáo và tương tác' },
    { title: 'Khám phá đột phá ngành công nghệ xanh' },
    { title: 'Học hỏi và hợp tác' },
    { title: 'Ưu đãi ra mắt' },
  ],

  // --- Thông tin thêm ---
  additionalInfo: [
    { label: 'Tham quan', value: 'Tự do trong tuần lễ khai trương' },
  ],

  // --- Lời cảm ơn ---
  thanks: {
    text: 'Hân hạnh chào đón Quý khách!',
    subText: 'Cùng khám phá những giải pháp cho tương lai bền vững.',
    signBy: 'GTISD Hub',
  },

  // --- Theme (màu sắc) ---
  theme: {
    bg: '#146c70',
    sf: '#146c70',
    ink: '#ffffff',
    soft: '#ffffff',
    ac: '#ffffff',
  },

  // --- Ảnh thiệp ---
  cardImage: '/cafe.png',
};

export default eventConfig;
