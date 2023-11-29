import React from "react";
import {EsquemaHome} from '../../components';
import {Jorge, Freddy, Stheven} from '../../img/fotos'
import '../../css/info.css'

const Info = () =>{
    return(
        <div className="seccion">
            <div className="container texto">
                <div className="row">
                    <div className="cardTI col-md-12">
                        <h3><i class="fa-solid fa-triangle-exclamation"></i> Problematica Basada</h3>
                        <p>En Nicaragua, en el ámbito de la construcción consta con diferentes adversidades y desafíos, pero
                        una de la cuales es una falla común y también una de las cuales nadie habla, es del desperdicio de
                        materiales de construcción al momento de concluir una obra, dicho problema pasa casi desapercibido
                        para la población nicaragüense aun que en general este problema atrae otro problema común que es
                        el aumento de costo de la obra, dichos problema son ocasionados por distintas causas, donde estas
                        tienen efectos negativos a largo y acorto plazo para la población.</p>
                    </div>
                    <div className="cardTI medida1 col-md-6">
                        <h3><i class="fa-solid fa-chart-line"></i> Misión</h3>
                        <p>Cubicheck tiene el propósito de facilitar soluciones tecnológicas con enfoque en la construcción de proyectos, disminuyendo errores en su planificación, formulando un presupuesto rapido, mejorando el déficit habitacional del pais, perdidas economicas y materiales en obras de construcción.</p>
                    </div>
                    <div className="cardTI medida1 col-md-6">
                        <h3><i class="fa-solid fa-eye"></i> Visión</h3>
                        <p>Posicionarnos como empresa líder de soluciones tecnológicas con enfoque en la construcción de urbanizadoras del pais, empresas del sector construcción ademas de profesionales dentro de la industria.</p>
                    </div>
                    <div className="cardTI medida2 col-md-4">
                        <center>
                        <img className="foto" src={Freddy}/>
                        <h3>Freddy Gomez</h3>
                        <hr/>
                        <h4>Datos Generales</h4>
                        </center>
                        <ul>
                            <li>
                                <b><i class="fa-solid fa-image-portrait"></i> Edad:</b> 25
                            </li>
                            <li>
                                <b><i class="fa-solid fa-suitcase-rolling"></i> Rol:</b> Desarrollador
                            </li>
                        </ul>
                        <div className="enlaces">
                            <a href="#">
                                <i class="fa-brands fa-github"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-linkedin"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-facebook"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-youtube"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-square-instagram"></i>
                                </a>
                        </div>
                    </div>
                    <div className="cardTI medida2 col-md-4">
                        <center>
                        <img className="foto" src={Jorge}/>
                        <h3>Jorge Narvaez</h3>
                        <hr/>
                        <h4>Datos Generales</h4>
                        </center>
                        <ul>
                            <li>
                                <b><i class="fa-solid fa-image-portrait"></i> Edad:</b> 23
                            </li>
                            <li>
                                <b><i class="fa-solid fa-suitcase-rolling"></i> Rol:</b> Desarrollador
                            </li>
                        </ul>
                        <div className="enlaces">
                            <a href="#">
                                <i class="fa-brands fa-github"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-linkedin"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-facebook"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-youtube"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-square-instagram"></i>
                                </a>
                        </div>
                    </div>
                    <div className="cardTI medida2 col-md-4">
                        <center>
                        <img className="foto" src={Stheven}/>
                        <h3>Stheven Torrez</h3>
                        <hr/>
                        <h4>Datos Generales</h4>
                        </center>
                        <ul>
                            <li>
                                <b><i class="fa-solid fa-image-portrait"></i> Edad:</b> 23
                            </li>
                            <li>
                                <b><i class="fa-solid fa-suitcase-rolling"></i> Rol:</b> Desarrollador
                            </li>
                        </ul>
                        <div className="enlaces">
                            <a href="#">
                                <i class="fa-brands fa-github"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-linkedin"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-facebook"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-youtube"></i>
                                </a>
                            <a href="#">
                                <i class="fa-brands fa-square-instagram"></i>
                                </a>
                        </div>
                    </div>
                </div>
            </div>
            <EsquemaHome/>
        </div>
    );
}

export default Info;