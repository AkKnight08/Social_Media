import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loggedIn: false,
  user:{},
  profileUser:{}
};

const sphereSlice = createSlice({
  name: "sphere",
  initialState: initialState,
  reducers: {
    setTrue: (state) => {
      state.loggedIn = true;
    },
    setFalse: (state) => {
      state.loggedIn = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProfileUser: (state, action) => {
      state.profileUser = action.payload;
    },
  },
  extraReducers: {},
});

const { actions, reducer: sphereReducer } = sphereSlice;
const loggedInSelector = (state) => state.sphere.loggedIn;
const userSelector=(state)=>state.sphere.user;
const profileUserSelector = (state) => state.sphere.profileUser;
export { actions, sphereReducer, loggedInSelector, userSelector,profileUserSelector };
