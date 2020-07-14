import React from 'react';
import './PassportEditor.css';
import image from '../img/img_passport.jpeg';

export default function PassportEditor() {
  return (
    <div class="passport-container">
      <div class="passport__page--2">
        <img src={image} alt="image passport" />
        passport
      </div>
    </div>
  );
}
