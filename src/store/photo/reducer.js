import { photoActionTypes } from "./actions";

const initialState = {
  imageSrc: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case photoActionTypes.ADD_PHOTO:
      return { ...state, imageSrc: action.payload };
    default:
      return state;
  }
};
