import React from "react";
import Esquema from "../components/Esquema"
import '../css/Projects.css';


const Projects = () =>{
    return(
        <div className="seccion">
            <div className="cont-Projects">
                <h1>Proyectos</h1>
                <div className="esquema">
                    <Esquema/>
                </div>
            </div>
        </div>
    );
}

export default Projects;