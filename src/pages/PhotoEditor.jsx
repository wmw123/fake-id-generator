import React, { useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import mergeImages from "merge-images";
import "./attributes.css";

import { addMergedPhoto } from "../store/photo/actions";

import portrait from "../images/portrait.jpg";
import {
  leftEyeData,
  leftEyebrowData,
  rightEyeData,
  rightEyebrowData,
  noseData,
  mouthData,
} from "../imageData/imgData";

import { fetchNetWeights } from "face-api.js";

export default function PhotoEditor() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [imgArray, set_imgArray] = useState([
    { name: "portrait", src: portrait },
  ]);

  const placeFeature = (image, nameId, x, y) => {
    const container = document.getElementById("imgContainer");
    const portrait = document.getElementById("portraitImage");
    const oldFeature = document.getElementById(nameId);

    const l = portrait.offsetLeft;
    const t = portrait.offsetTop;
    const w = portrait.width;
    const h = portrait.height;

    const newFeature = document.createElement("img");

    // use dynamic "feature" argument here
    newFeature.setAttribute("src", image);
    newFeature.setAttribute("id", nameId);
    newFeature.setAttribute("class", "overlays");

    // use dynamic "x" and "y" coordinates arguments here
    newFeature.style.top = t + y + "px";
    newFeature.style.left = l + x + "px";
    // newFeature.style.height = 50;
    // newFeature.style.width = 50;
    // newFeature.style.position = "absolute";

    if (image === "empty") {
      if (oldFeature) {
        container.removeChild(oldFeature);
      }
      const index = imgArray.findIndex((img) => {
        return img.name === nameId;
      });
      if (index !== -1) {
        imgArray.splice(index);
      }
      console.log("removed", index, imgArray);
    } else if (oldFeature) {
      container.replaceChild(newFeature, oldFeature);
      const index = imgArray.findIndex((img) => {
        return img.name === nameId;
      });
      if (index !== -1) {
        imgArray[index] = { name: nameId, src: image, x, y };
      }
      console.log("replaced", index, imgArray);
    } else {
      container.appendChild(newFeature);
      set_imgArray([...imgArray, { name: nameId, src: image, x, y }]);
      console.log("added", imgArray, portrait);
    }
  };

  function dropDownCreator(featureData) {
    return (
      <div style={{ width: "100px" }}>
        <Select
          options={featureData.featureArray}
          autosize={true}
          onChange={(event) => {
            placeFeature(
              event.value,
              featureData.name,
              featureData.coordinates.x,
              featureData.coordinates.y
            );
          }}
        />
      </div>
    );
  }

  const createPhoto = () => {
    mergeImages(imgArray).then(
      (b64) => (console.log(typeof b64), dispatch(addMergedPhoto(b64))),
      history.push("/passporteditor")
    );
  };

  return (
    <>
      <div>PhotoEditor</div>
      <div id="imgContainer">
        <img
          id="portraitImage"
          src={portrait}
          style={{ position: "relative" }}
          alt={""}
        />
      </div>
      {dropDownCreator(leftEyebrowData)}
      {dropDownCreator(leftEyeData)}
      {dropDownCreator(rightEyebrowData)}
      {dropDownCreator(rightEyeData)}
      {dropDownCreator(noseData)}
      {dropDownCreator(mouthData)}
      <button onClick={createPhoto}>Save photo!</button>
    </>
  );
}
