import React, {useState} from "react";
import Swal from "sweetalert2";
import '../../../css/MateB.css'
import { Btn2, Input } from "../../../components";
import { configApi } from "../../../apis/configApi";

import { useSelector } from "react-redux";

const AddMateGeneral = () =>{

    const { user } = useSelector( state => state.user );

    const [mate, setMate] = useState({
        "nombre": "",
        "marca": "",
        "tipo": "Cemento",
        "medida": "",
        "cantidad": 0,
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
            mate.marca === "" ||
            mate.tipo === "" ||
            mate.medida === "" ||
            mate.cantidad <= 0 ||
            mate.precio <= 0 ||
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
        configApi.post('/materialx', mate, config)
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
                    <option value="Cemento">Cemento</option>
                    <option value="Arena">Arena</option>
                    <option value="Piedrin">Piedrin</option>
                    <option value=""></option>
                </select>
            </div>
            <div className="contI col-md-4">
                <label htmlFor='marca'>Ingrese Marca:</label>
                <Input
                    tp={'text'}
                    cls={'input1'}
                    ph={'Marca'}
                    nm={'marca'}
                    val={mate.marca}
                    fuc={obtenerDatos}
                />
            </div>
            <div className="contI col-md-4">
                <label htmlFor='cantidad'>Ingrese Cantidad:</label>
                <Input
                    tp={'number'}
                    cls={'input1'}
                    ph={'Cantidad'}
                    nm={'cantidad'}
                    val={mate.cantidad}
                    fuc={obtenerDatos}
                />
            </div>
            <div className="contI col-md-4">
                <label htmlFor='medida'>Ingrese Medida:</label>
                <Input
                    tp={'text'}
                    cls={'input1'}
                    ph={'ejemplo kg, m3, etc'}
                    nm={'medida'}
                    val={mate.medida}
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
                <textarea className="input1 textA form-control" name="description"  placeholder="Descripcion" value={mate.description} rows="4" cols="80" onChange={obtenerDatos}/>
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

export default AddMateGeneral;