import React from "react";
import { Btn1, EsquemaHome } from "../../components";
import '../../css/home.css'
import logo from '../../img/logo.png';

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
                            cls={"btn btn1"}
                            url={"/login"}
                        />
                    </div>
                </div>
            </div>
            <div className="conatiner texto">
                <div className="row">
                <div className="cardH col-md-4">
                <h3><i class="fa-solid fa-cube"></i></h3>
                <p>La "cubicación" en la construcción se refiere al proceso de calcular o medir el volumen de un objeto tridimensional, como un sólido o una estructura. Este término se utiliza comúnmente en la industria de la construcción para determinar la cantidad de material necesario para llevar a cabo un proyecto.</p>
                </div>

                <div className="cardH col-md-4">
                    <h3><i class="fa-solid fa-trowel-bricks"></i></h3>
                <p>En el contexto de la construcción, la cubicación implica medir y calcular los volúmenes de los diferentes elementos estructurales, como cimientos, columnas, vigas, losas y otros componentes. Esto es esencial para estimar la cantidad de materiales de construcción necesarios, como concreto, acero, madera, etc.</p>
                </div>

                <div className="cardH col-md-4">
                    <h3><i class="fa-solid fa-trowel"></i></h3>
                <p>Para realizar la cubicación, se pueden utilizar diversas técnicas y herramientas, como planos arquitectónicos detallados, software de modelado tridimensional (BIM), y métodos de medición directa en el sitio de construcción. La precisión en la cubicación es fundamental para evitar desperdicios de materiales y para garantizar que se tenga la cantidad adecuada para completar el proyecto de construcción de manera eficiente.</p>
                </div>
                </div>
            </div> 
            <div className="lienzo2">
                <EsquemaHome className="esquema2"/>
            </div>
        </div>
    );
}

export default Home;