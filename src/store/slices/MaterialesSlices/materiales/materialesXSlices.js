import { createSlice } from '@reduxjs/toolkit';

export const materialesXSlice = createSlice({
    name: 'materialesX',
    initialState: {
        MaterialesX: [],
        isLoading: false
    },
    reducers:{
        startIsLoadingMaterialX: (state) =>{
            state.isLoading = true;
        },
        getMaterialesX: (state, action) =>{
            state.MaterialesX = action.payload.MaterialesX;
            state.isLoading = action.payload.isLoading;
        }
     },
});

export const { startIsLoadingMaterialX, getMaterialesX } = materialesXSlice.actions;