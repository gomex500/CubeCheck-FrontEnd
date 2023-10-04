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
            alertas('error','Campos Vacios');
        }
    }

    const eliminarDatos = () =>{
        setAlto(0);
        setAncho(0);
        setLongitud(0);
        setResultado(0);
        alertas('success','Datos Eliminados');
    }

    return(
        <div className="contV animate__animated animate__fadeInUp">
            <div className="contInput row">
                <div className="contI2 col-md-3">
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
                <div className="contI2 col-md-3">
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
                <div className="contI2 col-md-3">
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
                <div className="contBV col-md-3">
                    <Btn2
                        text={<i class="fa-solid fa-delete-left"></i>}
                        cls={"btn2"}
                        func={eliminarDatos}
                    />
                    <Btn2
                        text={'Calcular'}
                        cls={'btn1'}
                        func={calcular}
                    />
            </div>
            </div>
            <div className="contr">
                <p>Volumen es: {resultado}</p>
            </div>
        </div>
    );
}

export default Volumen;