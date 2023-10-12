import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isLoading: false,
        isSession: false,
    },
    reducers:{
        startLoadigUser: (state) =>{
            state.isLoading = true;
        },
        getUsuario: (state, action) =>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.isSession = action.payload.isSession;
        },
    },
});

export const { startLoadigUser, getUsuario } = userSlice.actions;