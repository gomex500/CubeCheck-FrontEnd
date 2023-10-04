import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import Navbar from "./Navbar";
import Home from '../Home';
import Login from "../Login";
import Footer from "./Footer";
import Sigup from "../Sigup";
import BtnChat from "../../components/BtnChat";
import Profile from "../Profile";
import Users from "../Users";
import Calculation from '../Calculation';
import Tools from "../Tools";
import Pared from "../partials/Pared";
import Pilar from "../partials/Pilar";
import Embaldosado from "../partials/Embaldosado";
import Losa from "../partials/Losa";


const Menu = () =>{

    const session = localStorage.getItem('session');

    const validarSesion = () =>{
        if (session) {
            return false;
        }
        return true;
    }

    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/calculation" element={validarSesion() ? <Calculation/> : <Navigate to='/login'/>}/>
                <Route path="/tools" element={validarSesion() ? <Tools/> : <Navigate to='/login'/>}/>
                <Route path="/wall" element={validarSesion() ? <Pared/> : <Navigate to='/login'/>}/>
                <Route path="/pillar" element={validarSesion() ? <Pilar/> : <Navigate to='/login'/>}/>
                <Route path="/slab" element={validarSesion() ? <Losa/> : <Navigate to='/login'/>}/>
                <Route path="/tiling" element={validarSesion() ? <Embaldosado/> : <Navigate to='/login'/>}/>
                <Route path="/login" element={validarSesion() ?  <Navigate to='/'/> : <Login/>}/>
                <Route path="/sigup" element={validarSesion() ?  <Navigate to='/'/> : <Sigup/>}/>
                <Route path="/profile" element={validarSesion() ?  <Profile/> : <Navigate to='/login'/>}/>
                <Route path="/users" element={validarSesion() ?  <Users/> : <Navigate to='/'/>}/>
            </Routes>
            {validarSesion() ? <BtnChat/> : null}
            <Footer/>
        </div>
    );
}

export default Menu;