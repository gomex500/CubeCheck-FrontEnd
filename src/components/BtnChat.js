import React, {useState} from "react";
import '../css/chatBot.css'
import Btn2 from "./Btn2";
import Input from "./Input";



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
                    <form>
                        <Input
                            tp={"text"}
                            cls={"input"}
                            val={""}
                            ph={"Ingrese pregunta"}
                            fuc={console.log("")}
                        />
                        <Btn2
                            tp={"submit"}
                            cls={"btn"}
                            func={console.log("")}
                            text={<i class="fa-solid fa-paper-plane"></i>}
                        />
                    </form>
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