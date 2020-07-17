import * as faceapi from 'face-api.js';

const getOverlayValues = (landmarks) => {
  const nose = landmarks.getNose();
  const mouth = landmarks.getMouth();
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const leftEyeBrow = landmarks.getLeftEyeBrow();
  const rightEyeBrow = landmarks.getRightEyeBrow();

  const coordinates = {
    mouth: {
      mouthX: (mouth[0].x + mouth[6].x) / 2 - 25,
      mouthY: mouth[17].y - 25,
    },
    nose: {
      noseX: nose[0].x - 25,
      noseY: nose[6].y - 50,
    },
    leftEye: {
      leftEyeX: leftEye[0].x - 15,
      leftEyeY: leftEye[0].y - 25,
    },
    rightEye: {
      rightEyeX: rightEye[0].x - 15,
      rightEyeY: rightEye[0].y - 25,
    },
    leftEyeBrow: {
      leftEyeBrowX: leftEyeBrow[0].x,
      leftEyeBrowY: leftEyeBrow[0].y - 45,
    },
    rightEyeBrow: {
      rightEyeBrowX: rightEyeBrow[0].x,
      rightEyeBrowY: rightEyeBrow[0].y - 35,
    },
  };
  return coordinates;
};

export async function maskify() {
  console.log('Maskify starting...');
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
  ]).catch((error) => {
    console.error(error);
  });
  console.log('models loaded');

  // wv: api looks for the html elemelent with the id 'portraitImage'
  const originalImage = document.getElementById('portraitImage');

  const handleImage = (oldImage, newImage) => async () => {
    const detection = await faceapi
      .detectSingleFace(newImage, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks(true);
    if (!detection) {
      return;
    }

    // wv: GetOverLayValues will generate the coordinates for the image with id 'portraitImage'
    const overlayValues = getOverlayValues(detection.landmarks);

    console.log(overlayValues);
  };

  // To avoid CORS issues we create a cross-origin-friendly copy of the image.
  const image = new Image();
  image.crossOrigin = 'Anonymous';
  image.addEventListener('load', handleImage(originalImage, image));
  image.src = originalImage.src;
}
