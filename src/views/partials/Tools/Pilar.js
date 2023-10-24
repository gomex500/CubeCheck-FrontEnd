import React, {useState} from "react";
import { Btn2, Input } from "../../../components";
import { configApi } from "../../../apis/configApi";
import Swal from "sweetalert2";

const Pilar = () =>{

    const [ancho, setAncho] = useState(0);
    const [largo, setLargo] = useState(0);
    const [altura, setAltura] = useState(0);
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
        if ((ancho > 0 && largo > 0) && altura > 0) {
            generarP({
                "largo": largo/100,
                "altura" : altura,
                "ancho" : ancho/100
            });
            alertas('success', 'Listo');
        } else {
            alertas('error', 'Campos vacios');
        }
    }

    const generarP = (data) =>{
        configApi.post('/calculoPilar', data)
        .then(response =>{
            setPresupuesto(response.data);
            console.log(response.data);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return(
        <div className="seccion">
            <div className="cont-pared">
                <h2 className="titulo-pared">Calcular Materiales de un Pilar</h2>
                <div className="form-pared row">
                    <div className="contI col-md-4">
                        <label htmlFor='base'>Ingrese Ancho en Cm:</label>
                        <Input
                            tp={'number'}
                            cls={'input1'}
                            ph={'Base'}
                            val={ancho}
                            nm={'base'}
                            max={1}
                            min={12}
                            fuc={e =>setAncho(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="contI col-md-4">
                        <label htmlFor='base'>Ingrese Largo en Cm:</label>
                        <Input
                            tp={'number'}
                            cls={'input1'}
                            ph={'Altura'}
                            val={largo}
                            nm={'base'}
                            fuc={e => setLargo(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="contI col-md-4">
                        <label htmlFor='base'>Ingrese Altura en M:</label>
                        <Input
                            tp={'number'}
                            cls={'input1'}
                            ph={'Altura'}
                            val={altura}
                            nm={'base'}
                            fuc={e => setAltura(parseInt(e.target.value))}
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
                            <td>{presupuesto.arena.cantidad}</td>
                            <td>m3</td>
                            <td>Arena</td>
                            <td>{presupuesto.arena.precio} C$</td>
                        </tr>
                        <tr>
                            <td>{presupuesto.grava.cantidad}</td>
                            <td>m3</td>
                            <td>Grava</td>
                            <td>{presupuesto.grava.precio} C$</td>
                        </tr>
                        <tr>
                            <td>{presupuesto.cemento.cantidad}</td>
                            <td>Quintales</td>
                            <td>Cemento</td>
                            <td>{presupuesto.cemento.precio} C$</td>
                        </tr>
                        <tr>
                            <td>{presupuesto.hierroCorrugado.cantidad}</td>
                            <td>Metros Liniales</td>
                            <td>Hierro Corrugado</td>
                            <td>{presupuesto.hierroCorrugado.precio} C$</td>
                        </tr>
                        <tr>
                            <td>{presupuesto.hierroLiso.cantidad}</td>
                            <td>Metros Liniales</td>
                            <td>Hierro Liso</td>
                            <td>{presupuesto.hierroLiso.precio} C$</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Total:</td>
                            <td>{presupuesto.grava.precio + presupuesto.arena.precio + presupuesto.cemento.precio + presupuesto.hierroLiso.precio + presupuesto.hierroCorrugado.precio} C$</td>
                        </tr>
                    </tbody>:
                    <tbody>
                        
                    </tbody>
                    }
            </table>
        </div>
    );
}

export default Pilar;
