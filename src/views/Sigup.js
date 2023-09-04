import React from "react";
import '../css/sigup.css';
import Btn1 from '../components/Btn1';
import Input from '../components/Input';
import Btn2 from "../components/Btn2";

const Sigup = () =>{
    return(
        <div className="seccion">
            <div className="con-sigup animate__animated animate__fadeInDown">
                <div className="row">
                    <div className="cont1">
                        <p>Registro de Usuario</p>
                    </div>
                    <div className="cont2"></div>
                </div>
                <div className="form-sigup">
                    <form className="row form">
                        <div className="form1">
                            <Input
                                tp={"text"}
                                cls={"form-control input"}
                                fuc={console.log("")}
                                // val={}
                                ph={"Ingrese su nombre"}
                            />
                            <Input
                                tp={"text"}
                                cls={"form-control input"}
                                fuc={console.log("")}
                                // val={}
                                ph={"Ingrese su apellido"}
                            />
                            <Input
                                tp={"email"}
                                cls={"form-control input"}
                                fuc={console.log("")}
                                // val={}
                                ph={"Ingrese su @gmail"}
                            />
                            <Input
                                tp={"password"}
                                cls={"form-control input"}
                                fuc={console.log("")}
                                // val={}
                                ph={"Ingrese su contrasena"}
                            />
                            <Input
                                tp={"password"}
                                cls={"form-control input"}
                                fuc={console.log("")}
                                // val={}
                                ph={"Ingrese contrasena nuevamente"}
                            />
                        </div>
                        <div className="form2">
                            <Input
                                tp={"text"}
                                cls={"form-control input"}
                                fuc={console.log("")}
                                // val={}
                                ph={"Ingrese su nombre completo"}
                            />
                            <Input
                                tp={"text"}
                                cls={"form-control input"}
                                fuc={console.log("")}
                                // val={}
                                ph={"Ingrese su tarjeta"}
                            />
                            <Input
                                tp={"text"}
                                cls={"form-control input"}
                                fuc={console.log("")}
                                // val={}
                                ph={"Ingrese su codigo"}
                            />
                            <Input
                                tp={"text"}
                                cls={"form-control input2"}
                                fuc={console.log("")}
                                // val={}
                                ph={"Ingrese mes"}
                            />
                            <Input
                                tp={"text"}
                                cls={"form-control input2"}
                                fuc={console.log("")}
                                // val={}
                                ph={"Ingrese su ano"}
                            />
                            <Input
                                tp={"text"}
                                cls={"form-control input"}
                                fuc={console.log("")}
                                // val={}
                                ph={"Ingrese su region"}
                            />
                        </div>
                        <Btn2
                            tp={"sumit"}
                            cls={"btn1"}
                            text={"Registrar"}
                        />
                    </form>
                </div>
                <div className="row">
                    <div className="cont3"></div>
                    <div className="cont4">
                        <p>Ya tienes cuenta
                                <Btn1
                                    text={"Ingresa Aqui"}
                                    cls={"btn2"}
                                    url={"/login"}
                                />
                            </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Sigup;