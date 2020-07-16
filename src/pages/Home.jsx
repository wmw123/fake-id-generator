import React, { useState } from "react";
import WebcamCapture from "../components/WebcamCapture";

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
      <div>
        <h1>Homepage</h1>
      </div>
      <div>
        <div>{button}</div>
        {webcam}
      </div>
    </>
  );
}
