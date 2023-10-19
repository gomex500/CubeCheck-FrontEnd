import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'Users',
    initialState: {
       Users: [],
       isLoading: false
    },
    reducers:{
       startIsLoadingUsers: (state) =>{
           state.isLoading = true;
       },
       getUsuarios: (state, action) =>{
           state.Users = action.payload.Users;
           state.isLoading = action.payload.isLoading;
       }
    },
});

export const { startIsLoadingUsers, getUsuarios } = usersSlice.actions;