import React from "react";

import leftEye1 from "../images/leftEye/leftEye1.png";
import leftEye2 from "../images/leftEye/leftEye2.png";
import leftEye3 from "../images/leftEye/leftEye3.png";
import leftEye4 from "../images/leftEye/leftEye4.png";
import leftEye5 from "../images/leftEye/leftEye5.png";

import leftEyebrow1 from "../images/leftEyebrow/leftEyebrow1.png";
import leftEyebrow2 from "../images/leftEyebrow/leftEyebrow2.png";
import leftEyebrow3 from "../images/leftEyebrow/leftEyebrow3.png";
import leftEyebrow4 from "../images/leftEyebrow/leftEyebrow4.png";
import leftEyebrow5 from "../images/leftEyebrow/leftEyebrow5.png";

import rightEye1 from "../images/rightEye/rightEye1.png";
import rightEye2 from "../images/rightEye/rightEye2.png";
import rightEye3 from "../images/rightEye/rightEye3.png";
import rightEye4 from "../images/rightEye/rightEye4.png";
import rightEye5 from "../images/rightEye/rightEye5.png";

import rightEyebrow1 from "../images/rightEyebrow/rightEyebrow1.png";
import rightEyebrow2 from "../images/rightEyebrow/rightEyebrow2.png";
import rightEyebrow3 from "../images/rightEyebrow/rightEyebrow3.png";
import rightEyebrow4 from "../images/rightEyebrow/rightEyebrow4.png";
import rightEyebrow5 from "../images/rightEyebrow/rightEyebrow5.png";

import nose1 from "../images/nose/nose1.png";
import nose2 from "../images/nose/nose2.png";
import nose3 from "../images/nose/nose3.png";
import nose4 from "../images/nose/nose4.png";

import mouth1 from "../images/mouth/mouth1.png";
import mouth2 from "../images/mouth/mouth2.png";
import mouth3 from "../images/mouth/mouth3.png";
import mouth4 from "../images/mouth/mouth4.png";
import mouth5 from "../images/mouth/mouth5.png";
import mouth6 from "../images/mouth/mouth6.png";

export const leftEyeData = {
  name: "leftEye",
  coordinates: { x: 10, y: 15 },
  featureArray: [leftEye1, leftEye2, leftEye3, leftEye4, leftEye5],
};

export const leftEyebrowData = {
  name: "leftEyebrow",
  coordinates: { x: 10, y: 10 },
  featureArray: [
    leftEyebrow1,
    leftEyebrow2,
    leftEyebrow3,
    leftEyebrow4,
    leftEyebrow5,
  ],
};

export const rightEyeData = {
  name: "rightEye",
  coordinates: { x: 40, y: 15 },
  featureArray: [rightEye1, rightEye2, rightEye3, rightEye4, rightEye5],
};

export const rightEyebrowData = {
  name: "rightEyebrow",
  coordinates: { x: 40, y: 10 },
  featureArray: [
    rightEyebrow1,
    rightEyebrow2,
    rightEyebrow3,
    rightEyebrow4,
    rightEyebrow5,
  ],
};

export const noseData = {
  name: "nose",
  coordinates: { x: 35, y: 35 },
  featureArray: [nose1, nose2, nose3, nose4],
};

export const mouthData = {
  name: "mouth",
  coordinates: { x: 50, y: 50 },
  featureArray: [
    {
      value: mouth1,
      label: (
        <div>
          <img src={mouth1} height="30px" width="30px" />1
        </div>
      ),
    },
    {
      value: mouth2,
      label: (
        <div>
          <img src={mouth2} height="30px" width="30px" />2
        </div>
      ),
    },
    {
      value: mouth3,
      label: (
        <div>
          <img src={mouth3} height="30px" width="30px" />2
        </div>
      ),
    },
    {
      value: mouth4,
      label: (
        <div>
          <img src={mouth4} height="30px" width="30px" />4
        </div>
      ),
    },
    {
      value: mouth5,
      label: (
        <div>
          <img src={mouth5} height="30px" width="30px" />5
        </div>
      ),
    },
    {
      value: mouth6,
      label: (
        <div>
          <img src={mouth6} height="30px" width="30px" />6
        </div>
      ),
    },
  ],
};
