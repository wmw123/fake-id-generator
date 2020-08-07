export const photoActionTypes = {
  ADD_PHOTO: "ADD_PHOTO",
  MERGED_PHOTO: "MERGED_PHOTO",
  ADD_PHOTO_COORDINATES: "ADD_PHOTO_COORDINATES",
};

export const addImgSrc = (imageSrc) => (dispatch) => {
  return dispatch({ type: photoActionTypes.ADD_PHOTO, payload: imageSrc });
};

export const addMergedPhoto = (mergedImage) => (dispatch) => {
  return dispatch({
    type: photoActionTypes.MERGED_PHOTO,
    payload: mergedImage,
  });
};

export const addCoordinates = (coordinates) => (dispatch) => {
  return dispatch({
    type: photoActionTypes.ADD_PHOTO_COORDINATES,
    payload: coordinates,
  });
};
