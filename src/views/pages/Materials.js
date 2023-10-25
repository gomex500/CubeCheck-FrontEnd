import React, {useEffect, useState} from "react";
import '../../css/materials.css'
import {Piedra, Cemento, Bloque, Ladrillo, Arena, Piedrin, Hierro} from '../../img/materials'

import { useDispatch, useSelector } from "react-redux";
import { Btn2, Btn1 } from "../../components";
import { getMaterialX } from "../../store/slices/MaterialesSlices/materialesXThunks";
import { getMaterialY } from "../../store/slices/MaterialesSlices/materialesYThunks";
import { getUser } from "../../store/slices/UserSlices/userThunks";
import { Carga } from "../partials/Loading";

const Materials = () =>{

    const dispatch = useDispatch();
    const { MaterialesX } = useSelector( state => state.materialesx);
    const { MaterialesY, isLoading } = useSelector( state => state.materialesy);
    const { user } = useSelector( state => state.user );

    const [ver, setVer] = useState(false);
    const [mate, setMate] = useState(null);

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

    useEffect(() => {
        dispatch( getMaterialX() );
        dispatch( getMaterialY() );
        dispatch( getUser() );
    }, [])

    if (isLoading) {
        return (<Carga/>)
    } else {
        return(
            <div className="seccion">
                <div className={ver ? "com-mateV" : "cont-Mate"}>
                    <h2>Materiales de Contruccion</h2>
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
                                        <p>Precio: {mate.precio} C$</p>
                                        <Btn2
                                            func={() => verDetalle(mate)}
                                            tp={"button"}
                                            cls={"btn btn1 btn-primary"}
                                            text={"Ver detalles"}
                                        />
                                    </div>
                                </div>
                            ))
                        ): (<div>
                            <h3>No hay Materiales Base</h3>
                        </div>)}
                    </div>
                    <div className="cont-mateG">
                        <div className="BtnGestionMateriales">
                            <h3 className="title1">Materiales</h3>
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
                                            <p>Precio: {mate.precio} C$</p>
                                            <Btn2
                                                cls={"btn btn1 btn-primary"}
                                                text={"Ver detalles"}
                                                func={() => verDetalle(mate)}
                                                tp={"button"}
                                            />
                                        </div>
                                    </div>
                                ))
                            ): (<div>
                                <h3>No hay Materiales Base</h3>
                            </div>)}
                        </div>
                    </div>
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
                                                <td>{mate.precio} C$</td>
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
                                                <td>{mate.precio} C$</td>   
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
            </div>
        );
    }
}

export default Materials;