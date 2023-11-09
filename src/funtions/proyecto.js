import {configApi} from '../apis/configApi'

export const crearProyecto = (proyecto) =>{
    if (proyecto.nombre === "" && proyecto.description === "") {
        return false;
    } else {
        const config = {
            headers: {
              Authorization: `Bearer zdvfer45656767n67n`,
            },
        }
        configApi.post(`/proyectos`,proyecto,config)
        .then((response) =>{
            return response.data
        })
        .catch((error) =>{
            return false
        })
    }
}


