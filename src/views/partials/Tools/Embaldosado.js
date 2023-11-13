import React, {useState} from "react";
import {configApi} from '../../../apis/configApi'
import Swal from "sweetalert2";
import { Input, Btn2 } from "../../../components";

const Embaldosado = () =>{

    const [ancho, setAncho] = useState(0);
    const [largo, setLargo] = useState(0);
    const [grosor, setGrosor] = useState(15);
    const [presupuesto, setPresupuesto] = useState(null);

    const alertas = (icono, texto) =>{
        Swal.fire({
            // position: 'top-end',
            icon: icono,
            title: texto,
            showConfirmButton: false,
            timer: 1500
          });
    }

    const pre = () =>{
        if (ancho > 0 && largo > 0 && grosor) {
            generarP({
                "largo": largo,
                "ancho" : ancho,
                "grosor" : grosor/100
            });
            alertas('success', 'Listo');
        } else {
            alertas('error', 'Campos vacios');
        }
    }

    const generarP = (data) =>{
        configApi.post('/calculoEmbaldosado', data)
        .then(response =>{
            setPresupuesto(response.data);
            enviarTools('embaldosado')
        })
        .catch(error =>{
            console.log(error);
        })
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
        <div className="seccion">
            <div className="cont-pared">
                <h2 className="titulo-pared">Calcular Materiales de un Embaldosado</h2>
                <div className="form-pared row">
                    <div className="contI col-md-4">
                        <label htmlFor='base'>Ingrese Ancho:</label>
                        <Input
                            tp={'number'}
                            cls={'input1'}
                            ph={'ancho'}
                            val={ancho}
                            nm={'ancho'}
                            fuc={e =>setAncho(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="contI col-md-4">
                        <label htmlFor='base'>Ingrese Largo:</label>
                        <Input
                            tp={'number'}
                            cls={'input1'}
                            ph={'Largo'}
                            val={largo}
                            nm={'largo'}
                            fuc={e => setLargo(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="contI col-md-4">
                        <label htmlFor='base'>Ingrese Grosor en Cm: {grosor}</label>
                        <Input
                            tp={'range'}
                            cls={'input1'}
                            nm={'grosor'}
                            val={grosor}
                            min={15}
                            max={25}
                            fuc={e => setGrosor(parseInt(e.target.value))}
                        />
                    </div>
                </div>
            </div>
            <center>
                <Btn2
                    func={pre}
                    tp={"button"}
                    cls={"btn1 mt-4"}
                    text={"Calcular"}
                />
            </center>
            <table className="table cont-tb table-bordered">
                <thead className="table-head">
                    <tr>
                        <th>Cantidad</th>
                        <th>Medida</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                {presupuesto ? <tbody className="table-body">
                         <tr>
                            <td>{presupuesto.agua}</td>
                            <td>Litros</td>
                            <td>Agua</td>
                            <td>{presupuesto.precio} C$</td>
                        </tr>
                        <tr>
                            <td>{Math.ceil(presupuesto.arena.cantidad/0.019 )}</td>
                            <td>Latas</td>
                            <td>Arena</td>
                            <td>{presupuesto.arena.precio} C$</td>
                        </tr>
                        <tr>
                            <td>{Math.ceil(presupuesto.grava.cantidad/0.019)}</td>
                            <td>Latas</td>
                            <td>Grava</td>
                            <td>{presupuesto.grava.precio} C$</td>
                        </tr>
                        <tr>
                            <td>{presupuesto.cemento.cantidad}</td>
                            <td>Bolsas</td>
                            <td>Cemento</td>
                            <td>{presupuesto.cemento.precio} C$</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Total:</td>
                            <td>{presupuesto.arena.precio + presupuesto.grava.precio + presupuesto.cemento.precio} C$</td>
                        </tr>
                    </tbody>:
                    <tbody>
                        
                    </tbody>
                    }
            </table>
        </div>
    );
}

export default Embaldosado;