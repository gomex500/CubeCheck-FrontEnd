import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Btn2 } from "../../../components";
import { getMaterialX } from "../../../store/slices/MaterialesSlices/materialesXThunks";

const MaterialGeneral = () =>{

    const dispatch = useDispatch();
    const { MaterialesX } = useSelector( state => state.materialesx);

    return(
        <div className="seccion">
            <div>
            <div className="cont-materialgeneral">

            </div>
            </div>
        </div>
    );
}

export default MaterialGeneral;