import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCountries } from '../store/countries/actions';
import { selectCountries } from '../store/countries/selectors';
import './PassportEditor.css';
import image from '../img/img_passport.jpeg';

export default function PassportEditor() {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const [passportOpen, setPassportOpen] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    givenNames: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '',
  });

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

  const submitPassport = () => {
    console.log(details);
  };

  const openPassport = () => {
    console.log(passportOpen);
    setPassportOpen(!passportOpen);
  };

  const renderForm = () => {
    return (
      <div className="input-form">
        <form>
          <label>name</label> <br />
          <input
            value={details.name}
            type="text"
            id="name"
            name="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />
          <br />
          <label>given names</label> <br />
          <input
            value={details.givenNames}
            type="text"
            id="givenNames"
            name="givenNames"
            onChange={(e) =>
              setDetails({ ...details, givenNames: e.target.value })
            }
          />
          <br />
          <label>date of birth</label> <br />
          <input
            value={details.dateOfBirth}
            type="text"
            id="dateOfBirth"
            name="dateOfBirth"
            onChange={(e) =>
              setDetails({ ...details, dateOfBirth: e.target.value })
            }
          />
          <br />
          <label>place of birth</label> <br />
          <input
            value={details.placeOfBirth}
            type="text"
            id="placeOfBirth"
            name="placeOfBirth"
            onChange={(e) =>
              setDetails({ ...details, placeOfBirth: e.target.value })
            }
          />
          <br />
          <label>gender</label> <br />
          <input
            value={details.gender}
            type="text"
            id="gender"
            name="gender"
            onChange={(e) => setDetails({ ...details, gender: e.target.value })}
          />
          <br />
        </form>
      </div>
    );
  };

  return (
    <div className="passport-container">
      <div
        className={
          !passportOpen ? 'passport__page--2' : 'passport__page--2-rotate'
        }
      >
        <div className={!passportOpen ? 'cover' : 'cover-rotate'}>
          <figure className="front"></figure>
        </div>
        <div className="details">
          <div className="header">{countries ? renderCountries() : null}</div>
          <div className="input-wrapper">
            <img className="picture" src={image} alt="passport" />
            {renderForm()}
          </div>
        </div>
      </div>
      <button className="edit-btn" onClick={openPassport}>
        Edit passport
      </button>
      <button className="submit-btn" onClick={submitPassport}>
        Submit passport
      </button>
    </div>
  );
}
