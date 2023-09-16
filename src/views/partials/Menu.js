import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import Navbar from "./Navbar";
import Home from '../Home';
import Login from "../Login";
import Footer from "./Footer";
import Sigup from "../Sigup";
import BtnChat from "../../components/BtnChat";

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
                <Route path="/login" element={validarSesion() ?  <Navigate to='/'/> : <Login/>}/>
                <Route path="/sigup" element={validarSesion() ?  <Navigate to='/'/> : <Sigup/>}/>
            </Routes>
            <BtnChat/>
            <Footer/>
        </div>
    );
}

export default Menu;