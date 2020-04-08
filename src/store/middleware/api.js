import axios from "axios";

import { apiCallSuccess, apiCallFailed, apiCallBegan } from "../api";

// * Action object này nên serilizable để mà store nó đc (nên onSuccess, onError có value là string, ko phải func)
// const action = {
//   type: "apiCallBegan", // or apiRequest
//   payload: {
//     url: "/bugs",
//     method: "get",
//     data: {}, // any data put to server
//     onSuccess: "bugsReceived", // type action mà sẽ dispatch khi api này resolved
//     onError: "apiRequestFailed", // type action mà sẽ dispatch khi api này bị rejected
//   },
// };

// Middleware này handle loại API có kiểu như vd trên
const api = (store) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);

  const { dispatch, getState } = store;
  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const res = await axios.request({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
    });
    // General
    dispatch(apiCallSuccess(res.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
  } catch (err) {
    // General
    dispatch(apiCallFailed(err.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: err.message });
  }
};

export default api;
