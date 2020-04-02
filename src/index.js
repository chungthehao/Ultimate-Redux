import store from "./store";

// Dispatch 'bugAdded' action
store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1"
  }
});

// Xem thử state hiện tại trong store
console.log(store.getState());

// Dispatch 'bugRemoved' action
store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1
  }
});

// Xem thử state hiện tại trong store
console.log(store.getState());
