import React from "react";

const Checkbox = ({id, val, func, cls}) =>{
    return(
        <input className={cls} type="checkbox" id={id} checked={val} onChange={func}/>
    );
}

export default Checkbox;