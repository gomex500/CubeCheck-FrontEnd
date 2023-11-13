import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import Navbar from "./Navbar";
import {
    Home,
    Calculation,
    Tools,
    Projects,
    Users,
    Metrics,
    Login,
    Profile,
    Sigup,
    Materials,
    Info
} from '../pages';

import Footer from "./Footer";

import { BtnChat } from "../../components";

import {
    Embaldosado,
    Losa,
    Pilar,
    Pared
} from './Tools'


import { MaterialBase, MaterialGeneral } from './Materials'

import { useSelector } from "react-redux";

const Menu = () =>{

    const { user } = useSelector( state => state.user );

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
                <Route index element={<Home/>}/>
                <Route path="/calculation" element={validarSesion() ? <Calculation/> : <Navigate to='/login'/>}/>
                <Route path="/tools" element={validarSesion() ? <Tools/> : <Navigate to='/login'/>}/>
                <Route path="/wall" element={validarSesion() ? <Pared/> : <Navigate to='/login'/>}/>
                <Route path="/pillar" element={validarSesion() ? <Pilar/> : <Navigate to='/login'/>}/>
                <Route path="/slab" element={validarSesion() ? <Losa/> : <Navigate to='/login'/>}/>
                <Route path="/tiling" element={validarSesion() ? <Embaldosado/> : <Navigate to='/login'/>}/>
                <Route path="/login" element={validarSesion() ?  <Navigate to='/'/> : <Login/>}/>
                <Route path="/sigup" element={validarSesion() ?  <Navigate to='/'/> : <Sigup/>}/>
                <Route path="/profile" element={validarSesion() ?  <Profile/> : <Navigate to='/login'/>}/>
                <Route path="/materials" element={validarSesion() ?  <Materials/> : <Navigate to='/login'/>}/>
                <Route path="/info" element={<Info/>}/>

                {/* premium router */}
                {(() =>{
                    if (user.rol === "premium") {
                        return(
                            <Route path="/projects" element={validarSesion() ? <Projects/> : <Navigate to='/'/>}/>
                        );
                    }else if(user.rol === "admin"){
                        return(
                            <>
                                <Route path="/projects" element={validarSesion() ? <Projects/> : <Navigate to='/'/>}/>  
                                <Route path="/users" element={validarSesion() ?  <Users/> : <Navigate to='/'/>}/>
                                <Route path="/metrics" element={validarSesion() ?  <Metrics/> : <Navigate to='/'/>}/>
                                <Route path="/MaterialBase" element={validarSesion() ?  <MaterialBase/> : <Navigate to='/login'/>}/>
                                <Route path="/MaterialGeneral" element={validarSesion() ?  <MaterialGeneral/> : <Navigate to='/login'/>}/>
                            </>
                        );
                    }
                })()}
            </Routes>
            {validarSesion() ? <BtnChat/> : null}
            <Footer/>
        </div>
    );
}

export default Menu;