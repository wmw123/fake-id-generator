import React from 'react';
import './PassportEditor.css';
import image from '../img/img_passport.jpeg';

export default function PassportEditor() {
  const countries = ['kingdom of the netherlands', 'belgium', 'germany'];

  const renderCountries = () => {
    return (
      <select>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country.toUpperCase()}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="passport-container">
      <div className="passport__page--2">
        <div className="header">{renderCountries()}</div>
        <img className="picture" src={image} alt="passport" />
        passport
      </div>
    </div>
  );
}
