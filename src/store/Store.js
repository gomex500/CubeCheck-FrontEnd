import { configureStore } from '@reduxjs/toolkit';
import { materialesXSlice } from './slices/MaterialesSlices/materialesXSlices';
import { materialesYSlice } from './slices/MaterialesSlices/materialesYSlices';
import { proyectosSlice } from './slices/ProyectSlices/proyectSlices';
import { userSlice } from './slices/UserSlices/userSlices';
import { usersSlice } from './slices/UsersSlices/usersSlice';

export const Store = configureStore({
    reducer:{
        user: userSlice.reducer,
        users: usersSlice.reducer,
        materialesx: materialesXSlice.reducer,
        materialesy: materialesYSlice.reducer,
        proyectos: proyectosSlice.reducer
    },
});