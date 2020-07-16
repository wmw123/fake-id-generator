import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addImgSrc } from "../store/photo/actions";
import { useSelector } from "react-redux";
import { selectImgSrc } from "../store/photo/selectors";

function WebcamCapture({ addImgSrc }) {
  const photo = useSelector(selectImgSrc);

  const videoConstraints = {
    width: { min: 480 },
    height: { min: 400 },
    aspectRatio: 0.6666666667,
  };

  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef, setImageSrc]);

  const uploadImage = async function uploadAnImage() {
    const imgFile = document.getElementById("myFileUpload").files[0];

    console.log("imgFile", imgFile);
    // create an HTMLImageElement from a Blob
    const img = await faceapi.bufferToImage(imgFile);
    console.log("img", img);
    // document.getElementById("myImg").src = img.src;
    setImageSrc(img.src);
  };

  console.log("photo?", photo);

  return (
    <div>
      <div>
        <h2>Capture your face</h2>
        <Webcam
          videoConstraints={videoConstraints}
          width={300}
          height={450}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          imageSmoothing={true}
          mirrored={true}
        />
        <button onClick={capture}>Capture photo</button>
      </div>
      <div>
        {/* <img id="myImg" src="" alt="" height="450px"></img> */}
        <input
          id="myFileUpload"
          type="file"
          onChange={uploadImage}
          accept=".jpg, .jpeg, .png"
        ></input>
      </div>
      <div>
        <h2>Preview of your photo</h2>
        {imageSrc && (
          <img
            src={imageSrc}
            alt="a screenshot of your face"
            style={{ width: 300, height: 450 }}
          />
        )}
        <button onClick={() => addImgSrc(imageSrc)}>Save photo</button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addImgSrc: bindActionCreators(addImgSrc, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(WebcamCapture);
