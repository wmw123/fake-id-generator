export const photoActionTypes = {
  ADD_PHOTO: "ADD_PHOTO",
};

export const addImgSrc = (imageSrc) => (dispatch) => {
  // console.log("imgSrc in addImgSrc", imageSrc);
  return dispatch({ type: photoActionTypes.ADD_PHOTO, payload: imageSrc });
};
