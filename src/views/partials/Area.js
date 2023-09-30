import React, {useState} from "react";
import Btn2 from "../../components/Btn2";
import Input from "../../components/Input";
import '../../css/Area.css';
import Swal from "sweetalert2";

const Area = () =>{

    const [base, setBase] = useState(0);
    const [altura, setAltura] = useState(0);
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
        if (base > 0 && altura > 0) {
            setResultado(base*altura);
            alertas('success','Listo');
        } else {
            alertas('error','campos vacios');
        }
    }

    return(
        <div className="contA animate__animated animate__fadeInUp">
            <div className="contInput">
                <div className="contI">
                    <label for='base'>Ingrese Base:</label>
                    <Input
                        tp={'number'}
                        cls={'input1'}
                        ph={'Base'}
                        val={base}
                        nm={'base'}
                        fuc={e => setBase(parseInt(e.target.value))}
                    />
                </div>
                <div className="contI">
                    <label for='altura'>Ingrese Altura:</label>
                    <Input
                        tp={'number'}
                        cls={'input1'}
                        ph={'Altura'}
                        val={altura}
                        nm={'altura'}
                        fuc={e => setAltura(parseInt(e.target.value))}
                    />
                </div>
            </div>
            <div className="contBA">
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

export default Area;