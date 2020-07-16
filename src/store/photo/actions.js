export const photoActionTypes = {
  ADD: "ADD",
};

export const addImgSrc = (imageSrc) => (dispatch) => {
  console.log("imgSrc in addImgSrc", imageSrc);
  return dispatch({ type: photoActionTypes.ADD, payload: imageSrc });
};
