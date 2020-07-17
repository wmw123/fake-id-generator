import * as faceapi from 'face-api.js';

const getOverlayValues = (landmarks) => {
  const nose = landmarks.getNose();
  const mouth = landmarks.getMouth();
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const leftEyeBrow = landmarks.getLeftEyeBrow();
  const rightEyeBrow = landmarks.getRightEyeBrow();

  const mouthLeft = mouth[0];
  const mouthRight = mouth[6];
  const mouthMiddle = (mouthLeft.x + mouthRight.x) / 2;
  const mouthTop = mouth[17];
  const mouthScale = (mouthRight - mouthLeft) / 50;

  const noseBottom = nose[6];
  const noseMiddle = nose[0];

  const leftEyeLeft = leftEye[0];

  const rightEyeLeft = rightEye[0];

  const leftEyeBrowLeft = leftEyeBrow[0];

  const rightEyeBrowLeft = rightEyeBrow[0];

  return {
    mouth: {
      mouthMiddle: mouthMiddle - 25,
      mouthTop: mouthTop.y - 25,
      mouthScale: mouthScale,
    },
    nose: {
      noseBottom: noseBottom.y - 50,
      noseMiddle: noseMiddle.x - 25,
    },
    leftEye: {
      leftEyeLeft: leftEyeLeft.x - 15,
      leftEyeTop: leftEyeLeft.y - 25,
    },
    rightEye: {
      rightEyeLeft: rightEyeLeft.x - 15,
      rightEyeTop: rightEyeLeft.y - 25,
    },
    leftEyeBrow: {
      leftEyeBrowLeft: leftEyeBrowLeft.x,
      leftEyeBrowTop: leftEyeBrowLeft.y - 45,
    },
    rightEyeBrow: {
      rightEyeBrowLeft: rightEyeBrowLeft.x,
      rightEyeBrowTop: rightEyeBrowLeft.y - 35,
    },
  };
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

  // wv: api looks for the html elemelent containing the image
  const items = document.querySelectorAll('.itemWithImg');

  // wv: it grabs that image
  items.forEach(async (item) => {
    const originalImage = item.querySelector('img');

    const handleImage = (oldImage, newImage) => async () => {
      const detection = await faceapi
        .detectSingleFace(newImage, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks(true);
      console.log(detection);
      if (!detection) {
        return;
      }

      // wv: GetOverLayValues will generate the coordinates
      const overlayValues = getOverlayValues(detection.landmarks);

      return overlayValues;
    };
  });
}
