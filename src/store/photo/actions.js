export const photoActionTypes = {
  ADD_PHOTO: "ADD_PHOTO",
  MERGED_PHOTO: "MERGED_PHOTO",
};

export const addImgSrc = (imageSrc) => (dispatch) => {
  // console.log("imgSrc in addImgSrc", imageSrc);
  return dispatch({ type: photoActionTypes.ADD_PHOTO, payload: imageSrc });
};

export const addMergedPhoto = (mergedImage) => (dispatch) => {
  console.log("ACTION: ", typeof mergedImage);
  return dispatch({
    type: photoActionTypes.MERGED_PHOTO,
    payload: mergedImage,
  });
};
