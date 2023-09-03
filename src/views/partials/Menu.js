import React from "react";
import {Route, Routes} from 'react-router-dom';
import Navbar from "./Navbar";
import Home from '../Home';
import Login from "../Login";

const Menu = () =>{
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default Menu;