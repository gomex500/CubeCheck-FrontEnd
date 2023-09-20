import React, {useState, useEffect} from "react";
import '../css/profile.css'
import Input from "../components/Input";
import Btn2 from "../components/Btn2";
import axios from "axios";
import logo from '../img/logo1.png';
import Carga from "./partials/Carga";

const Profile = () =>{

    const [editar, setEditar] = useState(true);
    const [user, setUser] = useState({});
    const [carga, setCarga] = useState(true);
    const [editPass, setEditPass] = useState(false);

    const cerrarSession = () =>{
        localStorage.removeItem('data');
        localStorage.setItem('session', false);
        window.location = '/';
    }

    useEffect(() =>{
        const datos = localStorage.getItem('data');
        if (datos) {
            const data = JSON.parse(datos);
            localStorage.removeItem('session');
            const config = {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
            }
            axios.get(`https://cubecheck.onrender.com/user/${data.id}`,config)
            .then((response) =>{
                setUser(response.data);
                setCarga(false);
            })
            .catch((error) =>{
                console.log(error);
                setCarga(false);
            })
        } else {
            setUser({
                'nombre':'Iniciar',
                'apellido':'Sesion'
            });
            localStorage.removeItem('data');
            localStorage.setItem('session',false);
            setCarga(false);
        }
    }, []);

    if (carga) {
        return(
            <Carga/>
        )
    } else {
        return(
            <div className="seccion">
                <div className="con-user animate__animated animate__fadeInDown">
                    <div className="row">
                        <div className="user-img">
                            <center>
                                <img src={logo} alt="logo"/>
                                <h2>Bienvenido</h2>
                            </center>
                        </div>
                        <div className="user-form">
                            <center>
                                <h2>Datos de Usuario</h2>
                                <form className="form">
                                    <Input
                                        tp={"text"}
                                        cls={"form-control input1"}
                                        val={user.nombre}
                                        // fuc={obtenerDatos}
                                        ph={"Nombre"}
                                        nm={"nombre"}
                                        dis={editar}
                                    />
                                    <Input
                                        tp={"text"}
                                        cls={"form-control input1"}
                                        val={user.apellido}
                                        // fuc={obtenerDatos}
                                        ph={"Apellido"}
                                        nm={"apellido"}
                                        dis={editar}
                                    />
                                    <Input
                                        tp={"number"}
                                        cls={"form-control input2"}
                                        val={user.edad}
                                        // fuc={obtenerDatos}
                                        ph={"Edad"}
                                        nm={"edad"}
                                        dis={editar}
                                    />
                                    <Input
                                        tp={"tel"}
                                        cls={"form-control input3"}
                                        val={user.telefono}
                                        // fuc={obtenerDatos}
                                        ph={"Telefono"}
                                        nm={"telefono"}
                                        dis={editar}
                                    />
                                    <Input
                                        tp={"email"}
                                        cls={"form-control input"}
                                        val={user.email}
                                        // fuc={obtenerDatos}
                                        ph={"Email"}
                                        nm={"email"}
                                        dis={editar}
                                    />
                                    {(() =>{
                                        if (editPass) {
                                            return(
                                                <>
                                                    <Input
                                                    tp={"password"}
                                                    cls={"form-control input"}
                                                    // val={user.password}
                                                    // fuc={obtenerDatos}
                                                    ph={"Password"}
                                                    nm={"password"}
                                                    // dis={editar}
                                                />
                                                <Input
                                                    tp={"password"}
                                                    cls={"form-control input"}
                                                    // val={passwordN}
                                                    // fuc={e => setPasswordN(e.target.value)}
                                                    ph={"Password nuevamente"}
                                                    // dis={editar}
                                                />
                                                </>
                                            );
                                        } else {
                                            return(
                                                <div className="cont-btn">
                                                    {editar ? <Btn2
                                                        tp={'button'}
                                                        cls={'btn2'}
                                                        text={<i class="fa-solid fa-pencil"></i>}
                                                        func={() => setEditar(!editar)}
                                                    /> :
                                                    <Btn2
                                                        tp={'button'}
                                                        cls={"btn3"}
                                                        func={() => setEditar(!editar)}
                                                        text={<i class="fa-solid fa-delete-left"></i>}
                                                    />}
                                                    <Btn2
                                                        tp={'button'}
                                                        cls={"btn1"}
                                                        func={() => setEditPass(!editPass)}
                                                        text={"Cambiar password"}
                                                    />
                                                </div>
                                            );
                                        }
                                    })()}
                                </form>
                                {(() =>{
                                    if (editPass) {
                                        return(
                                            <div className="cont-btn">
                                                <Btn2
                                                    tp={'button'}
                                                    cls={"btn1"}
                                                    func={() => setEditPass(!editPass)}
                                                    text={"Guardar"}
                                                />
                                                <Btn2
                                                    tp={'button'}
                                                    cls={"btn3"}
                                                    func={() => setEditPass(!editPass)}
                                                    text={<i class="fa-solid fa-delete-left"></i>}
                                                />
                                            </div>
                                        );
                                    } else {
                                        return(
                                            <div className="cont-btn">
                                                <Btn2
                                                    cls={"btn1"}
                                                    func={cerrarSession}
                                                    text={"Cerrar Sesion"}
                                                />
                                                <Btn2
                                                    cls={"btn1"}
                                                    func={cerrarSession}
                                                    text={"Eliminar Cuenta"}
                                                />
                                            </div>
                                        );
                                    }
                                })()}
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;