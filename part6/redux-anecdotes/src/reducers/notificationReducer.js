import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showMessage(state, action) {
      let message = action.payload;
      return message;
    },
    clearMessage(state, action) {
      let message = null;
      return message;
    },
  },
});

export const { showMessage, clearMessage } = notificationSlice.actions;

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(showMessage(message));
    setTimeout(() => {
      dispatch(clearMessage());
    }, time);
  };
};

export default notificationSlice.reducer;
