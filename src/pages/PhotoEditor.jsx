import React, { useState } from "react";
import mergeImages from "merge-images";
import "./attributes.css";

import portrait from "../images/portrait.jpg";

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

export default function PhotoEditor() {
  const [imgArray, set_imgArray] = useState([
    { name: "portrait", src: portrait },
  ]);

  const leftEyeData = {
    name: "leftEye",
    coordinates: { x: 10, y: 15 },
    featureArray: [leftEye1, leftEye2, leftEye3, leftEye4, leftEye5],
  };
  const leftEyebrowData = {
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
  const rightEyeData = {
    name: "rightEye",
    coordinates: { x: 40, y: 15 },
    featureArray: [rightEye1, rightEye2, rightEye3, rightEye4, rightEye5],
  };
  const rightEyebrowData = {
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
  const noseData = {
    name: "nose",
    coordinates: { x: 35, y: 35 },
    featureArray: [nose1, nose2, nose3, nose4],
  };
  const mouthData = {
    name: "mouth",
    coordinates: { x: 50, y: 50 },
    featureArray: [mouth1, mouth2, mouth3, mouth4, mouth5, mouth6],
  };

  const placeFeature = (image, nameId, x, y) => {
    const portrait = document.getElementById("portraitImage");
    const oldFeature = document.getElementById(nameId);

    console.log(
      "ARGUMENTS",
      "featureImg:",
      image,
      "name:",
      nameId,
      "x:",
      x,
      "y:",
      y
    );

    // console.log("OLD FEATURE", oldFeature);

    const l = portrait.offsetLeft;
    const t = portrait.offsetTop;
    const w = portrait.width;
    const h = portrait.height;

    // console.log(
    //   "PORTRAIT DATA",
    //   "left:",
    //   l,
    //   "top:",
    //   t,
    //   "width:",
    //   w,
    //   "height:",
    //   h
    // );

    const newFeature = document.createElement("img");

    // use dynamic "feature" argument here
    newFeature.setAttribute("src", image);
    newFeature.setAttribute("id", nameId);
    newFeature.setAttribute("class", "overlays");

    // use dynamic "x" and "y" coordinates arguments here
    newFeature.style.top = t + y + "px";
    newFeature.style.left = l + x + "px";

    if (image === "empty") {
      if (oldFeature) {
        document.body.removeChild(oldFeature);
      }
      const index = imgArray.findIndex((img) => {
        return img.name === nameId;
      });
      if (index !== -1) {
        imgArray.splice(index);
      }
      console.log("removed", index, imgArray);
    } else if (oldFeature) {
      document.body.replaceChild(newFeature, oldFeature);
      const index = imgArray.findIndex((img) => {
        return img.name === nameId;
      });
      if (index !== -1) {
        imgArray[index] = { name: nameId, src: image, x, y };
      }
      console.log("replaced", index, imgArray);
    } else {
      document.body.appendChild(newFeature);
      set_imgArray([...imgArray, { name: nameId, src: image, x, y }]);
      console.log("added", imgArray);
    }
  };

  const dropDownMaker = (featureData) => {
    return (
      <>
        <>{featureData.name}</>
        <select
          onClick={(event) => {
            placeFeature(
              event.target.value,
              featureData.name,
              featureData.coordinates.x,
              featureData.coordinates.y
            );
          }}
        >
          <option key={0} value="empty">
            Nothing
          </option>
          {featureData.featureArray.map((image, index) => {
            return (
              <option
                key={index + 1}
                value={image}
                style={{ backgroundImage: `url(${image})` }}
              >
                {index + 1}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  const createPhoto = () => {
    mergeImages(imgArray).then(
      (b64) => (document.querySelector("img").src = b64)
      // send to redux store
    );
  };

  return (
    <>
      <div>PhotoEditor</div>
      <img
        id="portraitImage"
        src={portrait}
        style={{ position: "relative" }}
        alt={""}
      />
      {dropDownMaker(leftEyebrowData)}
      {dropDownMaker(leftEyeData)}
      {dropDownMaker(rightEyebrowData)}
      {dropDownMaker(rightEyeData)}
      {dropDownMaker(noseData)}
      {dropDownMaker(mouthData)}
      <button onClick={createPhoto} />
    </>
  );
}
