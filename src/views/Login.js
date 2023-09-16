import React, {useState} from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import '../css/login.css';
import logo from '../img/logo.png';
import Input from '../components/Input'
import Btn2 from "../components/Btn2";
import Btn1 from "../components/Btn1";

const Login = () =>{
    const [user, setUser] = useState({
        'email':'',
        'password':''
    })

    const obtenerDatos = (e) =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]:value
        })
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

    const validarDatos = () =>{
        if (user.email !== '' && user.password !== '') {
            if (user.password.length < 8){
                alertas('error','Password muy corto');
                return false;
            }
            return true;
        } else {
            alertas('error', 'Aun hay campos Vacios');
            return false;
        }
    }

    const enviarDatosPost = () =>{
        axios.post('http://127.0.0.1:5000/login', user)
        .then((response) => {
            console.log(response.data)
            const datos = response.data
            const data = {
                'id':datos.id,
                "token":datos.token,
                "session":true
            }
            localStorage.setItem('data',JSON.stringify(data));
            alertas('success','Bienvenido');
            window.location = "/";
        })
        .catch((error) =>{
            console.log('error',error);
            alertas('error',error.response.data.message);
        });
    }

    const enviarDatos = (e) =>{
        e.preventDefault();
        if (validarDatos()) {
            enviarDatosPost();
        }
    }

    return(
        <div className="seccion">
            <div className="con-login animate__animated animate__fadeInDown">
                <div className="row">
                    <div className="login-img">

                    </div>
                    <div className="login-form">
                        <center>
                            <img src={logo} alt="logo"/>
                            <h2>inicar Sesion</h2>
                            <form className="form" onSubmit={enviarDatos}>
                                <Input
                                    tp={"email"}
                                    cls={"form-control input"}
                                    val={user.email}
                                    fuc={obtenerDatos}
                                    ph={"Ingrese @email"}
                                    nm={"email"}
                                />
                                <Input
                                    tp={"password"}
                                    cls={"form-control input"}
                                    val={user.password}
                                    fuc={obtenerDatos}
                                    ph={"Ingrese contrasena"}
                                    nm={"password"}
                                />
                                <Btn2
                                    tp={"sumit"}
                                    cls={"btn1"}
                                    text={"Iniciar"}
                                />
                            </form>
                            <p>No tienes cuenta
                                <Btn1
                                    text={"Registrate ahora"}
                                    cls={"btn2"}
                                    url={"/sigup"}
                                />
                            </p>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;