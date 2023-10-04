import React from "react";
import Btn1 from "../../components/Btn1";

const Losa = () =>{
    return(
        <div className="seccion">
            <div className="btnReturn">
                <Btn1
                    text={<i class="fa-solid fa-arrow-rotate-left"></i>}
                    cls={'btn1'}
                    url={'/tools'}
                />
            </div>
            <div className="cont-losa">
                <h1>Losa</h1>
            </div>
        </div>
    );
}

export default Losa;