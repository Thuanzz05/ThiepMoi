import { useConfig } from '../context/EventConfigContext';

export default function InvitationCard() {
  const { config } = useConfig();
  return (
    <section className="c-sec c-card reveal">
      <img
        src={config.cardImage}
        alt={`Thiệp mời ${config.title}`}
        width="1080"
        height="1350"
        loading="lazy"
      />
      <a
        className="c-btn c-btn-ghost"
        href={config.cardImage}
        download={`thiep-moi-${config.title}.jpg`}
      >
        Tải ảnh thiệp
      </a>
    </section>
  );
}
