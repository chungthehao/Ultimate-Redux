import reducer from "./reducer";

function createStore(reducer) {
  let state; // private, vì không bị expose ra ngoài.
  let listeners = []; // Có thể có nhiều listeners từ nhiều UI components khác nhau

  function getState() {
    return state;
  }

  function dispatch(action) {
    // 1. Call the reducer to get the new state
    state = reducer(state, action);

    // 2. state thay đổi rồi đó ~ store changed!
    for (let i = 0; i < listeners.length; i++) listeners[i]();
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe
  };
}

export default createStore(reducer);
