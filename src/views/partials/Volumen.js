import React, {useState} from "react";
import '../../css/Volumen.css'
import Input from "../../components/Input";
import Btn2 from "../../components/Btn2";
import Swal from "sweetalert2";

const Volumen = () =>{

    const [longitud, setLongitud] = useState(0);
    const [ancho, setAncho] = useState(0);
    const [alto, setAlto] = useState(0);
    const [resultado, setResultado] = useState(0);

    const alertas = (icono, texto) =>{
        Swal.fire({
            // position: 'top-end',
            icon: icono,
            title: texto,
            showConfirmButton: false,
            timer: 1500
          })
    }

    const calcular = () =>{
        if (longitud > 0 && ancho > 0 && alto > 0) {
            setResultado((longitud*ancho)*alto);
            alertas('success','Listo');
        } else {
            alertas('error','campos vacios');
        }
    }

    return(
        <div className="contV">
            <div className="contInput">
                <div className="contI2">
                    <label for='longitud'>Ingrese Logitud:</label>
                    <Input
                        tp={'number'}
                        cls={'input1'}
                        ph={'Base'}
                        val={longitud}
                        nm={'longitud'}
                        fuc={e => setLongitud(parseInt(e.target.value))}
                    />
                </div>
                <div className="contI2">
                    <label for='ancho'>Ingrese Ancho:</label>
                    <Input
                        tp={'number'}
                        cls={'input1'}
                        ph={'Base'}
                        val={ancho}
                        nm={'ancho'}
                        fuc={e => setAncho(parseInt(e.target.value))}
                    />
                </div>
                <div className="contI2">
                    <label for='alto'>Ingrese Alto:</label>
                    <Input
                        tp={'number'}
                        cls={'input1'}
                        ph={'Base'}
                        val={alto}
                        nm={'alto'}
                        fuc={e => setAlto(parseInt(e.target.value))}
                    />
                </div>
            </div>
            <div className="contBV">
                <Btn2
                    text={'Calcular'}
                    cls={'btn1'}
                    func={calcular}
                />
                <p>Resultado: {resultado}</p>
            </div>
        </div>
    );
}

export default Volumen;