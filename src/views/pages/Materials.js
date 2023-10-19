import React, {useEffect} from "react";
import '../../css/materials.css'
import bloque from '../../img/bloque.png'
import piedra from '../../img/piedra.png'
import ladrillo from '../../img/ladrillo.png'

import { useDispatch, useSelector } from "react-redux";
import { Btn2 } from "../../components";
import { getMaterialX } from "../../store/slices/MaterialesSlices/materialesXThunks";
import { getMaterialY } from "../../store/slices/MaterialesSlices/materialesYThunks";

const Materials = () =>{

    const dispatch = useDispatch();
    const { MaterialesX } = useSelector( state => state.materialesx);
    const { MaterialesY } = useSelector( state => state.materialesy);

    const ValImg = (tipo) =>{
        if (tipo === "Piedra") {
            return piedra;
        } else if(tipo === "Bloque") {
            return bloque;
        }else{
            return ladrillo;
        }
    }


    useEffect(() => {
        dispatch( getMaterialX() );
        dispatch( getMaterialY() );
    }, [])

    return(
        <div className="seccion">
            <div className="cont-Mate">
                <h2>Materiales de Contruccion</h2>
                <h3>Materiales Base</h3>
                <div className="cont-mate-base">
                    {MaterialesY.length > 0 ? (
                        MaterialesY.map((mate) =>(
                            <div className="card-mate" key={mate._id}>
                                <h3>{mate.nombre}</h3>
                                <center>
                                <img src={ValImg(mate.tipo)} className="mate-img" alt="img-mate"/>
                                </center>
                                <p>Tipo: {mate.tipo}</p>
                                <p>Precio: {mate.precio} C$</p>
                                <Btn2
                                    cls={"btn btn-primary"}
                                    text={"Ver detalles"}
                                />
                            </div>
                        ))
                    ): (<div>
                        <h3>No hay Materiales Base</h3>
                    </div>)}
                </div>
                <div className="cont-mateG">
                    <h3>Materiales</h3>
                    <div className="mateG row">
                        {MaterialesX.length > 0 ? (
                            MaterialesX.map((mate) =>(
                                <div className="card-mateG col-md-4" key={mate._id}>
                                    <h3>{mate.nombre}</h3>
                                    <p>Marca: {mate.marca}</p>
                                    <p>Medida: {mate.medida}</p>
                                    <p>Precio: {mate.precio} C$</p>
                                    <Btn2
                                        cls={"btn btn-primary"}
                                        text={"Ver detalles"}
                                    />
                                </div>
                            ))
                        ): (<div>
                            <h3>No hay Materiales Base</h3>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Materials;