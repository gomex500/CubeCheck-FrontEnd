import React from "react";

const BtnChat = ({text, cls, func}) =>{
    return(
        <button className={cls} onClick={func}>
            {text}
        </button>
    )
}

export default BtnChat;