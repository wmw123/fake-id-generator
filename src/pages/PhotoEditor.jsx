import React from 'react';

import './attributes.css';
import portrait from '../images/portrait.jpg';
import eye from '../images/eye.png';

export default function PhotoEditor() {
  console.log('WIDTH: 300, HEIGHT: 400');

  const x = 20;

  const placeEye = () => {
    console.log('CLICK');
    const portrait = document.getElementById('portraitImage');

    const l = portrait.offsetLeft;
    const t = portrait.offsetTop;
    const w = portrait.width;
    const h = portrait.height;

    console.log('DATA', l, t, w, h);

    const newEye = document.createElement('img');

    newEye.style.position = 'absolute';
    newEye.setAttribute('src', eye);
    newEye.setAttribute('class', 'overlays');

    // newEye.style.display = "block";
    // newEye.style.position = "relative";
    newEye.style.height = '25px';
    newEye.style.width = '50px';
    newEye.style.top = t + 'px';
    newEye.style.left = l + 'px';

    document.body.appendChild(newEye);
  };

  return (
    <>
      <div>PhotoEditor</div>
      <button onClick={placeEye}>Click me</button>
      <img id="portraitImage" src={portrait} alt={''} />
    </>
  );
}
