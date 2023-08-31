import React from "react";

const Btn1 = ({text, cls, url}) =>{
    return(
        <a className={cls} href={url}>
            {text}
        </a>
    )
}

export default Btn1;