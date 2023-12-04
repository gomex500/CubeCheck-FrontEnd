import { configApi } from "../../../../apis/configApi";
import {getMaterialesXUso, startIsLoadingMaterialXUso} from "./materialesXUsoSlices"

const datos = localStorage.getItem('data');

export const getMaterialX = () =>{
    return async (dispatch) =>{

        dispatch( startIsLoadingMaterialXUso() );

        if (datos) {
            const dato = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${dato.token}`,
                },
            }
            const {data} = await configApi(`/materialxuso/${dato.id}`, config);
            
            dispatch( getMaterialesXUso({
                MaterialesX: data,
                isLoading: false
            }));

        } else {
            dispatch( getMaterialesXUso({
                MaterialesX: [],
                isLoading: false
            }));
        }

    }
}
