// *** CÁC ACTION CREATORS ***
// - Là 1 func trả về 1 cấu trúc object cho việc dispatch action
// - Khi cần sửa cấu trúc đó, sửa 1 chỗ thôi

import * as actions from "./actionTypes";

export const bugAdded = description => ({
  type: actions.BUG_ADDED,
  payload: {
    description: description
  }
});

export const bugRemoved = id => ({
  type: actions.BUG_REMOVED,
  payload: {
    id: id
  }
});
