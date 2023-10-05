import React, {useEffect, useState} from "react";
import Carga from './partials/Carga';
import '../css/Metrics.css'
import axios from "axios";
import GraficoLine from "./partials/GraficoLine";
import GraficoBar from "./partials/GraficoBar";
import GraficoPaste from "./partials/GraficoPaste";


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
                <h1>Metrics</h1>
                <div className="row">
                    <div className="col-md-4 grafico">
                        <GraficoLine/>
                    </div>
                    <div className="col-md-4 grafico">
                        <GraficoBar/>
                    </div>
                    <div className="col-md-4 grafico">
                        <GraficoPaste/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Metrics;