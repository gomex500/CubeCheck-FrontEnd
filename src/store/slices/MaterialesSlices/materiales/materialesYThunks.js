import { configApi } from "../../../../apis/configApi";
import {getMaterialesY, startIsLoadingMaterialX} from "./materialesYSlices"

const datos = localStorage.getItem('data');

export const getMaterialY = () =>{
    return async (dispatch) =>{

        dispatch( startIsLoadingMaterialX() );

        if (datos) {
            const dato = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${dato.token}`,
                },
            }
            const {data} = await configApi('/materialy', config);
            dispatch( getMaterialesY({
                MaterialesY: data,
                isLoading: false
            }));

        } else {
            dispatch( getMaterialesY({
                MaterialesY: [],
                isLoading: false
            }));
        }

    }
}
