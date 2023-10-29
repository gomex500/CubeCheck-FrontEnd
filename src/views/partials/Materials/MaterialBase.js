import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";

import '../../../css/MateB.css'
import { Btn2, Input } from "../../../components";
import { Carga2 } from "../Loading";

import { useDispatch, useSelector } from "react-redux";
import { getMaterialY } from "../../../store/slices/MaterialesSlices/materialesYThunks";
import { Carga } from "../Loading";
import { configApi } from "../../../apis/configApi";

const MaterialBase = () =>{

    const dispatch = useDispatch();
    const { MaterialesY, isLoading } = useSelector( state => state.materialesy);
    const [add, setAdd] = useState(false);
    const [update, setUpdate] = useState(false);
    const [carga2, setCarga2] = useState(false);
    const [mate, setMate] = useState({
        "nombre": "no se",
        "tipo": "Ladrillo",
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

    const updateMate = () =>{
        setCarga2(true);
        const datos = localStorage.getItem('data');
        const data = JSON.parse(datos);
        const config = {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
        }
        configApi.put(`/materialy/${mate._id}`, mate, config)
        .then((response) =>{
            dispatch( getMaterialY() );
            setCarga2(false);
            alertas('success',response.data.message);
            setUpdate(false);
            setAdd(false);
        })
        .catch((error) =>{
            console.log(error);
            setCarga2(false);
            alertas('error', error.response.data.menssage);
        })
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
        configApi.post('/materialy', mate, config)
        .then((response) =>{
            dispatch( getMaterialY() );
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
            configApi.delete(`/materialy/${id}`,config)
            .then((response) =>{
                dispatch(getMaterialY());
                alertas('success',response.data.mensaje);
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
            "tipo": "Ladrillo",
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
            ingresarMate();
        } else {
            alertas('error', 'Campos vacios');
        }
    }

    const actualizarDatos = (e) =>{
        e.preventDefault()
        if (validarDatos()) {
            updateMate();
        } else {
            alertas('error', 'Campos vacios');
        }
    }

    const tomarMate = (mat) =>{
        setMate(mat);
        if (mate !== null) {
            setUpdate(true);
            setAdd(true);
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
                                    <form className="form-mate row" onSubmit={update ? actualizarDatos : enviardatos}>
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
                                    <th>Tipo</th>
                                    <th>Alto</th>
                                    <th>Ancho</th>
                                    <th>Largo</th>
                                    <th>Precio</th>
                                    <th colSpan={"2"}>Accciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {MaterialesY.length > 0 ? (
                                    MaterialesY.map((mat) =>(
                                    <tr key={mat._id}>
                                        <td>{mat.nombre}</td>
                                        <td>{mat.tipo}</td>
                                        <td>{mat.y} cm</td>
                                        <td>{mat.x} cm</td>
                                        <td>{mat.z} cm</td>
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

export default MaterialBase;