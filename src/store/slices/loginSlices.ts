import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    accessToken: ''
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    }
  }
})

export const { setAccessToken } = loginSlice.actions;
export default loginSlice.reducer;