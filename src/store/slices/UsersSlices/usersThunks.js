import { configApi } from "../../../apis/configApi";
import {getUsuarios, startIsLoadingUsers} from "./usersSlice";

const datos = localStorage.getItem('data');

export const getUsers = () =>{
    return async (dispatch) =>{

        dispatch( startIsLoadingUsers() );

        if (datos) {
            const dato = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${dato.token}`,
                },
            }
            const {data} = await configApi('/users', config);
            // console.log(data);
            dispatch( getUsuarios({
                Users: data,
                isLoading: false
            }));

        } else {
            dispatch( getUsuarios({
                Users: [{}],
                isLoading: false
            }));
        }

    }
}
