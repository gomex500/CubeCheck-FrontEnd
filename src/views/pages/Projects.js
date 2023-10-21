import React from "react";
import { Esquema } from "../../components";
import '../../css/Projects.css';


const Projects = () =>{

    const contruccion = {
        "embaldosado": [10,1,10]
    }

    return(
        <div className="seccion">
            <div className="cont-Projects">
                <h1>Proyectos</h1>
                <div className="esquema">
                    <Esquema 
                        contruccion={contruccion}
                    />
                </div>
                <div className="">

                </div>
            </div>
        </div>
    );
}

export default Projects;