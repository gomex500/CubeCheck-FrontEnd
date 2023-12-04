import { createSlice } from '@reduxjs/toolkit';

export const materialesXUsoSlice = createSlice({
    name: 'materialesXUso',
    initialState: {
        MaterialesXUso: [],
        isLoading: false
    },
    reducers:{
        startIsLoadingMaterialXUso: (state) =>{
            state.isLoading = true;
        },
        getMaterialesXUso: (state, action) =>{
            state.MaterialesXUso = action.payload.MaterialesXUso;
            state.isLoading = action.payload.isLoading;
        }
     },
});

export const { startIsLoadingMaterialXUso, getMaterialesXUso } = materialesXUsoSlice.actions;