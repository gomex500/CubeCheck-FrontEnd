import React from "react";
import Btn1 from "../components/Btn1";
import '../css/tools.css'

const Tools = () =>{


    return(
        <div className="seccion">
            <div className="cont-tools row">
                <div className="card-pared animate__animated animate__flipInY col-md-3">
                    <p className="cardT">Calcular Materiales de una Pared</p>
                    <Btn1
                        text={"Go"}
                        cls={"btn1"}
                        url={'/wall'}
                    />
                </div>
                <div className="card-pilar animate__animated animate__flipInY col-md-3">
                    <p className="cardT">Calcular Materiales de un Pilar </p>
                    <Btn1
                        text={"Go"}
                        cls={"btn1"}
                        url={'/pillar'}
                    />
                </div>
                <div className="card-embaldosado animate__animated animate__flipInY col-md-3">
                    <p className="cardT">Calcular Materiales de un Embaldosado </p>
                    <Btn1
                        text={"Go"}
                        cls={"btn1"}
                        url={'/tiling'}
                    />
                </div>
                <div className="card-losa animate__animated animate__flipInY col-md-3">
                    <p className="cardT">Calcular Materiales de una Losa </p>
                    <Btn1
                        text={"Go"}
                        cls={"btn1"}
                        url={'/slab'}
                    />
                </div>
            </div>
        </div>
    );
}

export default Tools;