import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/UserSlices/userSlices';

export const Store = configureStore({
    reducer:{
        user: userSlice.reducer,
    },
});