import React, {useEffect} from "react";
import { Esquema } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import '../../css/Projects.css';

import {getProjects} from '../../store/slices/ProyectSlices/proyectThunks'

const Projects = () =>{

    const dispatch = useDispatch();
    const { proyectos } = useSelector( state => state.proyectos);

    const contruccion = {
        "embaldosado": [10,1,10]
    }

    useEffect(() => {
      dispatch(getProjects())
    }, [])
    

    return(
        <div className="seccion">
            <div className="cont-Projects">
                <h1>Proyectos</h1>
                <div className="cont-proyectos">
                    {}
                </div>
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