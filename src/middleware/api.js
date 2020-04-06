import axios from "axios";

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
  if (action.type !== "apiCallBegan") return next(action);

  next(action);
  const { dispatch, getState } = store;
  const { url, method, data, onSuccess, onError } = action.payload;

  try {
    const res = await axios.request({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
    });
    dispatch({ type: onSuccess, payload: res.data });
  } catch (err) {
    dispatch({ type: onError, payload: err.message });
  }
};

export default api;
