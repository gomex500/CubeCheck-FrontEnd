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
                                <a className="nav-link" href="/beneficios"><i class="fas fa-user"></i> User</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/proceso"><i class="bi bi-gear-fill"></i> Proceso</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Juego"><i class="bi bi-controller"></i> Juego</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/ayuda"> <i class="bi bi-info-circle-fill"></i> Ayuda</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#footer"><i class="bi bi-telephone-fill"></i> Contactos</a>
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
                        <span className="nav-item">Home</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fas fa-user"></i>
                        <span className="nav-item">User</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fas fa-wallet"></i>
                        <span className="nav-item">Wallet</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fas fa-chart-bar"></i>
                        <span className="nav-item">Analytics</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fas fa-tasks"></i>
                        <span className="nav-item">Tasks</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fas fa-cog"></i>
                        <span className="nav-item">Settings</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <i className="fas fa-question-circle"></i>
                        <span className="nav-item">Help</span>
                    </a>
                </li>
                <li>
                    <a href="/" className="logout">
                        <i className="fas fa-sign-out-alt"></i>
                        <span className="nav-item">Log out</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    );
}

export default Navbar;