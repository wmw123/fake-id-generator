import React, { useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import mergeImages from "merge-images";

import { selectImgSrc, selectCoordinates } from "../store/photo/selectors";
import { addMergedPhoto } from "../store/photo/actions";

// import portrait from "../images/portrait.jpg";
import {
  leftEyeData,
  leftEyebrowData,
  rightEyeData,
  rightEyebrowData,
  noseData,
  mouthData,
} from "../imageData/imageData";

// import { fetchNetWeights } from 'face-api.js';

export default function PhotoEditor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const portrait = useSelector(selectImgSrc);
  const coordinates = useSelector(selectCoordinates);

  console.log("coordinates:", coordinates);

  const [imgArray, set_imgArray] = useState([
    { name: "portrait", src: portrait },
  ]);

  // useEffect(() => {
  //   maskify();
  // }, []);

  const placeFeature = (image, nameId) => {
    console.log("FEATURE:", nameId);
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

      console.log(singleFeature);

      // use dynamic "feature" argument here
      newFeature.setAttribute("src", image);
      newFeature.setAttribute("id", nameId);
      // newFeature.setAttribute("class", "overlays");

      // use dynamic "x" and "y" coordinates arguments here
      newFeature.style.left = singleFeature.position.x + l + "px";
      newFeature.style.top = singleFeature.position.y + t + "px";
      // newFeature.style.left = singleFeature.position.x + "px";
      // newFeature.style.top = singleFeature.position.y + "px";
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
        console.log("removed", "index: ", index);
      } else if (oldFeature) {
        container.replaceChild(newFeature, oldFeature);
        const index = imgArray.findIndex((img) => {
          return img.name === nameId;
        });
        if (index !== -1) {
          imgArray[index] = { name: nameId, src: image };
        }
        console.log("replaced", "index:", index);
      } else {
        container.appendChild(newFeature);
        set_imgArray([...imgArray, { name: nameId, src: image }]);
        console.log("added");
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
      (b64) => (console.log(typeof b64), dispatch(addMergedPhoto(b64))),
      history.push("/passporteditor")
    );
  };

  return (
    <>
      <div>PhotoEditor</div>
      {/* <MaskifyComponent /> */}
      <div id="imgContainer">
        <img
          id="portraitImage"
          src={portrait}
          style={{ position: "relative" }}
          alt={""}
        />
      </div>
      {portrait ? (
        <>
          left eyebrow
          {dropDownCreator(leftEyebrowData)}
          left eye
          {dropDownCreator(leftEyeData)}
          right eyebrow
          {dropDownCreator(rightEyebrowData)}
          right eye
          {dropDownCreator(rightEyeData)}
          nose
          {dropDownCreator(noseData)}
          mouth
          {dropDownCreator(mouthData)}
          <button onClick={createMergedPhoto}>Save photo!</button>
        </>
      ) : (
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          Take a photo first!
        </button>
      )}
    </>
  );
}
