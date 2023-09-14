import React from "react";

const Input = ({tp, cls, val, fuc, ph, nm}) =>{
    return(
        <input
            type={tp}
            className={cls}
            value={val}
            onChange={fuc}
            placeholder={ph}
            name={nm}
        />
    );
}

export default Input;