import React, {useEffect} from "react";

import { useDispatch } from "react-redux";
import { getMaterialX } from "../../store/slices/MaterialesSlices/materialesXThunks";
import { getMaterialY } from "../../store/slices/MaterialesSlices/materialesYThunks";

const Materials = () =>{

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( getMaterialX() );
        dispatch( getMaterialY() );
    }, [])

    return(
        <div className="seccion">
            <div>
                
            </div>
        </div>
    );
}

export default Materials;