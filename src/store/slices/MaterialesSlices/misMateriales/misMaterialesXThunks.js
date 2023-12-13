import { configApi } from "../../../../apis/configApi";
import {startIsLoadingMisMaterialX, getMisMaterialesX} from "./misMaterialesXSlices"
const datos = localStorage.getItem('data');

export const getMisMaterialX = () =>{


    return async (dispatch) =>{

        dispatch( startIsLoadingMisMaterialX() );

        if (datos) {
            const dato = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${dato.token}`,
                },
            }
            const {data} = await configApi(`/mismaterialx/${dato.id}`, config);
            console.log(data);
            dispatch( getMisMaterialesX({
                MisMaterialesX: data,
                isLoading: false
            }));

        } else {
            dispatch( getMisMaterialesX({
                MisMaterialesX: [],
                isLoading: false
            }));
        }

    }
}
