import React from "react";

const Input = ({tp, cls, val, fuc, ph, nm, dis, max, min}) =>{
    return(
        <input
            type={tp}
            className={cls}
            value={val}
            onChange={fuc}
            placeholder={ph}
            name={nm}
            disabled={dis}
            max={max}
            min={min}
        />
    );
}

export default Input;