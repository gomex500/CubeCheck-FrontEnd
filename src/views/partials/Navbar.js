import React, {useState, useEffect} from "react";
import logo from '../../img/logo.png'
import '../../css/navbar.css';
import Carga from "./Loading/Carga";


import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/slices/UserSlices/userThunks";

const Navbar = () =>{

    const dispatch = useDispatch();
    const { user , isLoading, isSession } = useSelector( state => state.user );

    const [btnN, setBtnN] = useState(true);

    const btnNav = () => setBtnN(!btnN);

    useEffect(() =>{
        dispatch( getUser() );
    }, []);

    if (isLoading) {
        return(
            <Carga/>
        );
    } else {
        return(
            <div>
                <nav className="navbar navbar-expand-lg nav1">
                    <div className="container-fluid">
                        <a className= "logo navbar-brand" href="/" >
                            <img
                                src={logo}
                                alt="logo"
                            />
                            <span className="nav-item">CubeCheck</span>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fa-solid fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/"><i className="fas fa-home"></i> Inico</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/Calculation"><i className="fas fa-calculator"></i> Calculadora</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/tools"><i className="fa-solid fa-toolbox"></i> Herramietas</a>
                                </li>
                                {isSession && (<li className="nav-item">
                                            <a className="nav-link" href="/projects"><i className="fa-solid fa-briefcase"></i> Proyecto</a>
                                        </li>)
                                }
                                {(() => {
                                    if (user.rol === "admin") {
                                        return (
                                            <>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/"> <i className="fa-solid fa-shapes"></i> Materiales</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/users"> <i className="fa-solid fa-users"></i> Usuarios</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/metrics"> <i className="fa-solid fa-chart-pie"></i> Metricas</a>
                                                </li>
                                            </>
                                        );
                                    } else {
                                        return (
                                            <li className="nav-item">
                                                <a className="nav-link" href="/ayuda"> <i className="fa-solid fa-shapes"></i> Materiales</a>
                                            </li>
                                        );
                                    }
                                })()}
                                <li className="nav-item">
                                    <a className="nav-link" href="/info"> <i className="fa-solid fa-circle-info"></i> Acerca de</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={isSession ? "/profile" : "/login"}>
                                        <i className="fa-solid fa-user"></i>
                                        {isSession ? user.nombre+' '+user.apellido : "Iniciar Sesion"}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav className="navbarr" style={btnN ? {width: "70px"} : {width: "240px"}}>
                <ul>
                    <li>
                        <button className="logo1" onClick={btnNav}>
                            <img src={logo} alt='logo'/>
                            <span className="nav-item">CubeCheck</span>
                        </button>
                    </li>
                    <li>
                        <a href="/">
                            <i className="fas fa-home"></i>
                            <span className="nav-item">Inicio</span>
                        </a>
                    </li>
                    <li>
                        <a href="/Calculation">
                            <i className="fas fa-calculator"></i>
                            <span className="nav-item">Calculadora</span>
                        </a>
                    </li>
                    <li>
                        <a href="/tools">
                            <i className="fas fa-toolbox"></i>
                            <span className="nav-item">Herramientas</span>
                        </a>
                    </li>
                    { isSession &&
                            (<li>
                                <a href="/projects">
                                    <i className="fas fa-briefcase"></i>
                                    <span className="nav-item">Proyectos</span>
                                </a>
                            </li>)
                    }
                    {(() => {
                        if (user.rol === "admin") {
                            return (
                                <>
                                    <li>
                                        <a href="/">
                                            <i className="fas fa-shapes"></i>
                                            <span className="nav-item">Materiales</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/users">
                                            <i className="fas fa-users"></i>
                                            <span className="nav-item">Usuarios</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/metrics">
                                            <i className="fas fa-chart-pie"></i>
                                            <span className="nav-item">Metricas</span>
                                        </a>
                                    </li>
                                </>
                            );
                        } else {
                            return (
                                <li>
                                    <a href="/">
                                        <i className="fas fa-shapes"></i>
                                        <span className="nav-item">Materiales</span>
                                    </a>
                                </li>
                            );
                        }
                    })()}
                    <li>
                        <a href="/">
                            <i className="fas fa-circle-info"></i>
                            <span className="nav-item">Acerca de</span>
                        </a>
                    </li>
                    <li>
                        <a href={isSession ? "/profile" : "/login"} className="logout">
                            <i className="fas fa-user"></i>
                            <span className="nav-item">{isSession ? user.nombre+' '+user.apellido : "Iniciar Sesion"}</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        );
    }
}

export default Navbar;