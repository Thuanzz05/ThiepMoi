const groups = [
  {
    title: 'BẢO TRỢ/ĐỒNG HÀNH',
    logos: [
      ['/baotro1.png', 'Liên Hợp Quốc'],
      ['/baotro2.png', 'BRICS'],
      ['/baotro3.png', 'The ESG Institute'],
      ['/baotro4.png', 'Viện Khoa học và Công nghệ'],
      ['/baotro5.png', 'VCCI'],
    ],
  },
  {
    title: 'ĐỒNG HÀNH/ĐỐI TÁC',
    logos: [
      ['/donghanh1.png', 'Oxfam'],
      ['/donghanh2.png', 'JICA'],
      ['/donghanh3.png', 'Viettel'],
      ['/donghanh4.png', 'Vingroup'],
      ['/donghanh5.png', 'UOB'],
    ],
  },
  {
    title: 'ĐƠN VỊ TRUYỀN THÔNG',
    logos: [
      ['/donvitruyenthong1.png', 'VTV'],
      ['/donvitruyenthong2.png', 'Dân Trí'],
      ['/donvitruyenthong3.jpg', 'VnExpress'],
      ['/donvitruyenthong4.png', 'Nhân Dân'],
      ['/donvitruyenthong5.webp', 'VietnamNet'],
    ],
  },
];

export default function Partners() {
  return (
    <section className="c-sec reveal">
      <p className="c-eyebrow">Cùng kiến tạo giá trị</p>
      <h2 className="c-h2">Đơn vị đồng hành &amp; đối tác</h2>
      {groups.map((group) => (
        <div className="c-partner-group" key={group.title}>
          <h3 className="c-partner-title">{group.title}</h3>
          <div className="c-partner-grid">
            {group.logos.map(([src, name]) => (
              <div className="c-partner-logo" key={src}>
                <img src={src} alt={name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
