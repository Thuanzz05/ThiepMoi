import { useConfig } from '../context/EventConfigContext';

export default function Message() {
  const { config } = useConfig();
  return (
    <section className="c-sec c-msg reveal">
      <p className="c-quote">{config.message.quote}</p>
      <p className="c-sign">{config.message.signBy}</p>
    </section>
  );
}
