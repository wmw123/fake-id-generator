import React from "react";

import "./attributes.css";
import portrait from "../images/portrait.jpg";
import mouth from "../images/mouth.png";

export default function PhotoEditor() {
  const placeFeature = (/*feature(mouth), x, y */) => {
    const portrait = document.getElementById("portraitImage");

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

    // use dynamic feature argument here
    newFeature.setAttribute("src", mouth);
    newFeature.setAttribute("class", "overlays");

    // use dynamic x and y coordinates arguments here
    newFeature.style.top = t + 50 + "px";
    newFeature.style.left = l + "px";

    document.body.appendChild(newFeature);
  };

  const dropDownMaker = (array) => {
    return (
      <select
        onChange={(event) => {
          console.log("changed", event.target.value);
        }}
      >
        {array.map((element) => {
          return <option key={element.id}>{element.img}</option>;
        })}
      </select>
    );
  };

  const array = [
    {
      id: 1,
      img: "string1",
    },
    { id: 2, img: "string2" },
    { id: 3, img: "string3" },
  ];

  return (
    <>
      <div>PhotoEditor</div>
      <button onClick={placeFeature} style={{ zIndex: -1 }}>
        Click me
      </button>
      <img
        id="portraitImage"
        src={portrait}
        style={{ position: "relative" }}
        alt={""}
      />
      {dropDownMaker(array)}
    </>
  );
}
