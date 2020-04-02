import store from "./customStore";
import * as actions from "./actions";

console.log(store.getState());

store.dispatch(actions.bugAdded("A new bug"));

console.log(store.getState());
