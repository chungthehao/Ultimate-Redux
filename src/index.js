import configureStore from "./store/configureStore";
import { assignBugToUser, loadBugs } from "./store/bugs";

const store = configureStore();

store.dispatch(loadBugs());
store.dispatch(assignBugToUser({ bugId: 4, userId: 6 }));
