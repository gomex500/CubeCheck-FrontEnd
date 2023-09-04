import React from "react";
import '../css/login.css';
import logo from '../img/logo.png';
import Input from '../components/Input'
import Btn2 from "../components/Btn2";
import Btn1 from "../components/Btn1";
import BtnChat from "../components/BtnChat";

const Login = () =>{
    return(
        <div className="seccion">
            <div className="con-login animate__animated animate__fadeInDown">
                <div className="row">
                    <div className="login-img">

                    </div>
                    <div className="login-form">
                        <center>
                            <img src={logo} alt="logo"/>
                            <h2>inicar Secion</h2>
                            <form className="form">
                                <Input
                                    tp={"email"}
                                    cls={"form-control input"}
                                    // val={""}
                                    fuc={console.log('')}
                                    ph={"Ingrese @email"}
                                />
                                <Input
                                    tp={"password"}
                                    cls={"form-control input"}
                                    // val={""}
                                    fuc={console.log('')}
                                    ph={"Ingrese contrasena"}
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
                                    url={"/"}
                                />
                            </p>
                        </center>
                    </div>
                </div>
            </div>
            <BtnChat/>
        </div>
    );
}

export default Login;