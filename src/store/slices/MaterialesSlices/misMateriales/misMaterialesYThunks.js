import { configApi } from "../../../../apis/configApi";
import {getMisMaterialesY, startIsLoadingMisMaterialY} from "./misMaterialesYSlices"

const datos = localStorage.getItem('data');

export const getMisMaterialY = () =>{

    return async (dispatch) =>{

        dispatch( startIsLoadingMisMaterialY() );

        if (datos) {
            const dato = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${dato.token}`,
                },
            }
            const {data} = await configApi(`/mismaterialy/${dato.id}`, config);
            dispatch( getMisMaterialesY({
                MisMaterialesY: data,
                isLoading: false
            }));

        } else {
            dispatch( getMisMaterialesY({
                MisMaterialesY: [],
                isLoading: false
            }));
        }

    }
}
