import { configApi } from "../../../apis/configApi";
import {getUsuario, startLoadigUser} from "./userSlices";

const datos = localStorage.getItem('data');

export const getUser = () =>{
    return async (dispatch, getState) =>{

        dispatch( startLoadigUser() );

        if (datos) {
            const dato = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${dato.token}`,
                },
            }
            const {data} = await configApi(`user/${dato.id}`, config);

            dispatch( getUsuario({
                user: data,
                isSession: true,
                isLoading: false
            }));

        } else {
            dispatch( getUsuario({
                user: {},
                isSession: false,
                isLoading: false
            }));
        }

    }
}