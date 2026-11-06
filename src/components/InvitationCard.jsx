import { useConfig } from '../context/EventConfigContext';

export default function InvitationCard() {
  const { config } = useConfig();
  return (
    <section className="c-sec c-card reveal">
      <img src={config.cardImage} alt="Không gian cafe công nghệ xanh GTISD" width="900" height="600" loading="lazy" />
    </section>
  );
}
