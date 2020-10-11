import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app", //this is the name of the slice
  initialState: {
    channelId: null,
    channelName: null,
  },
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});

export const { setChannelInfo } = appSlice.actions; //Reducer

export const selectChannelId = (state) => state.app.channelId; //Selector function
export const selectChannelName = (state) => state.app.channelName;

export default appSlice.reducer;
