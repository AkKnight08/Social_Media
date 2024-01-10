import { configureStore } from '@reduxjs/toolkit';
import {sphereReducer} from './sphereReducer';

export const store = configureStore({
  reducer: {
    sphere: sphereReducer,
  },
});
