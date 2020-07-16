import React, { useState } from "react";
import WebcamCapture from "../components/WebcamCapture";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
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
        <button onClick={() => history.push("/passporteditor")}>
          Check out your passport
        </button>
        <button onClick={() => history.push("/photoeditor")}>
          Edit your picture
        </button>
      </div>
      <div>
        <div>{button}</div>
        {webcam}
      </div>
    </>
  );
}
