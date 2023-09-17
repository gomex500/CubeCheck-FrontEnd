import React, {useState, useEffect} from "react";
import Carga from './partials/Carga';
import Input from '../components/Input';
import Btn2 from '../components/Btn2';
import axios from "axios";
import '../css/users.css';

const Users = () =>{

    const [carga, setCarga] = useState(true);
    const [users, setUsers] = useState([]);

    const obtenerRol = () =>{
        const datos = localStorage.getItem('data');
        if (datos) {
            const data = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
            }
            axios.get(`https://cubecheck.onrender.com/user/${data.id}`,config)
            .then((response) =>{
                if (response.data.rol === 'admin') {
                    setCarga(false);
                }else{
                    window.location = '/';
                }
            })
            .catch((error) =>{
                console.log(error);
                setCarga(false);
                window.location = '/';
            })
        } else {
            setCarga(false);
            window.location = '/';
        }
    }

    const obtenerUsuarios = () =>{
        const datos = localStorage.getItem('data');
        if (datos) {
            const data = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
            }
            axios.get(`https://cubecheck.onrender.com/users`,config)
            .then((response) =>{
                setUsers(response.data);
                setCarga(false);
            })
            .catch((error) =>{
                console.log(error);
                setCarga(false);
            })
        } else {
            setCarga(false);
        }
    }

    useEffect(() =>{
        obtenerRol();
        obtenerUsuarios();
    }, [])

    if (carga) {
        return(
            <Carga/>
        );
    } else {
        return(
            <div className="seccion">
                <div className="cont-users">
                    <center>
                        <h2>Administracion de Usuarios</h2>
                        <div className="cont-search">
                            <form>
                                <div className="form-cont">
                                    <Input
                                        tp={'search'}
                                        cls={'form-control input'}
                                        ph={'Buscar por correo'}
                                    />
                                    <Btn2
                                        tp={'submit'}
                                        cls={'btn1'}
                                        text={<i class="fa-solid fa-magnifying-glass"></i>}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="cont-tabla table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr className="table-head">
                                        <th>N#</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Edad</th>
                                        <th>Rol</th>
                                        <th>Telefono</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {users.map((user, i) =>(
                                        <tr key={user._id} className="tbody">
                                            <td>{i+1}</td>
                                            <td>{user.nombre}</td>
                                            <td>{user.apellido}</td>
                                            <td>{user.edad}</td>
                                            <td>{user.rol}</td>
                                            <td>{user.telefono}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </center>
                </div>
            </div>
        );
    }
}

export default Users;