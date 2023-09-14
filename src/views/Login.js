import React, {useState} from "react";
import '../css/login.css';
import logo from '../img/logo.png';
import Input from '../components/Input'
import Btn2 from "../components/Btn2";
import Btn1 from "../components/Btn1";

const Login = () =>{

    const [user, setUser] = useState({
        'correo':'',
        'password':''
    })

    const obtenerDatos = (e) =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const validarDatos = () =>{
        if (user.correo !== '' && user.password !== '') {
            if (user.password.length < 8){
                alert('password muy corto');
                return false;
            }
            alert('datos validados');
            return true;
        } else {
            alert('a un hay campos vacios');
            return false;
        }
    }

    const enviarDatos = (e) =>{
        e.preventDefault();
        if (validarDatos()) {
            console.log(user);
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
                                    val={user.correo}
                                    fuc={obtenerDatos}
                                    ph={"Ingrese @email"}
                                    nm={"correo"}
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