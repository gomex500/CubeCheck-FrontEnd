import React, {useState} from "react";
import Swal from "sweetalert2";

import '../../../css/MateB.css'
import { Btn2, Input } from "../../../components";

import { configApi } from "../../../apis/configApi";
import { useSelector } from "react-redux";
const AddMateBase = () =>{

    const { user } = useSelector( state => state.user );
    const [mate, setMate] = useState({
        "nombre": "",
        "tipo": "Ladrillo",
        "x":0,
        "y":0,
        "z":0,
        "precio": 0.0,
        "description" :"",
        "creador": user._id
    });

    const alertas = (icono, texto) =>{
        Swal.fire({
            // position: 'top-end',
            icon: icono,
            title: texto,
            showConfirmButton: false,
            timer: 1500
          });
    }

    const validarDatos = () =>{
        if (
            mate.nombre === "" ||
            mate.tipo === "" ||
            mate.x <= 0 ||
            mate.y <= 0 ||
            mate.precio === 0 ||
            mate.z <= 0 ||
            mate.description === ""
          ){
            return false;
        } else {
            return true;
        }
    }

    const ingresarMate = () =>{
        const datos = localStorage.getItem('data');
        const data = JSON.parse(datos);
        const config = {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
        }
        configApi.post('/materialy', mate, config)
        .then((response) =>{
            alertas('success',"Material insertado");
            window.location = "/materials";
        })
        .catch((error) =>{
            console.log(error);
            alertas('error', error.response.data.message);
        })
    }

    const obtenerDatos = (e) =>{
        const {name, value} = e.target
        if (!isNaN(value)) {
            const integerValue = parseInt(value);
            setMate({
                ...mate,
                [name]: integerValue
            });
        } else {
            setMate({
                ...mate,
                [name]: value
            });
        }
    }

    const enviardatos = (e) =>{
        e.preventDefault()
        if (validarDatos()) {
            ingresarMate();
        } else {
            alertas('error', 'Campos vacios');
        }
    }

    return(
        <div className="form-add-mate animate__animated animate__fadeInLeft ">
                                <h4>Agregar Nuevo Material</h4>
                                <form className="form-mate row" onSubmit={enviardatos}>
                                    <div className="contI col-md-4">
                                        <label htmlFor='nombre'>Ingrese Nombre:</label>
                                        <Input
                                            tp={'text'}
                                            cls={'input1'}
                                            ph={'Nombre'}
                                            nm={'nombre'}
                                            val={mate.nombre}
                                            fuc={obtenerDatos}
                                        />
                                    </div>
                                    <div className="contI col-md-4">
                                        <label htmlFor="tipo">Tipo de Material:</label>
                                        <select name="tipo" onChange={obtenerDatos} value={mate.tipo} className='form-select'>
                                            <option value="Ladrillo">Ladrillo</option>
                                            <option value="Bloque">Bloque</option>
                                            <option value="Piedra">Piedra</option>
                                        </select>
                                    </div>
                                    <div className="contI col-md-4">
                                        <label htmlFor='y'>Ingrese Alto en Cm:</label>
                                        <Input
                                            tp={'number'}
                                            cls={'input1'}
                                            ph={'Alto'}
                                            val={mate.y}
                                            nm={'y'}
                                            fuc={obtenerDatos}
                                        />
                                    </div>
                                    <div className="contI col-md-4">
                                        <label htmlFor='x'>Ingrese Ancho en Cm:</label>
                                        <Input
                                            tp={'number'}
                                            cls={'input1'}
                                            ph={'Ancho'}
                                            val={mate.x}
                                            nm={'x'}
                                            fuc={obtenerDatos}
                                        />
                                    </div>
                                    <div className="contI col-md-4">
                                        <label htmlFor='z'>Ingrese Largo en Cm:</label>
                                        <Input
                                            tp={'number'}
                                            cls={'input1'}
                                            ph={'Largo'}
                                            val={mate.z}
                                            nm={'z'}
                                            fuc={obtenerDatos}
                                        />
                                    </div>
                                    <div className="contI col-md-4">
                                        <label htmlFor='precio'>Ingrese Precio en C$:</label>
                                        <Input
                                            tp={'number'}
                                            cls={'input1'}
                                            val={mate.precio}
                                            fuc={obtenerDatos}
                                            ph={'Precio'}
                                            nm={'precio'}
                                        />
                                    </div>
                                    <div className="contI col-md-12">
                                        <label htmlFor='description'>Ingrese Descripcion:</label>
                                        <textarea className="input1 textA form-control" value={mate.description} name="description"  placeholder="Descripcion" rows="4" cols="80" onChange={obtenerDatos}/>
                                    </div>
                                    <div className="cont-btnA">
                                        <center>
                                        <Btn2
                                            cls={"btn btn1 btn-primary"}
                                            text={"Agregar"}
                                            tp={"submit"}
                                        />
                                        </center>
                                    </div>
                                </form>
                            </div>
    );
}

export default AddMateBase;