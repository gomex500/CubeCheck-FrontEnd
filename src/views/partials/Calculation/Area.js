import React, {useState} from "react";
import { Btn2, Input } from "../../../components";
import '../../../css/Area.css';
import Swal from "sweetalert2";
import { configApi } from "../../../apis/configApi";

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
            enviarTools('area');
            alertas('success','Listo');
        } else {
            alertas('error','Campos Vacios');
        }
    }

    const eliminarDatos = () =>{
        setBase(0);
        setAltura(0);
        setResultado(0);
        alertas('success','Datos Eliminados');
    }

    const enviarTools = async (tool) =>{
        configApi.put(`/tools/${tool}`)
        .then(response =>{
            console.log(response.data);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return(
        <div className="contA animate__animated animate__fadeInUp">
            <div className="contInput row">
                <div className="contI col-md-4">
                    <label htmlFor='base'>Ingrese Base:</label>
                    <Input
                        tp={'number'}
                        cls={'input1'}
                        ph={'Base'}
                        val={base}
                        nm={'base'}
                        fuc={e => setBase(parseInt(e.target.value))}
                    />
                </div>
                <div className="contI col-md-4">
                    <label htmlFor='altura'>Ingrese Altura:</label>
                    <Input
                        tp={'number'}
                        cls={'input1'}
                        ph={'Altura'}
                        val={altura}
                        nm={'altura'}
                        fuc={e => setAltura(parseInt(e.target.value))}
                    />
                </div>
                <div className="contBA col-md-4">
                    <Btn2
                        text={<i className="fa-solid fa-delete-left"></i>}
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
                <p>Area es: {resultado}</p>
            </div>
        </div>
    );
}

export default Area;