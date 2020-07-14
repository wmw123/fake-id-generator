import { createStore, compose } from "redux";
import reducer from "./rootReducer";

// @ts-ignore
const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const enhancer = composeEnhancers();

const store = createStore(reducer, enhancer);

export default store;
