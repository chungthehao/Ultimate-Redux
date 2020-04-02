function createStore() {
  let state; // private, vì không bị expose ra ngoài.

  function getState() {
    return state;
  }

  return {
    getState
  };
}

export default createStore();
