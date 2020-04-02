import store from "./store";

import * as actions from "./actionTypes";

// Truyền hàm callback mình muốn nó chạy khi store thay đổi
const unsubscribe = store.subscribe(() => {
  console.log("%cStore changed!", "background:yellow;font-size:20px");
  console.log(store.getState());
});

// Dispatch 'bugAdded' action
store.dispatch({
  type: actions.BUG_ADDED,
  payload: {
    description: "Bug1"
  }
});

unsubscribe(); // Store sau này có thay đổi cũng ko biết, vì unsubscribe rồi

// Dispatch 'bugRemoved' action
store.dispatch({
  type: actions.BUG_REMOVED,
  payload: {
    id: 1
  }
});

console.log(store.getState());
