import React, {useState} from "react";
import logo from '../../img/logo.png'
import '../../css/navbar.css';

const Navbar = () =>{

    const [nav, setNav] = useState(true);
    const handleNavClick = () => {
        setNav(!nav);
      };
    return(
        <div>
            <nav className="navbaraux">
                <button onClick={handleNavClick} className="logo">
                    <img src={logo} alt='logo'/>
                    <span className="nav-item">CubeCheck</span>
                </button>
            </nav>
            <nav className={nav ? "navbarr animate__animated animate__fadeInLeftBig" : "navbarr1"}>
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