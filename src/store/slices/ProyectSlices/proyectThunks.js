import { configApi } from "../../../apis/configApi";
import { getProyecto, startLoadigProyectos } from "./proyectSlices"; 

const datos = localStorage.getItem('data');

export const getProjects = () =>{
    return async (dispatch) =>{

        dispatch( startLoadigProyectos() );

        if (datos) {
            const dato = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${dato.token}`,
                },
            }
            const {data} = await configApi('/proyectos', config);
            
            dispatch( getProyecto({
                proyectos: data,
                isLoading: false
            }));

        } else {
            dispatch( getProyecto({
                proyectos: [],
                isLoading: false
            }));
        }

    }
}
