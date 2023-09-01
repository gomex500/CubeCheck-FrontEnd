import React from "react";

const Btn2 = ({text, cls, func}) =>{
    return(
        <button className={cls} onClick={func}>
                {text}
        </button>
    )
}

export default Btn2;