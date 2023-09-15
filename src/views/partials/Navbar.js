import React, {useState} from "react";
import logo from '../../img/logo.png'
import '../../css/navbar.css';
// import axios from "axios";

const Navbar = () =>{

    // const datos = localStorage.getItem('data');

    const [btnN, setBtnN] = useState(true);
    // const [data, setData] = useState(JSON.parse(datos));
    // const [user, setUser] = useState({});

    const btnNav = () =>{
        setBtnN(!btnN)
    }

    // const headers = {
    //     Authorization: `Bearer ${data.token}`,
    // }

    // const cargarDatos = () =>{
    //     axios.get(`http://127.0.0.1:5000/user/${data.id}`,{
    //         headers: headers
    //     })
    //     .then((response) =>{
    //         console.log(response.data);
    //         setUser(response.data);
    //     })
    //     .catch((error) =>{
    //         console.log(error);
    //     })
    // }

    // useEffect(() =>{
    //     if (data !== {}) {
    //         cargarDatos();
    //     }

    // },[])

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
                                <a className="nav-link" href="/login"><i class="fa-solid fa-user"></i> inicar Secion</a>
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
                    <a href="/login" className="logout">
                        <i className="fas fa-user"></i>
                        {/* <span className="nav-item">{data.session ? user.nombre +''+ user.apellido : 'Iniciar Sesion'}</span> */}
                        <span className="nav-item">Iniciar Sesion</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    );
}

export default Navbar;