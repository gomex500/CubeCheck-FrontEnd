import React, {useState, useEffect} from "react";
import Carga from './partials/Carga';
import Carga2 from "./partials/Carga2";
import Swal from 'sweetalert2';
import Input from '../components/Input';
import Btn2 from '../components/Btn2';
import axios from "axios";
import '../css/users.css';

const Users = () =>{

    const [carga, setCarga] = useState(true);
    const [carga2, setCarga2] = useState(false);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState("");
    const [Rol, setRol] = useState("");

    const alertas = (icono, texto) =>{
        Swal.fire({
            // position: 'top-end',
            icon: icono,
            title: texto,
            showConfirmButton: false,
            timer: 1500
          });
    }

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
        if (!carga) {
            setCarga2(true);
        }
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
                setCarga2(false);
            })
            .catch((error) =>{
                console.log(error);
                setCarga(false);
            })
        } else {
            setCarga(false);
        }
    }

    const buscarUsuario = (e) =>{
        e.preventDefault();
        setCarga2(true);
        if(email){
            const datos = localStorage.getItem('data');
            const data = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
            }
            axios.get(`https://cubecheck.onrender.com/email/${email}`,config)
            .then((response) =>{
                setUsers([]);
                setUser(response.data);
                setCarga2(false);
            })
            .catch((error) =>{
                console.log(error);
                alertas('error', error.response.data.message);
                setCarga2(false);
            })
        }else{
        alertas('error', 'campo vacio');
        setCarga2(false);
        }
    }

    const cancelar = () =>{
        setEmail('');
        obtenerUsuarios();
    }

    const cambiarR = (id, rol) =>{
        setCarga2(true);
        if (rol === "user") {
            setRol({"rol":"admin"});
        } else {
            setRol({"rol":"user"});
        }
        const datos = localStorage.getItem('data');
        const data = JSON.parse(datos);
        const config = {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
        }
        axios.put(`https://cubecheck.onrender.com/rol/${id}`, Rol, config)
            .then((response) =>{
                obtenerUsuarios();
                setRol("");
                alertas('success',response.data.message);
            })
            .catch((error) =>{
                console.log(error);
                alertas('error', error.response.data.message);
                setCarga2(false);
            })
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
                {carga2 ? <Carga2/> : null}
                <div className="cont-users">
                    <center>
                        <h2>Administracion de Usuarios</h2>
                        <div className="cont-search">
                            <form onSubmit={buscarUsuario}>
                                <div className="form-cont">
                                    <Input
                                        tp={'email'}
                                        cls={'form-control input'}
                                        val={email}
                                        fuc={e => setEmail(e.target.value)}
                                        ph={'Buscar por correo'}
                                    />
                                    <Btn2
                                        tp={'submit'}
                                        cls={'btn1'}
                                        text={<i class="fa-solid fa-magnifying-glass"></i>}
                                    />
                                    <Btn2
                                        tp={'button'}
                                        cls={'btn3'}
                                        func={cancelar}
                                        text={(() =>{
                                            if (email.length > 0) {
                                               return <i class="fa-solid fa-delete-left"></i>
                                            } else {
                                                return <i class="fa-solid fa-rotate"></i>
                                            }
                                        })()}
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
                                        <th>Cambiar Rol</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                {users.length > 0 ? (
                                    users.map((user, i) => (
                                    <tr key={user._id} className="tbody">
                                        <td>{i + 1}</td>
                                        <td>{user.nombre}</td>
                                        <td>{user.apellido}</td>
                                        <td>{user.edad}</td>
                                        <td>{user.rol}</td>
                                        <td>{user.telefono}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Btn2
                                                tp={'button'}
                                                cls={(() =>{
                                                    if (user.rol === 'admin') {
                                                        return "btn4"
                                                    }else{
                                                        return "btn2"
                                                    }
                                                })()}
                                                text={<i class="fa-solid fa-rotate"></i>}
                                                func={() => cambiarR(user._id, user.rol)}
                                            />
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr className="tbody">
                                        <td>{1}</td>
                                        <td>{user.nombre}</td>
                                        <td>{user.apellido}</td>
                                        <td>{user.edad}</td>
                                        <td>{user.rol}</td>
                                        <td>{user.telefono}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Btn2
                                                tp={'button'}
                                                cls={(() =>{
                                                    if (user.rol === 'admin') {
                                                        return "btn4"
                                                    }else{
                                                        return "btn2"
                                                    }
                                                })()}
                                                text={<i class="fa-solid fa-rotate"></i>}
                                                func={() => cambiarR(user._id, user.rol)}
                                            />
                                        </td>
                                    </tr>
                                )}
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