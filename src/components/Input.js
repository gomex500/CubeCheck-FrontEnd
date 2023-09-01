import React from "react";

const Input = ({tp, cls, val, fuc, ph}) =>{
    return(
        <input
            type={tp}
            className={cls}
            value={val}
            onChange={fuc}
            placeholder={ph}
        />
    );
}

export default Input;