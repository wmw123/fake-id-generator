import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCountries } from '../store/countries/actions';
import { selectCountries } from '../store/countries/selectors';
import './PassportEditor.css';
import image from '../img/img_passport.jpeg';

export default function PassportEditor() {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const [details, setDetails] = useState({
    name: '',
    givenNames: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '',
  });

  console.log(countries);

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

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
        <div className="header">{countries ? renderCountries() : null}</div>
        <img className="picture" src={image} alt="passport" />

        <div className="input-form">
          <form>
            <label>name</label> <br />
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
            <br />
            <label>given names</label> <br />
            <input type="text" id="givenNames" name="givenNames" />
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
          </form>
        </div>
      </div>
    </div>
  );
}
