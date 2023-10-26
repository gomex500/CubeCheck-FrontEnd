import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";

import '../../../css/MateB.css'
import { Btn2, Input } from "../../../components";
import { Carga2 } from "../Loading";

import { useDispatch, useSelector } from "react-redux";
import { getMaterialX } from "../../../store/slices/MaterialesSlices/materialesXThunks";
import { Carga } from "../Loading";
import { configApi } from "../../../apis/configApi";

const MaterialGeneral = () =>{

    const dispatch = useDispatch();
    const { MaterialesX, isLoading } = useSelector( state => state.materialesx);
    const [add, setAdd] = useState(false);
    const [update, setUpdate] = useState(false);
    const [carga2, setCarga2] = useState(false);
    const [mate, setMate] = useState({
        "nombre": "",
        "marca": "",
        "tipo": "Cemento",
        "medida": "",
        "cantidad": 0,
        "precio": 0.0,
        "description" :""
    });

    const [mate2, setMate2] = useState({
        "nombre": "",
        "marca": "",
        "tipo": "Cemento",
        "medida": "",
        "cantidad": 0,
        "precio": 0.0,
        "description" :""
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
        setCarga2(true);
        const datos = localStorage.getItem('data');
        const data = JSON.parse(datos);
        const config = {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
        }
        configApi.post('/materialx', mate, config)
        .then((response) =>{
            dispatch( getMaterialX() );
            setCarga2(false);
            alertas('success',"Material insertado");
            setAdd(false);
        })
        .catch((error) =>{
            console.log(error);
            setCarga2(false);
            alertas('error', error.response.data.message);
        })
    }

    const deleteMate = (id) =>{
        const datos = localStorage.getItem('data');
        if (datos) {
            const data = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
            }
            configApi.delete(`/materialx/${id}`,config)
            .then((response) =>{
                dispatch(getMaterialX());
                alertas('success',response.data.menssage);
            })
            .catch((error) =>{
                alertas('error',"Error al eliminar");
                console.log(error);
            })
        }
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

    const limpiardatos = () =>{
        setAdd(!add);
        setMate({
            "nombre": "",
            "marca": "",
            "tipo": "Cemento",
            "medida": "",
            "cantidad": 0,
            "precio": 0.0,
            "description" :""
        });
    }

    const enviardatos = (e) =>{
        e.preventDefault()
        if (validarDatos()) {
            ingresarMate();
        } else {
            alertas('error', 'Campos vacios');
        }
    }

    const tomarMate = (mat) =>{
        setMate2(mat);
        if (mate2 !== null) {
            setUpdate(true);
            setAdd(true);
            console.log(mate2);
        }
    }

    useEffect(() => {
        dispatch(getMaterialX());
    }, []);

    if (isLoading) {
        return ( <Carga/> );
    } else {
        return(
            <div className="seccion">
                {carga2 ? <Carga2/> : null}
                <div className="cont-materialbase">
                    <h2>Gestion de Materiales Base</h2>
                    <div className="cont-btn-add">
                        {add ? 
                        <Btn2
                            func={limpiardatos}
                            tp={"button"}
                            cls={"btn btnC btn-primary"}
                            text={<i className="fa-solid fa-ban"> Cancelar</i>}
                        />: 
                        <Btn2
                            func={limpiardatos}
                            tp={"button"}
                            cls={"btn btnA btn-primary"}
                            text={<i className="fa-solid fa-square-plus"> Add</i>}
                        />}
                    </div>
                    {(() =>{
                        if (add) {
                            return (
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
                                                fuc={obtenerDatos}
                                            />
                                        </div>
                                        <div className="contI col-md-4">
                                            <label htmlFor="tipo">Tipo de Material:</label>
                                            <select name="tipo" onChange={obtenerDatos} className='form-select'>
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
                                                fuc={obtenerDatos}
                                            />
                                        </div>
                                        <div className="contI col-md-4">
                                            <label htmlFor='precio'>Ingrese Precio en C$:</label>
                                            <Input
                                                tp={'number'}
                                                cls={'input1'}
                                                fuc={obtenerDatos}
                                                ph={'Precio'}
                                                nm={'precio'}
                                            />
                                        </div>
                                        <div className="contI col-md-12">
                                            <label htmlFor='description'>Ingrese Descripcion:</label>
                                            <textarea className="input1 textA form-control" name="description"  placeholder="Descripcion" rows="4" cols="80" onChange={obtenerDatos}/>
                                        </div>
                                        <div className="cont-btnA">
                                            <Btn2
                                                cls={"btn btn1 btn-primary"}
                                                text={update ? "Actualizar" : "Agregar"}
                                                tp={"submit"}
                                            />
                                        </div>
                                    </form>
                                </div>
                            )
                        } else {
                            
                        }
                    })()}
                    <div className={add ? "tableNone" : "table-responsive animate__animated animate__fadeInUp"}>
                        <table className="table cont-tb table-bordered">
                            <thead className="table-head">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Marca</th>
                                    <th>Tipo</th>
                                    <th>Cantidad</th>
                                    <th>Medida</th>
                                    <th>Precio</th>
                                    <th colSpan={"2"}>Accciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {MaterialesX.length > 0 ? (
                                    MaterialesX.map((mat) =>(
                                    <tr key={mat._id}>
                                        <td>{mat.nombre}</td>
                                        <td>{mat.marca}</td>
                                        <td>{mat.tipo}</td>
                                        <td>{mat.cantidad}</td>
                                        <td>{mat.medida}</td>
                                        <td>{mat.precio} C$</td>
                                        <td>
                                            <Btn2
                                                tp={"button"}
                                                cls={"btn btn1 btn-primary"}
                                                text={<i className="fa-solid fa-pencil"></i>}
                                                func={() => {tomarMate(mat)}}
                                            />
                                        </td>
                                        <td>
                                            <Btn2
                                                tp={"button"}
                                                cls={"btn btn2 btn-primary"}
                                                text={<i className="fa-solid fa-trash"></i>}
                                                func={() => deleteMate(mat._id)}
                                            />
                                        </td>
                                    </tr>
                                ))):null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default MaterialGeneral;