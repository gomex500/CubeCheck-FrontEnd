import React from "react";
import '../css/home.css'
import logo from '../img/logo.png'

const Home = () =>{
    return(
        <div className="seccion">
            <div className="jumbo animate__animated animate__fadeIn">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-8 cont">
                        <p>"Optimiza tu proceso de planificación y presupuesto en construcción con <b>CubeCheck</b>. Obtén presupuestos detallados y precisos en minutos, sin errores y estimaciones aproximadas. Visualiza tu proyecto en 3D y genera presupuestos profesionales en PDF. Ahorra tiempo y esfuerzo, toma decisiones informadas y destaca en tus proyectos de construcción con <b>CubeCheck</b>, la herramienta imprescindible para el éxito."</p>
                        <p className="eslogan">"CubeCheck: La clave para construir de manera inteligente y eficiente."</p>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 cont-2">
                        <img src={logo} alt="logo"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;