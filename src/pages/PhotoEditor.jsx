import React from "react";
import "./attributes.css";

import portrait from "../images/portrait.jpg";
import mouth2 from "../images/mouth/mouth2.png";

export default function PhotoEditor() {
  const leftEyebrowData = {
    name: "left eyebrow",
    coordinates: { x: 10, y: 10 },
    featureArray: [],
  };
  const rightEyebrowData = {
    name: "right eyebrow",
    coordinates: { x: 40, y: 10 },
    featureArray: [],
  };
  const leftEyeData = {
    name: "left eye",
    coordinates: { x: 10, y: 15 },
    featureArray: [],
  };
  const rightEyeData = {
    name: "right eye",
    coordinates: { x: 40, y: 15 },
    featureArray: [],
  };
  const noseData = {
    name: "nose",
    coordinates: { x: 35, y: 35 },
    featureArray: [],
  };
  const mouthData = {
    name: "mouth",
    coordinates: { x: 50, y: 25 },
    featureArray: [mouth2, mouth2, mouth2],
  };

  const placeFeature = (feature, x, y) => {
    const portrait = document.getElementById("portraitImage");

    console.log("ARGUMENTS", "featureImg:", feature, "x:", x, "y:", y);

    const l = portrait.offsetLeft;
    const t = portrait.offsetTop;
    const w = portrait.width;
    const h = portrait.height;

    console.log(
      "PORTRAIT DATA",
      "left:",
      l,
      "top:",
      t,
      "width:",
      w,
      "height:",
      h
    );

    const newFeature = document.createElement("img");

    // use dynamic "feature" argument here
    newFeature.setAttribute("src", feature);
    newFeature.setAttribute("class", "overlays");

    // use dynamic "x" and "y" coordinates arguments here
    newFeature.style.top = t + y + "px";
    newFeature.style.left = l + x + "px";

    document.body.appendChild(newFeature);
  };

  const dropDownMaker = (featureData) => {
    return (
      <>
        <>{featureData.name}</>
        <select
          onChange={(event) => {
            placeFeature(
              event.target.value,
              featureData.coordinates.x,
              featureData.coordinates.y
            );
          }}
        >
          {featureData.featureArray.map((feature, index) => {
            return <option key={index} value={feature}></option>;
          })}
        </select>
      </>
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
      {dropDownMaker(rightEyebrowData)}
      {dropDownMaker(leftEyeData)}
      {dropDownMaker(rightEyeData)}
      {dropDownMaker(noseData)}
      {dropDownMaker(mouthData)}
    </>
  );
}
