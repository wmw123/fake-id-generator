export const photoActionTypes = {
  ADD_PHOTO: 'ADD_PHOTO',
  MERGED_PHOTO: 'MERGED_PHOTO',
  ADD_PHOTO_COORDINATES: 'ADD_PHOTO_COORDINATES',
};

export const addImgSrc = (imageSrc) => (dispatch) => {
  // console.log("imgSrc in addImgSrc", imageSrc);
  return dispatch({ type: photoActionTypes.ADD_PHOTO, payload: imageSrc });
};

export const addMergedPhoto = (mergedImage) => (dispatch) => {
  console.log('ACTION: ', typeof mergedImage);
  return dispatch({
    type: photoActionTypes.MERGED_PHOTO,
    payload: mergedImage,
  });
};

export const addCoordinates = (coordinates) => (dispatch) => {
  console.log('coordinates arrived', coordinates);
  return dispatch({
    type: photoActionTypes.ADD_PHOTO_COORDINATES,
    payload: coordinates,
  });
};
