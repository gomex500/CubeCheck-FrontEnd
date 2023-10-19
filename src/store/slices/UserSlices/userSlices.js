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
            state.user = action.payload.user;
            state.isSession = action.payload.isSession;
            state.isLoading = action.payload.isLoading;
        },
        setUsuario: (state, action) =>{
            
        }
    },
});

export const { startLoadigUser, getUsuario } = userSlice.actions;