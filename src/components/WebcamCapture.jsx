import React from "react";
import Webcam from "react-webcam";

function WebcamCapture() {
  const videoConstraints = {
    width: { min: 480 },
    height: { min: 400 },
    aspectRatio: 0.6666666667,
  };
  return (
    <div>
      <Webcam videoConstraints={videoConstraints} width={480} height={400} />
    </div>
  );
}

export default WebcamCapture;
