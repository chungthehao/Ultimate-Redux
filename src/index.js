import store from "./customStore";

console.log(store.getState());

store.state = 6969;

console.log(store.getState());
