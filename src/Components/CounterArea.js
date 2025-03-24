import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CounterArea = ({ counterSection, counters, api }) => {
  const { t } = useTranslation();
  const [animatedCounters, setAnimatedCounters] = useState([]);

  useEffect(() => {
    if (!counters.length) return;

    setAnimatedCounters(counters.map((counter) => ({ id: counter.id, value: 0 })));

    const interval = setInterval(() => {
      setAnimatedCounters((prev) =>
        prev.map((item) => {
          const original = counters.find((counter) => counter.id === item.id);
          const increment = Math.ceil(original.value / 50);
          const newValue = Math.min(item.value + increment, original.value);
          return { ...item, value: newValue };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [counters]);

  if (!counterSection || !counters.length) return null;

  const description = counterSection.Description?.[0]?.children?.[0]?.text || '';
  const link1 = counterSection.Link1 || '#';
  const link2 = counterSection.Link2.url || '#';

  return (
    <div className="counter-area">
      <div className="container">
        <div className="row content-area">
          <div className="col-12 col-lg-8 counter-description">
            <p>{description}</p>
          </div>
          <div className="col-12 col-lg-4 counter-link">
            <Link to={link1}>{t('counter.more')}</Link>
            <a target="_blank" rel="noopener noreferrer" href={`${api}${link2}`}>{t('counter.slide')}</a>
          </div>
        </div>
        <div className="counter-grid">
          {animatedCounters.map((animatedCounter) => {
            const counter = counters.find((item) => item.id === animatedCounter.id);
            return (
              <div key={counter.id} className="counter-item">
                <img src={counter.icon} alt={counter.title} />
                <div className="counter-content">
                  <h4>{animatedCounter.value}</h4>
                  <p>{counter.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CounterArea;
