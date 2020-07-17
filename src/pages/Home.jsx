import React, { useState } from "react";
import WebcamCapture from "../components/WebcamCapture";
import "./styles.css";

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
        <ul>
          <li>Step 1</li>
          <li>Step 2</li>
          <li>Step 3</li>
        </ul>
        <div>{button}</div>
        {webcam}
      </div>
    </>
  );
}
