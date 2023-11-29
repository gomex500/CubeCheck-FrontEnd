import React, {useEffect, useState} from "react";
import { Carga } from "../partials/Loading";
import '../../css/Metrics.css'
import axios from "axios";
import { GraficoBar, GraficoPaste } from "../partials/Metrics"


const Metrics = () =>{

    const [cargaM, setCargaM] = useState(true);

    const obtenerRol = () =>{
        setCargaM(true);
        const datos = localStorage.getItem('data');
        if (datos) {
            const data = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
            }
            axios.get(`https://cubecheck.onrender.com/user/${data.id}`,config)
            .then((response) =>{
                if (response.data.rol === "admin") {
                    setCargaM(false);
                }else{
                    window.location = '/';
                }
            })
            .catch((error) =>{
                console.log(error);
                setCargaM(false);
                window.location = '/';
            })
        } else {
            setCargaM(false);
            window.location = '/';
        }
    }

    useEffect(() =>{
        obtenerRol();
    },[]);



    if (cargaM) {
        return <Carga/>
    } else {
        return(
            <div className="seccion">
                <h1 className="t">Dashboard</h1>
                <div className="contM">
                    <div className="row">
                        <div className="col-md-5 cong">
                            <p>Cantidad de Usuarios por Roles</p>
                            <div className="grafico1">
                                <GraficoPaste/>
                            </div>
                        </div>
                        <div className="col-md-7 cong">
                            <p>Herramientas mas Utilizadas</p>
                            <div className="grafico1">
                                <GraficoBar/>
                            </div>
                        </div>
                        {/* <div className="col-md-6 cong">
                            <p>Herramientas mas Utilizadas</p>
                            <div className="grafico2">
                                <GraficoLine/>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Metrics;