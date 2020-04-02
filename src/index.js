import store from "./store";

import { bugAdded, bugRemoved } from "./actions";

// Truyền hàm callback mình muốn nó chạy khi store thay đổi
const unsubscribe = store.subscribe(() => {
  console.log("%cStore changed!", "background:yellow;font-size:20px");
  console.log(store.getState());
});

// Dispatch 'bugAdded' action
store.dispatch(bugAdded("Bug No.1"));

unsubscribe(); // Store sau này có thay đổi cũng ko biết, vì unsubscribe rồi

// Dispatch 'bugRemoved' action
store.dispatch(bugRemoved(1));

console.log(store.getState());
