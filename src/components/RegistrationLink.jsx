import { useConfig } from '../context/EventConfigContext';

export default function RegistrationLink() {
  const { config } = useConfig();
  return (
    <section className="c-sec reveal">
      <p className="c-eyebrow">Tham gia cùng chúng tôi</p>
      <h2 className="c-h2">Đăng ký tham dự</h2>
      <a className="c-qr-link" href={config.registrationUrl} target="_blank" rel="noopener noreferrer">
        <img className="c-qr" src="/qrcode.png" alt="Mã QR mở trang đăng ký tham dự GTISD" width="240" height="240" loading="lazy" />
      </a>
      <p className="c-qr-hint">Quét mã QR để mở trang đăng ký</p>
      <a className="c-btn c-btn-lg" href={config.registrationUrl} target="_blank" rel="noopener noreferrer">
        Mở form đăng ký
      </a>
    </section>
  );
}
