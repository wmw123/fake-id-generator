import React, { useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import mergeImages from "merge-images";
import "./attributes.css";
import "./styles.css";
import "./PassportEditor.css";

import { selectImgSrc, selectCoordinates } from "../store/photo/selectors";
import { addMergedPhoto } from "../store/photo/actions";
import {
  leftEyeData,
  leftEyebrowData,
  rightEyeData,
  rightEyebrowData,
  noseData,
  mouthData,
} from "../imageData/imageData";

export default function PhotoEditor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const portrait = useSelector(selectImgSrc);
  const coordinates = useSelector(selectCoordinates);

  const [imgArray, set_imgArray] = useState([
    { name: "portrait", src: portrait },
  ]);

  const placeFeature = (image, nameId) => {
    const container = document.getElementById("imgContainer");
    const portrait = document.getElementById("portraitImage");
    const oldFeature = document.getElementById(nameId);
    if (portrait) {
      const l = portrait.offsetLeft;
      const t = portrait.offsetTop;

      const newFeature = document.createElement("img");

      const singleFeature = coordinates.find((feature) => {
        return feature.name === nameId;
      });

      // use dynamic "feature" argument here
      newFeature.setAttribute("src", image);
      newFeature.setAttribute("id", nameId);

      // use dynamic "x" and "y" coordinates arguments here
      newFeature.style.left = singleFeature.position.x + l + "px";
      newFeature.style.top = singleFeature.position.y + t + "px";
      newFeature.style.position = "absolute";

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
      } else if (oldFeature) {
        container.replaceChild(newFeature, oldFeature);
        const index = imgArray.findIndex((img) => {
          return img.name === nameId;
        });
        if (index !== -1) {
          imgArray[index] = {
            name: nameId,
            src: image,
            x: singleFeature.position.x,
            y: singleFeature.position.y,
          };
        }
      } else {
        container.appendChild(newFeature);
        set_imgArray([
          ...imgArray,
          {
            name: nameId,
            src: image,
            x: singleFeature.position.x,
            y: singleFeature.position.y,
          },
        ]);
      }
    }
  };

  const dropDownCreator = (featureData) => {
    return (
      <div style={{ width: "100px" }}>
        <Select
          options={featureData.featureArray}
          autosize={true}
          onChange={(event) => {
            placeFeature(event.value, featureData.name);
          }}
        />
      </div>
    );
  };

  const createMergedPhoto = () => {
    mergeImages(imgArray).then(
      (b64) => dispatch(addMergedPhoto(b64)),
      history.push("/passporteditor")
    );
  };

  return (
    <div className="container">
      <h1>PhotoEditor</h1>
      <div id="imgContainer">
        <img
          id="portraitImage"
          src={portrait}
          style={{ position: "relative" }}
          alt={""}
        />
      </div>
      {portrait ? (
        <div className="button-wrapper">
          <div className="select-item">
            left eyebrow
            {dropDownCreator(leftEyebrowData)}
          </div>
          <div className="select-item">
            left eye
            {dropDownCreator(leftEyeData)}
          </div>
          <div className="select-item">
            right eyebrow
            {dropDownCreator(rightEyebrowData)}
          </div>
          <div className="select-item">
            right eye
            {dropDownCreator(rightEyeData)}
          </div>
          <div className="select-item">
            nose
            {dropDownCreator(noseData)}
          </div>
          <div className="select-item">
            mouth
            {dropDownCreator(mouthData)}
          </div>
          <button onClick={createMergedPhoto}>Save photo!</button>
        </div>
      ) : (
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          Take a photo first!
        </button>
      )}
    </div>
  );
}
