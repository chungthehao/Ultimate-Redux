import reducer from "./reducer";

function createStore(reducer) {
  let state; // private, vì không bị expose ra ngoài.

  function getState() {
    return state;
  }

  function dispatch(action) {
    // 1. Call the reducer to get the new state
    state = reducer(state, action);
  }

  return {
    getState,
    dispatch
  };
}

export default createStore(reducer);
