import { createSlice } from '@reduxjs/toolkit';

export const misMaterialesXSlice = createSlice({
    name: 'misMaterialesX',
    initialState: {
        MisMaterialesX: [],
        isLoading: false
    },
    reducers:{
        startIsLoadingMisMaterialX: (state) =>{
            state.isLoading = true;
        },
        getMisMaterialesX: (state, action) =>{
            state.MisMaterialesX = action.payload.MisMaterialesX;
            state.isLoading = action.payload.isLoading;
        }
     },
});

export const { startIsLoadingMisMaterialX, getMisMaterialesX } = misMaterialesXSlice.actions;