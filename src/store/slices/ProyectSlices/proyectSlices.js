import { createSlice } from '@reduxjs/toolkit';

export const proyectosSlice = createSlice({
    name: 'proyectos',
    initialState: {
        proyectos: {},
        isLoading: false,
    },
    reducers:{
        startLoadigProyectos: (state) =>{
            state.isLoading = true;
        },
        getProyecto: (state, action) =>{
            state.proyectos = action.payload.proyectos;
            state.isLoading = action.payload.isLoading;
        },
    },
});

export const { startLoadigProyectos, getProyecto } = proyectosSlice.actions;