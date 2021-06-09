import React, { useEffect, useState } from 'react';
import './statistics.scss';

const Statistics = ({ statistics }) => {
  const [average, setAverage] = useState(0);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    let probability = 0;
    let sum = 0;
    let maxAmount = 0;
    const weights = [];

    statistics.forEach((elm) => {
      probability += +elm.score * +elm.amount;
      sum += +elm.amount;
      maxAmount = Math.max(maxAmount, +elm.amount);
    });
    setAverage(probability / sum);

    statistics.forEach((elm) => {
      let value = (elm.amount * 100) / maxAmount;
      if (value <= 10) {
        value = 10;
      } else if (value <= 20) {
        value = 20;
      } else if (value <= 30) {
        value = 30;
      } else if (value <= 40) {
        value = 40;
      } else if (value <= 50) {
        value = 50;
      } else if (value <= 60) {
        value = 60;
      } else if (value <= 70) {
        value = 70;
      } else if (value <= 80) {
        value = 80;
      } else if (value <= 90) {
        value = 90;
      } else if (value <= 100) {
        value = 100;
      }
      weights.push({ value, label: elm.score });
    });
    setRates(weights);
  }, [statistics]);

  return (
    <div className='container-fluid statistics'>
      <div className='row statistics__title'>Ratings & Statistics</div>
      {rates.length ? (
        <div className='row statistics__content'>
          <div className='col-12 col-md-5 col-xl-3 statistics__content__score'>
            <span className='statistics__content__score__value'>{(+average).toPrecision(4)}</span>
            <span className='statistics__content__score__label'>Average Score</span>
          </div>
          <div className='col-12 col-md-6 col-xl-4 statistics__content__ratings'>
            {rates.map((rating, index) => (
              <div className='rating' key={index}>
                <div className={`rating__value rating__value--${rating.value}`}></div>
                <span className='rating__label'>{rating.label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <span className='statistics__content__score__label'>No available statistics</span>
      )}
    </div>
  );
};

export default Statistics;
