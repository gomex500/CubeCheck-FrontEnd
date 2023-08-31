import React from "react";
import logo from '../../img/logo.png'
import '../../css/navbar.css';

const Navbar = () =>{
    return(
        <div>
            <nav className="navbar navbar-expand-lg nav1">
                <div className="container-fluid">
                    <a className= "logo navbar-brand" href="/" >
                        <img src={logo} alt="logo"/>
                        <span className="nav-item">CubeCheck</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/"><i class="fas fa-home"></i> Inico</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/beneficios"><i class="fas fa-calculator"></i> Calculadora</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/proceso"><i class="fa-solid fa-toolbox"></i> Herramietas</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Juego"><i class="fa-solid fa-briefcase"></i> Proyecto</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/ayuda"> <i class="fa-solid fa-shapes"></i> Materiales</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#footer"><i class="fa-solid fa-user"></i> inicar Secion</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="navbarr">
            <ul>
                <li>
                    <a href="/" className="logo">
                        <img src={logo} alt='logo'/>
                        <span className="nav-item">CubeCheck</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fas fa-home"></i>
                        <span className="nav-item">Inicio</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fas fa-calculator"></i>
                        <span className="nav-item">Calculadora</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fas fa-toolbox"></i>
                        <span className="nav-item">Herramientas</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fas fa-briefcase"></i>
                        <span className="nav-item">Proyectos</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fas fa-shapes"></i>
                        <span className="nav-item">Materiales</span>
                    </a>
                </li>
                <li>
                    <a href="/" className="logout">
                        <i className="fas fa-user"></i>
                        <span className="nav-item">Inicar Secion</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    );
}

export default Navbar;