import React, {useState, useEffect} from "react";
import logo from '../../img/logo.png'
import '../../css/navbar.css';
import axios from "axios";
// import axios from "axios";

const Navbar = () =>{

    const [btnN, setBtnN] = useState(true);
    const [user, setUser] = useState({});
    const [session, setSession] = useState()

    const btnNav = () =>{
        setBtnN(!btnN)
    }

    const sigup = () =>{
        localStorage.removeItem('data');
    }

    useEffect(() =>{
        const datos = localStorage.getItem('data');
        if (datos) {
            const data = JSON.parse(datos);
            localStorage.removeItem('session');
            setSession(data.session);
            const config = {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
            }
            axios.get(`https://cubecheck.onrender.com/user/${data.id}`,config)
            .then((response) =>{
                setUser(response.data);
            })
            .catch((error) =>{
                console.log(error);
            })
        } else {
            setUser({
                'nombre':'Iniciar',
                'apellido':'Sesion'
            });
            localStorage.removeItem('data');
            localStorage.setItem('session',false);
            setSession(false);
        }
    }, []);

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
                            {session && (<li className="nav-item">
                                        <a className="nav-link" href="/Juego"><i class="fa-solid fa-briefcase"></i> Proyecto</a>
                                    </li>)
                            }
                            {(() => {
                                if (user.rol === "admin") {
                                    return (
                                        <>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/"> <i class="fa-solid fa-shapes"></i> Materiales</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/"> <i class="fa-solid fa-users"></i> Usuarios</a>
                                            </li>
                                        </>
                                    );
                                } else {
                                    return (
                                        <li className="nav-item">
                                            <a className="nav-link" href="/ayuda"> <i class="fa-solid fa-shapes"></i> Materiales</a>
                                        </li>
                                    );
                                }
                            })()}
                            <li className="nav-item">
                                <a className="nav-link" href={session ? "/" : "/login"} onClick={sigup}>
                                    <i class="fa-solid fa-user"></i>
                                    {user.nombre+' '+user.apellido}
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
                { session &&
                        (<li>
                            <a href="/">
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
                                    <a href="/">
                                        <i className="fas fa-users"></i>
                                        <span className="nav-item">Usuarios</span>
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
                    <a href={session ? "/" : "/login"} onClick={sigup} className="logout">
                        <i className="fas fa-user"></i>
                        <span className="nav-item">{user.nombre+' '+user.apellido}</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    );
}

export default Navbar;