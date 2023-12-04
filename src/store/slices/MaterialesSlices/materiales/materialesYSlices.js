import { createSlice } from '@reduxjs/toolkit';

export const materialesYSlice = createSlice({
    name: 'materialesY',
    initialState: {
        MaterialesY: [],
        isLoading: false
    },
    reducers:{
        startIsLoadingMaterialX: (state) =>{
            state.isLoading = true;
        },
        getMaterialesY: (state, action) =>{
            state.MaterialesY = action.payload.MaterialesY;
            state.isLoading = action.payload.isLoading;
        }
     },
});

export const { startIsLoadingMaterialX, getMaterialesY } = materialesYSlice.actions;