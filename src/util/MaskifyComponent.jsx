import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as faceapi from "face-api.js";
import { addCoordinates } from "../store/photo/actions";
import { useHistory } from "react-router-dom";

export default function MaskifyComponent() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getOverlayValues = (landmarks) => {
    const nose = landmarks.getNose();
    const mouth = landmarks.getMouth();
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const leftEyeBrow = landmarks.getLeftEyeBrow();
    const rightEyeBrow = landmarks.getRightEyeBrow();

    const coordinates = [
      {
        name: "mouth",
        position: {
          x: (mouth[0].x + mouth[6].x) / 2 - 25,
          y: mouth[17].y - 25,
        },
      },
      {
        name: "nose",
        position: {
          x: nose[0].x - 25,
          y: nose[6].y - 50,
        },
      },
      {
        name: "leftEye",
        position: {
          x: leftEye[0].x - 15,
          y: leftEye[0].y - 25,
        },
      },
      {
        name: "rightEye",
        position: {
          x: rightEye[0].x - 15,
          y: rightEye[0].y - 25,
        },
      },
      {
        name: "leftEyebrow",
        position: {
          x: leftEyeBrow[0].x,
          y: leftEyeBrow[0].y - 45,
        },
      },
      {
        name: "rightEyebrow",
        position: {
          x: rightEyeBrow[0].x,
          y: rightEyeBrow[0].y - 35,
        },
      },
    ];
    return coordinates;
  };

  //   const coordinates = {
  //     mouth: {
  //       name: "mouth",
  //       position: {
  //         x: (mouth[0].x + mouth[6].x) / 2 - 25,
  //         y: mouth[17].y - 25,
  //       },
  //     },
  //     nose: {
  //       name: "nose",
  //       position: {
  //         x: nose[0].x - 25,
  //         y: nose[6].y - 50,
  //       },
  //     },
  //     leftEye: {
  //       name: "leftEye",
  //       position: {
  //         x: leftEye[0].x - 15,
  //         y: leftEye[0].y - 25,
  //       },
  //     },
  //     rightEye: {
  //       name: "rightEye",
  //       position: {
  //         x: rightEye[0].x - 15,
  //         y: rightEye[0].y - 25,
  //       },
  //     },
  //     leftEyebrow: {
  //       name: "leftEyebrow",
  //       position: {
  //         x: leftEyeBrow[0].x,
  //         y: leftEyeBrow[0].y - 45,
  //       },
  //     },
  //     rightEyebrow: {
  //       name: "leftEyebrow",
  //       position: {
  //         rightEyeBrowX: rightEyeBrow[0].x,
  //         rightEyeBrowY: rightEyeBrow[0].y - 35,
  //       },
  //     },
  //   };
  //   return coordinates;
  // };

  const maskify = async () => {
    console.log("Maskify starting...");
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
    ]).catch((error) => {
      console.error(error);
    });
    console.log("models loaded");

    // wv: api looks for the html elemelent with the id 'portraitImage'
    const originalImage = document.getElementById("capturedImg");

    const handleImage = (oldImage, newImage) => async () => {
      const detection = await faceapi
        .detectSingleFace(newImage, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks(true);
      if (!detection) {
        setLoading("failed");
        return;
      }

      // wv: GetOverLayValues will generate the coordinates for the image with id 'portraitImage'
      const overlayValues = getOverlayValues(detection.landmarks);

      dispatch(addCoordinates(overlayValues));
      setLoading(false);
      history.push("/photoeditor");
    };

    // To avoid CORS issues we create a cross-origin-friendly copy of the image.
    // wv: Eventlistener triggers the handleImage-function
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.addEventListener("load", handleImage(originalImage, image));
    image.src = originalImage.src;
  };

  if (loading) {
    maskify();
  }
  return (
    <div>
      {loading ? (
        <p>Face detection active...</p>
      ) : loading === false ? (
        <p>face detection finished</p>
      ) : (
        <p>Face detection failed, please try again</p>
      )}
    </div>
  );
}
