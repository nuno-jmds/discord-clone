import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import appReducer from "../features/appSlice";

//This store is the outbound layer. We configure the layer here
export default configureStore({
  //the reducer is the listener
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
