import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import '../css/chatBot.css'
import Btn2 from "./Btn2";
import Input from "./Input";



const BtnChat = () =>{
    const [visible, setVisible] = useState(false);
    const [input, setInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const chatboxRef = useRef(null);

    const btnVisible = () =>{
        setVisible(!visible);
    }

    const conversacion = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post('https://hydrobot.onrender.com/chat', {input: input});
            const Usuario = {
              user: 'Tu',
              message: input,
              type: 'user'
            };
      
            const bot = {
              user: 'CubeBot',
              message: response.data.response,
              type: 'bot'
            };
            setConversation((prevConversation) => [
              ...prevConversation,
              Usuario,
              bot
            ]);
      
            setInput('');
      
          } catch (error) {
          }
      }

      useEffect(() => {
        const chatboxElement = chatboxRef.current;
        chatboxElement.scrollTop = chatboxElement.scrollHeight;
      }, [conversation]);

    return(
        <div className="con-chatbot">
            <div className={visible ? "Chat-container animate__animated animate__bounceIn" : "Chat-container-no"}>
                <div className="chatHead">
                    <i class="fa-solid fa-robot"></i>
                    <span>CubeBot</span>
                </div>
                <div ref={chatboxRef} className="chatbody">
                    {conversation.map((message, index) => (
                    <div key={index} className={`message ${message.type === 'user' ? 'user' : 'bot animate__animated animate__bounceInLeft'}`}>
                        <strong>{message.user}:  </strong>{message.message}
                    </div>
                    ))}
                </div>
                <div className="chatfooter">
                    <form onSubmit={conversacion}>
                        <Input
                            tp={"text"}
                            cls={"form-control inputChat"}
                            val={input}
                            ph={"Ingrese su pregunta"}
                            fuc={(e) => setInput(e.target.value)}
                        />
                        <Btn2
                            tp={"submit"}
                            cls={"btn btnSend"}
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