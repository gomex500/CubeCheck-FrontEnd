import React, {useState, useEffect} from "react";
import '../css/profile.css'
import Input from "../components/Input";
import Btn2 from "../components/Btn2";
import axios from "axios";
import logo from '../img/logo.png';
import Carga from "./partials/Carga";
import Carga2 from "./partials/Carga2";
import Swal from "sweetalert2";

const Profile = () =>{

    const [editar, setEditar] = useState(false);
    const [user, setUser] = useState({});
    const [carga, setCarga] = useState(true);
    const [carga2, setCarga2] = useState(false);
    const [editPass, setEditPass] = useState(false);
    const [userPassword, setUserPassword] = useState({
        "password":"",
        "newPassword":""
    })

    const cerrarSession = () =>{
        localStorage.removeItem('data');
        localStorage.setItem('session', false);
        window.location = '/';
    }

    const auxi = () =>{
        setEditar(!editar);
        obtenerUsuerio();
    }

    const alertas = (icono, texto) =>{
        Swal.fire({
            // position: 'top-end',
            icon: icono,
            title: texto,
            showConfirmButton: false,
            timer: 1500
          })
    }

    const obtenerUsuerio = () =>{
        setCarga2(true);
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
                setCarga2(false);
            })
            .catch((error) =>{
                console.log(error);
                setCarga(false);
                setCarga2(false);
            })
        } else {
            setUser({
                'nombre':'Iniciar',
                'apellido':'Sesion'
            });
            localStorage.removeItem('data');
            localStorage.setItem('session',false);
            setCarga(false);
            setCarga2(false);
        }
    }

    const obtenerDatos = (e) =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const obtenerPassword = (e) =>{
        const {name, value} = e.target
        setUserPassword({
            ...user,
            [name]:value
        })
    }

    const validarDatos = () => {
        if (
            user.nombre === "" ||
            user.apellido === "" ||
            user.edad === "" ||
            user.telefono === ""
        ) {
            auxi();
            alertas('error', 'Aun hay campos Vacios');
            return false;
        }else if(user.edad < 15){
            auxi();
            alertas('error','A un eres menor de edad');
            return false;
        }else{
            return true;
        }
    }

    const actualizarUsuario = (e) =>{
        e.preventDefault();
        if (validarDatos()) {
            enviarDatos();
        }
        setEditar(!editar);
    }

    const enviarDatos = () =>{
        setCarga2(true);
        const datos = localStorage.getItem('data');
        const data = JSON.parse(datos);
        const config = {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
        }
        axios.put(`https://cubecheck.onrender.com/userb/${data.id}`,
            {
                "nombre": user.nombre,
                "apellido": user.apellido,
                "edad":user.edad,
                "telefono":user.telefono
            }
            , config)
            .then((response) =>{
                alertas('success',response.data.message);
                setCarga2(false);
            })
            .catch((error) =>{
                console.log(error);
                alertas('error', error.response.data.message);
                setCarga2(false);
            })
    }

    const validarPassword = () =>{
        if (userPassword.password !== '') {
            if (userPassword.newPassword !== '') {
                console.log(userPassword);
            } else {
                alertas('error', 'campos vacios');
            }
        }else{
            alertas('error', 'campos vacios');
        }
    }

    useEffect(() =>{
        setEditar(true);
        obtenerUsuerio();
    }, []);

    if (carga) {
        return(
            <Carga/>
        )
    } else {
        return(
            <div className="seccion">
                {carga2 ? <Carga2/> : null}
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
                                <form className="form" onSubmit={actualizarUsuario}>
                                    {/* <label for='nombre' className="form-label">Nombre:</label> */}
                                    <Input
                                        tp={"text"}
                                        cls={"form-control input1"}
                                        val={user.nombre}
                                        fuc={obtenerDatos}
                                        ph={"Nombre"}
                                        nm={"nombre"}
                                        dis={editar}
                                    />
                                    <Input
                                        tp={"text"}
                                        cls={"form-control input1"}
                                        val={user.apellido}
                                        fuc={obtenerDatos}
                                        ph={"Apellido"}
                                        nm={"apellido"}
                                        dis={editar}
                                    />
                                    <Input
                                        tp={"number"}
                                        cls={"form-control input2"}
                                        val={user.edad}
                                        fuc={obtenerDatos}
                                        ph={"Edad"}
                                        nm={"edad"}
                                        dis={editar}
                                    />
                                    <Input
                                        tp={"tel"}
                                        cls={"form-control input3"}
                                        val={user.telefono}
                                        fuc={obtenerDatos}
                                        ph={"Telefono"}
                                        nm={"telefono"}
                                        dis={editar}
                                    />
                                    <Input
                                        tp={"email"}
                                        cls={"form-control input"}
                                        val={user.email}
                                        fuc={obtenerDatos}
                                        ph={"Email"}
                                        nm={"email"}
                                        dis={true}
                                    />
                                    {(() =>{
                                        if (editPass) {
                                            return(
                                                <>
                                                    <Input
                                                    tp={"password"}
                                                    cls={"form-control input"}
                                                    val={userPassword.password}
                                                    fuc={obtenerPassword}
                                                    ph={"Password actual"}
                                                    nm={"password"}
                                                />
                                                <Input
                                                    tp={"password"}
                                                    cls={"form-control input"}
                                                    val={userPassword.newPassword}
                                                    fuc={obtenerPassword}
                                                    ph={"newPassword"}
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
                                                        func={() => auxi()}
                                                        text={<i class="fa-solid fa-delete-left"></i>}
                                                    />}
                                                    {editar ? <Btn2
                                                        tp={'button'}
                                                        cls={"btn4"}
                                                        func={() => setEditPass(!editPass)}
                                                        text={"Cambiar password"}
                                                    /> :
                                                    <Btn2
                                                        tp={'submit'}
                                                        cls={"btn4"}
                                                        text={"Guardar"}
                                                    />}
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
                                                    func={() => validarPassword()}
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
                                                    tp={'button'}
                                                    cls={"btn1"}
                                                    func={cerrarSession}
                                                    text={"Cerrar Sesion"}
                                                />
                                                <Btn2
                                                    tp={'button'}
                                                    cls={"btn5"}
                                                    // func={cerrarSession}
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