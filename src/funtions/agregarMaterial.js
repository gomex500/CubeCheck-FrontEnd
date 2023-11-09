import {configApi} from '../apis/configApi'

export const validarDatos = (mate) =>{
    if (
        mate.nombre === "" ||
        mate.marca === "" ||
        mate.tipo === "" ||
        mate.medida === "" ||
        mate.cantidad <= 0 ||
        mate.precio <= 0 ||
        mate.description === ""
      ){
        return false;
    } else {
        return true;
    }
}

export const ingresarMate = (mate) =>{
    const config = {
        headers: {
          Authorization: `Bearer zdvfer45656767n67n`,
        },
    }
    return configApi.post('/materialy', mate, config)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        return false;
    })
}