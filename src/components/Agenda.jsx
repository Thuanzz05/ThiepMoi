import { useConfig } from '../context/EventConfigContext';

export default function Agenda() {
  const { config } = useConfig();
  return (
    <section className="c-sec reveal">
      <p className="c-eyebrow">Khám phá GTISD Hub</p>
      <h2 className="c-h2">Trải nghiệm tại đây</h2>
      <ol className="c-agenda">
        {config.agenda.map((item, index) => (
          <li key={index}>
            <span className="c-dot" aria-hidden="true"></span>
            <div>
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
