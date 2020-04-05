// import { createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import reducer from "./reducer";
import logger from "../middleware/logger";

export default function() {
  //return createStore(reducer, devToolsEnhancer({ trace: true }));
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger({ destination: "console" })]
  });
}
