import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PassportEditor.css';
import image from '../img/img_passport.jpeg';

export default function PassportEditor() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await axios('https://restcountries.eu/rest/v2/all');
      setCountries(fetchedData.data);
    }
    fetchData();
  });

  const renderCountries = () => {
    return (
      <select>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country.name.toUpperCase()}
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

        <div className="input-form">
          <label>name</label> <br />
          <input type="text" id="name" name="name" />
          <br />
          <label>given names</label> <br />
          <input type="text" id="givenName" name="givenName" />
          <br />
          <label>date of birth</label> <br />
          <input type="text" id="dateOfBirth" name="dateOfBirth" />
          <br />
          <label>place of birth</label> <br />
          <input type="text" id="placeOfBirth" name="placeOfBirth" />
          <br />
          <label>gender</label> <br />
          <input type="text" id="gender" name="gender" />
          <br />
        </div>
      </div>
    </div>
  );
}
