import React, {useState} from "react";
import '../css/chatBot.css'
import Btn2 from "./Btn2";



const BtnChat = () =>{

    const [visible, setVisible] = useState(false);

    const btnVisible = () =>{
        setVisible(!visible);
    }

    return(
        <div className="con-chatbot">
            <div className={visible ? "Chat-container animate__animated animate__bounceIn" : "Chat-container-no"}>
                <div className="chatHead">
                    <i class="fa-solid fa-robot"></i>
                    <span>CubeBot</span>
                </div>
                <div className="chatbody">
                    
                </div>
                <div className="chatfooter">
                    
                </div>
            </div>
            <Btn2
                text={<i class="fa-solid fa-comments"></i>}
                cls={"btnChat animate__animated animate__bounce"}
                func={btnVisible}
            />
        </div>
    )
}

export default BtnChat;