import React, {useEffect, useState} from "react";
import { Btn2, Input } from "../../components";
import {Carga} from '../partials/Loading'
import { useDispatch, useSelector } from "react-redux";
import '../../css/Projects.css';
import Swal from "sweetalert2";
import { configApi } from "../../apis/configApi";

import {getProjects} from '../../store/slices/ProyectSlices/proyectThunks'
import Contruccion from "../partials/Proyects/Contruccion";

const Projects = () =>{

    const dispatch = useDispatch();
    const { proyectos, isLoading } = useSelector( state => state.proyectos);
    const { user } = useSelector( state => state.user);
    // const {user, setUser} = useState("");
    const [proyecto, setProyecto] = useState({
        "nombre": "",
        "descripcion": "",
        "user":user._id,
        "presupuesto": {},
        "construccion": {}
    });

    const [verNew, setVerNew] = useState(false);
    const [vistaC, setVistaC] = useState(false);
    const [idP, setIdP] = useState("");

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

    const enviarTools = async (tool) =>{
        configApi.put(`/tools/${tool}`)
        .then(response =>{
            console.log(response.data);
        })
        .catch(error =>{
            console.log(error);
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

    const verProyecto = (id) =>{
        setIdP(id);
        setVistaC(true);
        setVerNew(false);
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
            const datos = localStorage.getItem('data');
            if (datos) {
                const data = JSON.parse(datos);
                const config = {
                    headers: {
                    Authorization: `Bearer ${data.token}`,
                    },
                }
                console.log(proyecto);

                configApi.post(`/proyectos`,proyecto,config)
                .then((response) =>{
                    alertas('success',response.data.mensaje);
                    // dispatch(getProjects());
                    // window.location = '/projects';
                    setIdP(response.data.id);
                    setVistaC(true);
                    setVerNew(false);
                    enviarTools('proyecto')
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


    if (isLoading) {
        return (<Carga/>);
    } else {
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
        } else if(vistaC){
            return(<Contruccion id={idP}/>);
        } else{
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
                                            func={() => verProyecto(pro._id)}
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
                </div>
            );
        }
    }

}

export default Projects;