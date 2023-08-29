import React from "react";
import {Route, Routes} from 'react-router-dom';
import Navbar from "./Navbar";
import Home from '../Home';

const Menu = () =>{
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default Menu;