import {configApi} from '../apis/configApi'

export const cambiarR = (id, rol) =>{
    const config = {
        headers: {
          Authorization: `Bearer zdvfer45656767n67n`,
        },
    }
    if (rol === "user") {
        return configApi.put(`/rol/${id}`, {"rol":"admin"}, config)
        .then((response) =>{
            return response.data;
        })
        .catch((error) =>{
            throw error;
        })
    } else {
        return configApi.put(`/rol/${id}`, {"rol":"user"}, config)
        .then((response) =>{
            return response.data;
        })
        .catch((error) =>{
            throw error;
        })
    }
}