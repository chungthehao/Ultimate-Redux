import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  getUnresolvedBugs,
  getBugsByUser,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
import { apiCallBegan } from "./store/api";

const store = configureStore();

store.dispatch(
  apiCallBegan({
    url: "/bugs",
    onSuccess: "bugsReceived", // type action mà sẽ dispatch khi api này resolved
    // onError: "mySpecificApiCallFailedActionType", // type action mà sẽ dispatch khi api này bị rejected
  })
);

// store.dispatch({
//   type: "error",
//   payload: { message: "An error occurred." }
// });

// store.dispatch((dispatch, getState) => {
//   dispatch({
//     type: "bugsReceived",
//     bugs: [1, 2, 3]
//   });
//   console.log(getState());
// });

// *** USERS ***
// store.dispatch(userAdded({ name: "User 1" }));
// store.dispatch(userAdded({ name: "User 2" }));

// *** PROJECTS ***
// store.dispatch(projectAdded({ name: "Project 1" }));

// *** BUGS ***
// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));

// store.dispatch(bugResolved({ id: 1 }));

// store.dispatch(bugAssignedToUser({ bugId: 2, userId: 1 }));
// store.dispatch(bugAssignedToUser({ bugId: 3, userId: 1 }));

// const user1Bugs = getBugsByUser(1)(store.getState());
// console.log(user1Bugs);
