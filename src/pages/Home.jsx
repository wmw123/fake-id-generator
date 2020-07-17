import React, { useState } from "react";
import WebcamCapture from "../components/WebcamCapture";
import "./styles.css";
import iconPhoto from "../img/photo.png";
import iconSelfie from "../img/selfie.png";
import iconPassport from "../img/passport.png";

export default function Home() {
  const takePhoto = (e) => {
    e.preventDefault();

    setButton("");
  };

  const takePhotoButton = <button onClick={takePhoto}>Take a photo</button>;
  const [button, setButton] = useState(takePhotoButton);

  const webcam =
    button === "" ? (
      <div>
        <WebcamCapture />
      </div>
    ) : (
      ""
    );

  return (
    <>
      <div className="container">
        <h1>Fake ID Generator</h1>
        <ul className="steps">
          <li>
            <img src={iconPhoto} alt="icon" />
            <br />
            Take a photo - wait until <br />
            your face is detected
          </li>
          <li>
            <img src={iconSelfie} alt="icon" />
            <br />
            Make yourself look good
          </li>
          <li>
            <img src={iconPassport} alt="icon" />
            <br />
            Get your unique passport
          </li>
        </ul>
        <div>{button}</div>
        {webcam}
      </div>
    </>
  );
}
