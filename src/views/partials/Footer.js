import React from "react";
import '../../css/footer.css';
import Btn1 from '../../components/Btn1';

const Footer = () =>{
    return(
        <div className="seccion">
            <footer>
                <div className="cuadro"></div>
                <div className="redes">
                    <Btn1
                        text={<i class="fa-brands fa-facebook"></i>}
                        cls={"icon"}
                        url={'/'}
                    />
                    <Btn1
                        text={<i class="fa-brands fa-instagram"></i>}
                        cls={"icon"}
                        url={'/'}
                    />
                    <Btn1
                        text={<i class="fa-brands fa-twitter"></i>}
                        cls={"icon"}
                        url={'/'}
                    />
                    <Btn1
                        text={<i class="fa-brands fa-youtube"></i>}
                        cls={"icon"}
                        url={'/'}
                    />
                    <Btn1
                        text={<i class="fa-brands fa-whatsapp"></i>}
                        cls={"icon"}
                        url={'/'}
                    />
                </div>
                <p className="p">Terminos de use - Politicas de Privacidad</p>
                <p>&copy; 2023 CubeCheck </p>
            </footer>
        </div>
    );
}

export default Footer;