import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import '../../../css/MateB.css'

import { useDispatch, useSelector } from "react-redux";
import { Btn2, Input } from "../../../components";

import { getMaterialY } from "../../../store/slices/MaterialesSlices/materialesYThunks";
import { Carga } from "../Loading";

const MaterialBase = () =>{

    const dispatch = useDispatch();
    const { MaterialesY, isLoading } = useSelector( state => state.materialesy);
    const [add, setAdd] = useState(false);
    const [mate, setMate] = useState({
        "nombre": "",
        "tipo": "",
        "x":0,
        "y":0,
        "z":0,
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
            mate.tipo === "" ||
            mate.x < 0 ||
            mate.y < 0 ||
            mate.precio < 0 ||
            mate.z < 0 ||
            mate.description === ""
          ){
            return false;
        } else {
            return true;
        }
    }

    const obtenerDatos = (e) =>{
        const {name, value} = e.target
        setMate({
            ...mate,
            [name]:value
        })
    }

    const limpiardatos = () =>{
        setAdd(!add);
        setMate({
            "nombre": "",
            "tipo": "",
            "x":0,
            "y":0,
            "z":0,
            "precio": 0.0,
            "description" :""
        });
    }

    const enviardatos = (e) =>{
        e.preventDefault()
        if (validarDatos()) {
            alertas('success', 'Listo');
            console.log(mate);
        } else {
            alertas('error', 'Campos vacios');
        }
    }

    useEffect(() => {
        dispatch(getMaterialY());
    }, []);


    if (isLoading) {
        return (<Carga/>)
    } else {
        return(
            <div className="seccion">
                <div className="cont-materialbase">
                    <h2>Gestion de Materiales Base</h2>
                    <div className="cont-btn-add">
                        {add ? 
                        <Btn2
                            func={limpiardatos}
                            tp={"button"}
                            cls={"btn btnC btn-primary"}
                            text={<i class="fa-solid fa-ban"> Cancelar</i>}
                        />: 
                        <Btn2
                            func={limpiardatos}
                            tp={"button"}
                            cls={"btn btnA btn-primary"}
                            text={<i class="fa-solid fa-square-plus"> Add</i>}
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
                                                <option value="Ladrillo">Ladrillo</option>
                                                <option value="Bloque">Bloque</option>
                                                <option value="Piedra">Piedra Cantera</option>
                                            </select>
                                        </div>
                                        <div className="contI col-md-4">
                                            <label htmlFor='y'>Ingrese Alto en Cm:</label>
                                            <Input
                                                tp={'number'}
                                                cls={'input1'}
                                                ph={'Alto'}
                                                nm={'y'}
                                                fuc={() => parseInt(obtenerDatos)}
                                            />
                                        </div>
                                        <div className="contI col-md-4">
                                            <label htmlFor='x'>Ingrese Ancho en Cm:</label>
                                            <Input
                                                tp={'number'}
                                                cls={'input1'}
                                                ph={'Ancho'}
                                                nm={'x'}
                                                fuc={() => parseInt(obtenerDatos)}
                                            />
                                        </div>
                                        <div className="contI col-md-4">
                                            <label htmlFor='z'>Ingrese Largo en Cm:</label>
                                            <Input
                                                tp={'number'}
                                                cls={'input1'}
                                                ph={'Largo'}
                                                nm={'z'}
                                                fuc={() => parseInt(obtenerDatos)}
                                            />
                                        </div>
                                        <div className="contI col-md-4">
                                            <label htmlFor='precio'>Ingrese Precio en C$:</label>
                                            <Input
                                                tp={'number'}
                                                cls={'input1'}
                                                ph={'Precio'}
                                                nm={'precio'}
                                                fuc={() => parseInt(obtenerDatos)}
                                            />
                                        </div>
                                        <div className="contI col-md-12">
                                            <label htmlFor='description'>Ingrese Descripcion:</label>
                                            <textarea className="input1 textA form-control" name="description"  placeholder="Descripcion" rows="4" cols="80" onChange={obtenerDatos}/>
                                        </div>
                                        <div className="cont-btnA">
                                            <Btn2
                                                cls={"btn btn1 btn-primary"}
                                                text={"Agregar"}
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
                                    <th>Tipo</th>
                                    <th>Alto</th>
                                    <th>Ancho</th>
                                    <th>Largo</th>
                                    <th>Precio</th>
                                    <th colspan="2">Accciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {MaterialesY.length > 0 ? (
                                    MaterialesY.map((mate) =>(
                                    <tr key={mate._id}>
                                        <td>{mate.nombre}</td>
                                        <td>{mate.tipo}</td>
                                        <td>{mate.y} cm</td>
                                        <td>{mate.x} cm</td>
                                        <td>{mate.z} cm</td>
                                        <td>{mate.precio} C$</td>
                                        <td>
                                            <Btn2
                                                tp={"button"}
                                                cls={"btn btn1 btn-primary"}
                                                text={<i class="fa-solid fa-pencil"></i>}
                                                func={console.log('')}
                                            />
                                        </td>
                                        <td>
                                            <Btn2
                                                tp={"button"}
                                                cls={"btn btn2 btn-primary"}
                                                text={<i class="fa-solid fa-trash"></i>}
                                                func={console.log('')}
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

export default MaterialBase;