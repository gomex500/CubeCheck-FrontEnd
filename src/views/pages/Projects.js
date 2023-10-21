import React, {useEffect, useState} from "react";
import { Btn2, Esquema, Input } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import '../../css/Projects.css';
import Swal from "sweetalert2";
import { configApi } from "../../apis/configApi";

import {getProjects} from '../../store/slices/ProyectSlices/proyectThunks'

const Projects = () =>{

    const dispatch = useDispatch();
    const { proyectos } = useSelector( state => state.proyectos);
    const [proyecto, setProyecto] = useState({
        "nombre": "",
        "descripcion": "",
        "presupuesto": 0,
        "construccion": {}
    });

    const [verNew, setVerNew] = useState(false);

        const contruccion = {
            "embaldosado": [10,1,10]
        }

    const ver = () =>{
        setVerNew(!verNew);
    }

    const obtenerDatos = (e) =>{
        const {name, value} = e.target
        setProyecto({
            ...proyecto,
            [name]:value
        })
    }

    const alertas = (icono, texto) =>{
        Swal.fire({
            // position: 'top-end',
            icon: icono,
            title: texto,
            showConfirmButton: false,
            timer: 1500
          });
    }

    const deleteProyect = (id) =>{
        const datos = localStorage.getItem('data');
        if (datos) {
            const data = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
            }
            configApi.delete(`/proyectos/${id}`,config)
            .then((response) =>{
                alertas('success',response.data.mensaje);
                dispatch(getProjects());
            })
            .catch((error) =>{
                console.log(error);
            })
        }
    }

    const crearProyecto = () =>{
        if (proyecto.nombre === "" && proyecto.description === "") {
            alertas('error','Campos Vacios');
        } else {
            console.log(proyecto);
            const datos = localStorage.getItem('data');
            if (datos) {
                const data = JSON.parse(datos);
                const config = {
                    headers: {
                    Authorization: `Bearer ${data.token}`,
                    },
                }
                configApi.post(`/proyectos`,proyecto,config)
                .then((response) =>{
                    alertas('success',response.data.mensaje);
                    // dispatch(getProjects());
                    window.location = '/projects';
                })
                .catch((error) =>{
                    console.log(error);
                })
            }
        }
    }

    useEffect(() => {
      dispatch(getProjects());
    }, [])
    
    const verFecha = (date) =>{
        const fecha = new Date(date);
        return `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`
    }


    if (verNew) {
        return(
            <div className="cont-new-proyecto">
                <Btn2
                    cls={"btn btn1 btn-primary"}
                    text={<i className="fa-solid fa-circle-xmark"></i>}
                    func={ver}
                />
                <div className="form-newP">
                    <h2>Nuevo Proyecto</h2>
                    <Input
                        cls={"form-control input"}
                        ph={"Nombre"}
                        tp={"text"}
                        nm={"nombre"}
                        fuc={obtenerDatos}
                    />
                    <textarea className="des-pro form-control" name="descripcion" onChange={obtenerDatos} placeholder="Descripcion" rows="8" cols="80"/>
                    <Btn2
                        cls={"btn btn2 btn-primary"}
                        text={"Crear"}
                        tp={"button"}
                        func={crearProyecto}
                    />
                </div>
            </div>
        )
    } else {
        return(
            <div className="seccion">
                <div className="cont-Projects">
                    <h1>Gestion de Proyectos</h1>
                    <div className="cont-proyectos row">
                    <div className="card-proyecto new col-md-3">
                            <h3>Nuevo Proyecto</h3>
                            <Btn2
                                tp={"button"}
                                cls={"btn1"}
                                text={<i className="fa-solid fa-folder-plus"></i>}
                                func={ver}
                            />
                        </div>
                        {proyectos.length > 0 ? 
                            (proyectos.map((pro) =>(
                            <div key={pro._id} className="card-proyecto col-md-3">
                                <h3>{pro.nombre}</h3>
                                <p className="pfecha"><span>Fecha:</span> {verFecha(pro.create_at)}</p>
                                <div className="card-des">
                                    <p>{pro.descripcion}</p>
                                </div>
                                <center>
                                    <Btn2
                                        tp={"button"}
                                        cls={"btn1"}
                                        text={<i className="fa-solid fa-eye"></i>}
                                    />
                                    <Btn2
                                        tp={"button"}
                                        cls={"btn1"}
                                        text={<i className="fa-solid fa-trash"></i>}
                                        func={()=>deleteProyect(pro._id)}
                                    />
                                </center>
                            </div>)
                        )) : null}
                    </div>
                </div>
                <Esquema className="esquema" contruccion={contruccion}/>
            </div>
        );
    }
}

export default Projects;