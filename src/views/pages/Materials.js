import React, {useEffect, useState} from "react";
import '../../css/materials.css'
import {Piedra, Cemento, Bloque, Ladrillo, Arena, Piedrin, Hierro} from '../../img/materials'

import { useDispatch, useSelector } from "react-redux";
import { Btn2, Btn1 } from "../../components";
import { getMaterialX } from "../../store/slices/MaterialesSlices/materiales/materialesXThunks";
import { getMaterialY } from "../../store/slices/MaterialesSlices/materiales/materialesYThunks";
import { getMisMaterialX } from "../../store/slices/MaterialesSlices/misMateriales/misMaterialesXThunks";
import { getMisMaterialY } from "../../store/slices/MaterialesSlices/misMateriales/misMaterialesYThunks";
import { getUser } from "../../store/slices/UserSlices/userThunks";
import { Carga } from "../partials/Loading";
import { configApi } from "../../apis/configApi";
import { AddMateBase } from "../partials/Materials";
import AddMateGeneral from "../partials/Materials/AddMateGeneral";

const Materials = () =>{
    const dispatch = useDispatch();
    const { MaterialesX } = useSelector( state => state.materialesx);
    const { MaterialesY, isLoading } = useSelector( state => state.materialesy);
    const { user } = useSelector( state => state.user );
    const {MisMaterialesX} = useSelector( state => state.mismaterialesx);
    const {MisMaterialesY} = useSelector( state => state.mismaterialesy);

    const [ver, setVer] = useState(false);
    const [mate, setMate] = useState(null);

    const [todos, setTodos] = useState(true);
    const [misMate, setMisMate] = useState(false);
    const [uso, setUso] = useState(false);

    const [addMB, setAddMB] = useState(false);
    const [addMG, setAddMG] = useState(false);
    const [verF, setVerF] = useState(false);

    const ValImg = (tipo) =>{
        if (tipo === "Piedra") {
            return Piedra;
        } else if(tipo === "Bloque") {
            return Bloque;
        }else if(tipo === "Ladrillo"){
            return Ladrillo;
        }else if (tipo === "Cemento"){
            return Cemento;
        }else if(tipo === "Arena") {
            return Arena;
        }else if(tipo === "Piedrin"){
            return Piedrin;
        }else if (tipo === "Hierro"){
            return Hierro;
        }
    }

    const verDetalle = (mate) =>{
        setMate(mate);
        setVer(true);
    }

    const cerrar = () =>{
        setVer(false);
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

    const verFormulario = (n) => {
        setVerF(true);
        if (n === 1) {
            setAddMG(true);
        } else {
            setAddMB(true);
        }
    }

    const cancelarFormulario = (n) =>{
        setVerF(false);
        if (n === 1) {
            setAddMG(false);
        } else {
            setAddMB(false);
        }
    }

    useEffect(() => {
        dispatch( getMaterialX() );
        dispatch( getMaterialY() );
        dispatch( getUser() );
        dispatch(getMisMaterialX());
        dispatch( getMisMaterialY() );
        enviarTools('materiales')
    }, [])

    const cambiarVista = (n) =>{
        if(n === 1){
            setTodos(true);
            setMisMate(false);
            setUso(false);
            setAddMB(false);
        }else if(n === 2){
            setTodos(false);
            setMisMate(true);
            setUso(false);
            setAddMB(false);
        }else if(n === 3){
            setTodos(false);
            setMisMate(false);
            setUso(true);
            setAddMB(false);
        }
    }

    if (isLoading) {
        return (<Carga/>)
    } else {
        return(
            <div className="seccion">
                <div className={ver ? "com-mateV" : "cont-Mate"}>
                    <h2>Materiales de Construcción</h2>
                    <div className="grupo_btn">
                        <Btn2
                            tp={"button"}
                            text={"Todos"}
                            cls={todos ? 'btnMate2' : 'btnMate1'}
                            func={() => cambiarVista(1)}
                        />
                        <Btn2
                            tp={"button"}
                            text={"Mis Materiales"}
                            cls={misMate ? 'btnMate2' : 'btnMate1'}
                            func={() => cambiarVista(2)}
                        />
                        <Btn2
                            tp={"button"}
                            text={"En uso"}
                            cls={uso ? 'btnMate2' : 'btnMate1'}
                            func={() => cambiarVista(3)}
                        />
                    </div>
                    {(() =>{
                        if(uso){
                            return(
                                <div>
                                    <div className="BtnGestionMateriales">
                                        <h3 className="title1">Materiales Base</h3>
                                    </div>
                                    <hr/>
                                    <div className="cont-mate-base">
                                        {MaterialesY.length > 0 ? (
                                            MaterialesY.map((mate) =>(
                                                <div className="card-mate" key={mate._id}>
                                                    <h3>{mate.nombre}</h3>
                                                    <center>
                                                    <img src={ValImg(mate.tipo)} className="mate-img" alt="img-mate"/>
                                                    </center>
                                                    <div className="card-body">
                                                        <p>Tipo: {mate.tipo}</p>
                                                        <p>Precio: C$ {mate.precio}</p>
                                                        <div className="grupo_btn1">
                                                            <Btn2
                                                                func={() => verDetalle(mate)}
                                                                tp={"button"}
                                                                cls={"btnMate3"}
                                                                text={"Ver"}
                                                            />
                                                            <Btn2
                                                                func={() => verDetalle(mate)}
                                                                tp={"button"}
                                                                cls={"btnMate3"}
                                                                text={"Usar"}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ): (<div>
                                            <h3>No hay Materiales Base</h3>
                                        </div>)}
                                    </div>
                                    <div className="cont-mateG">
                                        <div className="BtnGestionMateriales">
                                            <h3 className="title1">Materiales Generales</h3>
                                            {user.rol === "admin" ? <Btn1
                                            cls={"btn btn-primary btnE"}
                                            text={<i class="fa-solid fa-pencil"></i>}
                                            url={'/MaterialGeneral'}
                                        /> : null}
                                        </div>
                                        <hr/>
                                        <div className="mateG row">
                                            {MaterialesX.length > 0 ? (
                                                MaterialesX.map((mate) =>(
                                                    <div className="card-mateG col-md-3" key={mate._id}>
                                                        <h3>{mate.nombre}</h3>
                                                        <center>
                                                            <img src={ValImg(mate.tipo)} className="mate-img" alt="img-mate"/>
                                                        </center>
                                                        <div className="card-body">
                                                            <p>Marca: {mate.marca}</p>
                                                            <p>Medida: {mate.medida}</p>
                                                            <p>Precio: C$ {mate.precio}</p>
                                                            <div className="grupo_btn1">
                                                                <Btn2
                                                                    cls={"btnMate3"}
                                                                    text={"Ver"}
                                                                    func={() => verDetalle(mate)}
                                                                    tp={"button"}
                                                                />
                                                                <Btn2
                                                                    cls={"btnMate3"}
                                                                    text={"Usar"}
                                                                    func={() => verDetalle(mate)}
                                                                    tp={"button"}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ): (<div>
                                                <h3>No hay Materiales Base</h3>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                            )
                        }else if(misMate){
                            return(
                                <div className={verF ? "cont-addMB" : "cont-addMB1"}>
                                    <div className="BtnGestionMateriales">
                                        <h3 className="title1">Materiales Base</h3>
                                    </div>
                                    <hr/>
                                    <div className="cont-mate-base">
                                        <div className="card-mate2" >
                                            <h3>Nuevo Material</h3>
                                            <Btn2
                                                tp={"button"}
                                                cls={"btnMate4"}
                                                text={<i className="fa-solid fa-folder-plus"></i>}
                                                func={() => verFormulario(0)}
                                            />
                                        </div>
                                        {MisMaterialesY.length > 0 ? (
                                            MisMaterialesY.map((mate) =>(
                                                <div className="card-mate" key={mate._id}>
                                                    <h3>{mate.nombre}</h3>
                                                    <center>
                                                    <img src={ValImg(mate.tipo)} className="mate-img" alt="img-mate"/>
                                                    </center>
                                                    <div className="card-body">
                                                        <p>Tipo: {mate.tipo}</p>
                                                        <p>Precio: C$ {mate.precio}</p>
                                                        <div className="grupo_btn1">
                                                            <Btn2
                                                                func={() => verDetalle(mate)}
                                                                tp={"button"}
                                                                cls={"btnMate3"}
                                                                text={"Ver"}
                                                            />
                                                            <Btn2
                                                                func={() => verDetalle(mate)}
                                                                tp={"button"}
                                                                cls={"btnMate3"}
                                                                text={"Usar"}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ): (<div>
                                            <h3>No hay Materiales Base</h3>
                                        </div>)}
                                    </div>
                                    <div className="BtnGestionMateriales">
                                        <h3 className="title1">Materiales General</h3>
                                    </div>
                                    <hr/>
                                    <div className="mateG row">
                                        <div className="card-mateG col-md-3" >
                                            <h3>Nuevo Material</h3>
                                            <Btn2
                                                tp={"button"}
                                                cls={"btnMate4"}
                                                text={<i className="fa-solid fa-folder-plus"></i>}
                                                func={() => verFormulario(1)}
                                            />
                                        </div>
                                        {MisMaterialesX.length > 0 ? (
                                            MisMaterialesX.map((mate) =>(
                                                <div className="card-mateG col-md-3" key={mate._id}>
                                                        <h3>{mate.nombre}</h3>
                                                        <center>
                                                            <img src={ValImg(mate.tipo)} className="mate-img" alt="img-mate"/>
                                                        </center>
                                                        <div className="card-body">
                                                            <p>Marca: {mate.marca}</p>
                                                            <p>Medida: {mate.medida}</p>
                                                            <p>Precio: C$ {mate.precio}</p>
                                                            <div className="grupo_btn1">
                                                                <Btn2
                                                                    cls={"btnMate3"}
                                                                    text={"Ver"}
                                                                    func={() => verDetalle(mate)}
                                                                    tp={"button"}
                                                                />
                                                                <Btn2
                                                                    cls={"btnMate3"}
                                                                    text={"Usar"}
                                                                    func={() => verDetalle(mate)}
                                                                    tp={"button"}
                                                                />
                                                            </div>
                                                        </div>
                                                </div>
                                            ))
                                        ):(<div>
                                                <h3>No hay Materiales Base</h3>
                                            </div>)}
                                    </div>
                                </div>
                            )
                        }else{
                            return(
                                <div>
                                    <div className="BtnGestionMateriales">
                                        <h3 className="title1">Materiales Base</h3>
                                        {user.rol === "admin" ? <Btn1
                                            cls={"btn btn-primary btnE"}
                                            text={<i class="fa-solid fa-pencil"></i>}
                                            url={'/MaterialBase'}
                                        /> : null}
                                    </div>
                                    <hr/>
                                    <div className="cont-mate-base">
                                        {MaterialesY.length > 0 ? (
                                            MaterialesY.map((mate) =>(
                                                <div className="card-mate" key={mate._id}>
                                                    <h3>{mate.nombre}</h3>
                                                    <center>
                                                    <img src={ValImg(mate.tipo)} className="mate-img" alt="img-mate"/>
                                                    </center>
                                                    <div className="card-body">
                                                        <p>Tipo: {mate.tipo}</p>
                                                        <p>Precio: C$ {mate.precio}</p>
                                                        <div className="grupo_btn1">
                                                            <Btn2
                                                                func={() => verDetalle(mate)}
                                                                tp={"button"}
                                                                cls={"btnMate3"}
                                                                text={"Ver"}
                                                            />
                                                            <Btn2
                                                                func={() => verDetalle(mate)}
                                                                tp={"button"}
                                                                cls={"btnMate3"}
                                                                text={"Usar"}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ): (<div>
                                            <h3>No hay Materiales Base</h3>
                                        </div>)}
                                    </div>
                                    <div className="cont-mateG">
                                        <div className="BtnGestionMateriales">
                                            <h3 className="title1">Materiales Generales</h3>
                                            {user.rol === "admin" ? <Btn1
                                            cls={"btn btn-primary btnE"}
                                            text={<i class="fa-solid fa-pencil"></i>}
                                            url={'/MaterialGeneral'}
                                        /> : null}
                                        </div>
                                        <hr/>
                                        <div className="mateG row">
                                            {MaterialesX.length > 0 ? (
                                                MaterialesX.map((mate) =>(
                                                    <div className="card-mateG col-md-3" key={mate._id}>
                                                        <h3>{mate.nombre}</h3>
                                                        <center>
                                                            <img src={ValImg(mate.tipo)} className="mate-img" alt="img-mate"/>
                                                        </center>
                                                        <div className="card-body">
                                                            <p>Marca: {mate.marca}</p>
                                                            <p>Medida: {mate.medida}</p>
                                                            <p>Precio: C$ {mate.precio}</p>
                                                            <div className="grupo_btn1">
                                                                <Btn2
                                                                    cls={"btnMate3"}
                                                                    text={"Ver"}
                                                                    func={() => verDetalle(mate)}
                                                                    tp={"button"}
                                                                />
                                                                <Btn2
                                                                    cls={"btnMate3"}
                                                                    text={"Usar"}
                                                                    func={() => verDetalle(mate)}
                                                                    tp={"button"}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ): (<div>
                                                <h3>No hay Materiales Base</h3>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })()}
                </div>
                {ver ? 
                <div className="cont-ver">
                    <Btn2
                        cls={"btn btn1 btn-primary"}
                        text={<i className="fa-solid fa-circle-xmark"></i>}
                        func={cerrar}
                    />
                    <div className="mater">
                        <h2>{mate.nombre}</h2>
                        {(() =>{
                            if (mate.marca === undefined) {
                                return <div className="body-mate">
                                    <div className="cont-mate1 row">
                                        <div className="col-md-4 cont-img-de">
                                            <center>
                                                <img src={ValImg(mate.tipo)} alt="material" className="img-detalle"/>
                                            </center>
                                        </div>
                                        <div className="col-md-8">
                                            <p>{mate.description}</p>
                                        </div>
                                    </div>
                                    <table className="table cont-tb table-bordered">
                                        <thead className="table-head">
                                            <tr>
                                                <th>Tipo</th>
                                                <th>Alto</th>
                                                <th>Ancho</th>
                                                <th>Largo</th>
                                                <th>Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-body">
                                            <tr>
                                                <td>{mate.tipo}</td>
                                                <td>{mate.y}</td>
                                                <td>{mate.x}</td>
                                                <td>{mate.z}</td>
                                                <td>C$ {mate.precio}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            } else {
                                return <div className="body-mate">
                                    <div className="cont-mate1 row">
                                        <div className="col-md-4 cont-img-de">
                                            <center>
                                                <img src={ValImg(mate.tipo)} alt="material" className="img-detalle"/>
                                            </center>
                                        </div>
                                        <div className="col-md-8">
                                            <p>{mate.description}</p>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                    <table className="table cont-tb table-bordered">
                                        <thead className="table-head">
                                            <tr>
                                                <th>Tipo</th>
                                                <th>Marca</th>
                                                <th>Medida</th>
                                                <th>Cantidad</th>
                                                <th>Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-body">
                                            <tr>
                                                <td>{mate.tipo}</td>
                                                <td>{mate.marca}</td>
                                                <td>{mate.medida}</td>
                                                <td>{mate.cantidad}</td>
                                                <td>C$ {mate.precio}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            }
                        })()}
                    </div>
                </div>
            :null}
            {addMB ? <div>
                <div className="cont-btn2">
                    <Btn2
                            cls={"btnMate5"}
                            text={"Cancelar"}
                            func={() => cancelarFormulario(0)}
                    />
                </div>
                <AddMateBase/>
            </div> : null}
            {addMG ? <div>
                <div className="cont-btn2">
                    <Btn2
                            cls={"btnMate5"}
                            text={"Cancelar"}
                            func={() => cancelarFormulario(1)}
                    />
                </div>
                <AddMateGeneral/>
            </div> : null}
            </div>
        );
    }
}

export default Materials;