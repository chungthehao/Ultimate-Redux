let lastId = 0;

// Reducer in Redux have to be a pure function.
function reducer(state = [], action) {
  switch (action.type) {
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          resolved: false,
          description: action.payload.description
        }
      ];
    case "bugRemoved":
      return state.filter(bug => bug.id !== action.payload.id);
    default:
      return state;
  }
}
