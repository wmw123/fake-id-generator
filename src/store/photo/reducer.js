import { photoActionTypes } from './actions';

const initialState = {
  imageSrc: null,
  mergedImage: null,
  coordinates: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case photoActionTypes.ADD_PHOTO:
      return { ...state, imageSrc: action.payload };
    case photoActionTypes.MERGED_PHOTO:
      // console.log("STORED: ", typeof action.payload);
      return { ...state, mergedImage: action.payload };
    case photoActionTypes.ADD_PHOTO_COORDINATES:
      return { ...state, coordinates: action.payload };
    default:
      return state;
  }
};
