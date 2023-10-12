import React, {useState} from "react";
import Swal from 'sweetalert2';
import '../../css/sigup.css';
import { Btn1, Btn2, Input } from "../../components";
import logo from '../../img/logo.png';
import axios from "axios";
import { Carga2 } from "../partials/Loading";

const Sigup = () =>{

    const [user, setUser] = useState({
        'nombre': '',
        'apellido': '',
        'edad': '',
        'telefono':'',
        'email': '',
        'password': ''
    });
    const [passwordN, setPasswordN] = useState('');
    const [carga, setCarga] = useState(false);

    const obtenerDatos = (e) =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const validarDatos = () => {
        if (
            user.nombre === '' ||
            user.apellido === '' ||
            user.edad === '' ||
            user.telefono === '' ||
            user.email === '' ||
            user.password === ''
        ) {
            alertas('error', 'Aun hay campos Vacios');
            return false;
        }else if (user.password.length < 8){
            alertas('error','Password muy corto');
            return false;
        }else if(user.edad < 15){
            alertas('error','A un eres menor de edad');
            return false;
        }else if (passwordN === user.password) {
            return true;
        } else {
            alertas('error', 'El password no coincide');
            return false;
        }
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
    const enviarDatosPost = () =>{
        setCarga(true);
        axios.post('https://cubecheck.onrender.com/signin', user)
        .then((response) => {
            console.log(response.data)
            const datos = response.data
            const data = {
                'id':datos.id,
                "token":datos.token,
                "session":true
            }
            localStorage.setItem('data',JSON.stringify(data));
            setCarga(false);
            alertas('success','Bienvenido');
            window.location = "/";
        })
        .catch((error) =>{
            console.log('error',error);
            setCarga(false);
            alertas('error',error.response.data.message);
        });
    }

    const enviarDatos = (e) =>{
        e.preventDefault();
        if(validarDatos()){
            // console.log(user);
            enviarDatosPost();
        }
    }

    return(
        <div className="seccion">
            {carga ? <Carga2/> : null}
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
                            <form className="form" onSubmit={enviarDatos}>
                                <Input
                                    tp={"text"}
                                    cls={"form-control input1"}
                                    val={user.nombre}
                                    fuc={obtenerDatos}
                                    ph={"Nombre"}
                                    nm={"nombre"}
                                />
                                <Input
                                    tp={"text"}
                                    cls={"form-control input1"}
                                    val={user.apellido}
                                    fuc={obtenerDatos}
                                    ph={"Apellido"}
                                    nm={"apellido"}
                                />
                                <Input
                                    tp={"number"}
                                    cls={"form-control input2"}
                                    val={user.edad}
                                    fuc={obtenerDatos}
                                    ph={"Edad"}
                                    nm={"edad"}
                                />
                                <Input
                                    tp={"tel"}
                                    cls={"form-control input3"}
                                    val={user.telefono}
                                    fuc={obtenerDatos}
                                    ph={"Telefono"}
                                    nm={"telefono"}
                                />
                                <Input
                                    tp={"email"}
                                    cls={"form-control input"}
                                    val={user.email}
                                    fuc={obtenerDatos}
                                    ph={"Email"}
                                    nm={"email"}
                                />
                                <Input
                                    tp={"password"}
                                    cls={"form-control input"}
                                    val={user.password}
                                    fuc={obtenerDatos}
                                    ph={"Password"}
                                    nm={"password"}
                                />
                                <Input
                                    tp={"password"}
                                    cls={"form-control input"}
                                    val={passwordN}
                                    fuc={e => setPasswordN(e.target.value)}
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