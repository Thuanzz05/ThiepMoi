import { useConfig } from '../context/EventConfigContext';

export default function AdditionalInfo() {
  const { config } = useConfig();
  if (!config.additionalInfo || config.additionalInfo.length === 0) return null;

  return (
    <section className="c-sec reveal">
      <p className="c-eyebrow">Mời bạn ghé thăm</p>
      <h2 className="c-h2">Thông tin tham quan</h2>
      <dl className="c-info">
        {config.additionalInfo.map((info, index) => (
          <div key={index}>
            <dt>{info.label}</dt>
            <dd>{info.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
