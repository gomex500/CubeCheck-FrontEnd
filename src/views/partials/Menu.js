import React from "react";
import {Route, Routes} from 'react-router-dom';
import Navbar from "./Navbar";
import Home from '../Home';
import Login from "../Login";
import Footer from "./Footer";
import Sigup from "../Sigup";
import BtnChat from "../../components/BtnChat";

const Menu = () =>{
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/sigup" element={<Sigup/>}/>
            </Routes>
            <BtnChat/>
            <Footer/>
        </div>
    );
}

export default Menu;