import store from "./store";

import { bugAdded, bugRemoved, bugResolved } from "./actions";

// Truyền hàm callback mình muốn nó chạy khi store thay đổi
const unsubscribe = store.subscribe(() => {
  console.log("%cStore changed!", "background:yellow;font-size:20px");
  console.log(store.getState());
});

store.dispatch(bugAdded("Bug No.1"));

unsubscribe(); // Store sau này có thay đổi cũng ko biết, vì unsubscribe rồi

store.dispatch(bugResolved(1));

console.log(store.getState());
