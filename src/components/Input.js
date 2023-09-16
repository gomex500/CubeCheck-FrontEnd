import React from "react";

const Input = ({tp, cls, val, fuc, ph, nm, dis}) =>{
    return(
        <input
            type={tp}
            className={cls}
            value={val}
            onChange={fuc}
            placeholder={ph}
            name={nm}
            disabled={dis}
        />
    );
}

export default Input;