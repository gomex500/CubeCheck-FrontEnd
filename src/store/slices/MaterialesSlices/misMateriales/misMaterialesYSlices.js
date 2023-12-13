import { createSlice } from '@reduxjs/toolkit';

export const misMaterialesYSlice = createSlice({
    name: 'misMaterialesY',
    initialState: {
        MisMaterialesY: [],
        isLoading: false
    },
    reducers:{
        startIsLoadingMisMaterialY: (state) =>{
            state.isLoading = true;
        },
        getMisMaterialesY: (state, action) =>{
            state.MisMaterialesY = action.payload.MisMaterialesY;
            state.isLoading = action.payload.isLoading;
        }
     },
});

export const { startIsLoadingMisMaterialY, getMisMaterialesY } = misMaterialesYSlice.actions;