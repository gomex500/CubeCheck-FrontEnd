import { configApi } from "../../../../apis/configApi";
import {getMaterialesX, startIsLoadingMaterialX} from "./materialesXSlices"

const datos = localStorage.getItem('data');

export const getMaterialX = () =>{
    return async (dispatch) =>{

        dispatch( startIsLoadingMaterialX() );

        if (datos) {
            const dato = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${dato.token}`,
                },
            }
            const {data} = await configApi('/materialx', config);
            
            dispatch( getMaterialesX({
                MaterialesX: data,
                isLoading: false
            }));

        } else {
            dispatch( getMaterialesX({
                MaterialesX: [],
                isLoading: false
            }));
        }

    }
}
