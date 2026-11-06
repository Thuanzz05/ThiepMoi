import { useConfig } from '../context/EventConfigContext';

export default function Message() {
  const { config } = useConfig();
  return (
    <section className="c-sec c-msg reveal">
      <p className="c-eyebrow">Giới thiệu GTISD</p>
      <p className="c-intro">{config.message.quote}</p>
    </section>
  );
}
