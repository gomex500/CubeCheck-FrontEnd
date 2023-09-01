import React from "react";
import Btn1 from "../components/Btn1";
import BtnChat from "../components/BtnChat";
import '../css/home.css'
import logo from '../img/logo.png'

const Home = () =>{
    return(
        <div className="seccion">
            <div className="jumbo animate__animated animate__fadeIn">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-7 col-lg-8 cont">
                        <p>"Optimiza tu proceso de planificación y presupuesto en construcción con <b>CubeCheck</b>. Obtén presupuestos detallados y precisos en minutos, sin errores y estimaciones aproximadas. Visualiza tu proyecto en 3D y genera presupuestos profesionales en PDF. Ahorra tiempo y esfuerzo, toma decisiones informadas y destaca en tus proyectos de construcción con <b>CubeCheck</b>, la herramienta imprescindible para el éxito."</p>
                        <p className="eslogan">"CubeCheck: La clave para construir de manera inteligente y eficiente."</p>
                    </div>
                    <div className="col-12 col-sm-12 col-md-5 col-lg-4 cont-2">
                        <img src={logo} alt="logo"/>
                        <Btn1
                            text={"Iniciar ahora"}
                            cls={"btn"}
                            url={"/"}
                        />
                    </div>
                </div>
            </div>
            <BtnChat
                text={<i class="fa-solid fa-comments"></i>}
                cls={"btnChat"}
                func={console.log('hola')}
            />
        </div>
    );
}

export default Home;