import React from "react";
import {Route, Routes} from 'react-router-dom';
import Navbar from "./Navbar";
import Home from '../Home';
import Login from "../Login";
import Footer from "./Footer";

const Menu = () =>{
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default Menu;