import React from "react";

const Btn2 = ({tp, text, cls, func}) =>{
    return(
        <button type={tp} className={cls} onClick={func}>
                {text}
        </button>
    )
}

export default Btn2;