import { useConfig } from '../context/EventConfigContext';

export default function ThankYou() {
  const { config } = useConfig();
  return (
    <section className="c-sec c-thanks reveal">
      <p>{config.thanks.text}</p>
      <p className="c-muted">{config.thanks.subText}</p>
      <p className="c-sign">{config.thanks.signBy}</p>
    </section>
  );
}
