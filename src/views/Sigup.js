import React from "react";
import '../css/sigup.css';
import Btn1 from '../components/Btn1';
import Input from '../components/Input';
import Btn2 from "../components/Btn2";
import logo from '../img/logo.png';

const Sigup = () =>{
    return(
        <div className="seccion">
            <div className="con-sigup animate__animated animate__fadeInDown">
                <div className="row">
                    <div className="sigup-img">
                        <center>
                            <img src={logo} alt="logo"/>
                            <h2>CubeCheck</h2>
                        </center>
                    </div>
                    <div className="sigup-form">
                        <center>
                            <h2>Registro</h2>
                            <form className="form">
                                <Input
                                    tp={"text"}
                                    cls={"form-control input1"}
                                    // val={""}
                                    fuc={console.log('')}
                                    ph={"Nombre"}
                                />
                                <Input
                                    tp={"text"}
                                    cls={"form-control input1"}
                                    // val={""}
                                    fuc={console.log('')}
                                    ph={"Apellido"}
                                />
                                <Input
                                    tp={"number"}
                                    cls={"form-control input2"}
                                    // val={""}
                                    fuc={console.log('')}
                                    ph={"Edad"}
                                />
                                <Input
                                    tp={"tel"}
                                    cls={"form-control input3"}
                                    // val={""}
                                    fuc={console.log('')}
                                    ph={"Telefono"}
                                />
                                <Input
                                    tp={"email"}
                                    cls={"form-control input"}
                                    // val={""}
                                    fuc={console.log('')}
                                    ph={"Correo"}
                                />
                                <Input
                                    tp={"password"}
                                    cls={"form-control input"}
                                    // val={""}
                                    fuc={console.log('')}
                                    ph={"Password"}
                                />
                                <Input
                                    tp={"password"}
                                    cls={"form-control input"}
                                    // val={""}
                                    fuc={console.log('')}
                                    ph={"Password nuevamente"}
                                />
                                <Btn2
                                    tp={"sumit"}
                                    cls={"btn3"}
                                    text={"Iniciar"}
                                />
                            </form>
                            <p>ya tienes cuenta
                                <Btn1
                                    text={"Ingresa aqui"}
                                    cls={"btn2"}
                                    url={"/login"}
                                />
                            </p>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Sigup;