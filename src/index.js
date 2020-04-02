import store from "./store";
import * as actions from "./actions";

store.subscribe(() => {
  console.log("Store changed!");
});

console.log("Store not changed yet!");

store.dispatch(actions.bugAdded("A new bug"));
