import React, {useState} from "react";
import { Input, Btn2 } from "../../../components";
import {configApi} from '../../../apis/configApi'
import Swal from "sweetalert2";
import '../../../css/Pared.css'

const Pared = () =>{

    // const [puertas, setPuertas] = useState(false);
    // const [ventanas, setVentanas] = useState(false);

    const [basePared, setBasePared] = useState(0);
    const [alturaPared, setAlturaPared] = useState(0);
    const [material, setMaterial] = useState("Ladrillo");
    const [presupuesto, setPresupuesto] = useState(null);

    // const contPuertas = (e) =>{
    //     setPuertas(e.target.checked);
    // }

    // const contVentanas = (e) =>{
    //     setVentanas(e.target.checked);
    // }

    const alertas = (icono, texto) =>{
        Swal.fire({
            // position: 'top-end',
            icon: icono,
            title: texto,
            showConfirmButton: false,
            timer: 1500
          });
    }

    const ingresarM = (mate) =>{
        setMaterial(mate);
    }

    const pre = () =>{
        if (basePared > 0 && alturaPared > 0) {
            generarP({
                "base": basePared,
                "altura" : alturaPared,
                "material" : material
            });
            alertas('success', 'Listo');
        } else {
            alertas('error', 'Campos vacios');
        }
    }

    const generarP = (data) =>{
        configApi.post('/calculoPared', data)
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
                <h2 className="titulo-pared">Calcular Materiales de una Pared</h2>
                <div className="form-pared row">
                    <div className="contI col-md-4">
                        <label htmlFor='base'>Ingrese base:</label>
                        <Input
                            tp={'number'}
                            cls={'input1'}
                            ph={'Base'}
                            val={basePared}
                            nm={'base'}
                            max={1}
                            min={12}
                            fuc={e =>setBasePared(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="contI col-md-4">
                        <label htmlFor='base'>Ingrese Altura:</label>
                        <Input
                            tp={'number'}
                            cls={'input1'}
                            ph={'Altura'}
                            val={alturaPared}
                            nm={'base'}
                            fuc={e => setAlturaPared(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="contI col-md-4">
                        <label htmlFor="material">Selecione Material:</label>
                            <select name="material" onChange={e => ingresarM(e.target.value)} className='form-select select2'>
                                <option value="Ladrillo">Ladrillo</option>
                                <option value="Bloque">Bloque</option>
                                <option value="Piedra">Piedra Cantera</option>
                            </select>
                    </div>
                </div>
                {/* <div className="contPA">
                        <div className="contP">
                            <div class="form-check">
                                <Checkbox
                                    cls={"form-check-input"}
                                    val={puertas}
                                    id={"puertas"}
                                    func={contPuertas}
                                    />
                                <label class="form-check-label" htmlFor="puertas">
                                    Agregar Puerta
                                </label>
                            </div>
                            <hr/>
                            {puertas ?
                                <div className="puertas">
                                    <div className="row">
                                        <div className="contFP">
                                            <h4>Ingresando Puerta</h4>
                                                <Btn2
                                                    text={<i class="fa-solid fa-delete-left"></i>}
                                                    cls={'btn1'}
                                                />
                                        </div>
                                        <div className="contI col-md-6">
                                            <label htmlFor='base'>Ingrese Alto:</label>
                                            <Input
                                                tp={'number'}
                                                cls={'input1'}
                                                ph={'Alto de Puerta'}
                                                val={''}
                                                nm={'base'}
                                                // fuc={e => setBase(parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div className="contI col-md-6">
                                            <label htmlFor='base'>Ingrese Ancho:</label>
                                            <Input
                                                tp={'number'}
                                                cls={'input1'}
                                                ph={'Ancho de Puerta'}
                                                val={''}
                                                nm={'base'}
                                                // fuc={e => setBase(parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </div> :
                                null
                            }
                        </div>
                        <div className="contA">
                            <div class="form-check">
                                <Checkbox 
                                    cls={"form-check-input"}
                                    val={ventanas} 
                                    id={"ventanas"}
                                    func={contVentanas}
                                    />
                                <label class="form-check-label" for="ventanas">
                                    Agregar Ventana
                                </label>
                            </div>
                            <hr/>
                            {ventanas ?
                                <div className="ventana">
                                    <div className="row">
                                        <div className="contFP">
                                            <h4>Ingresando Ventana</h4>
                                                <Btn2
                                                    text={<i class="fa-solid fa-delete-left"></i>}
                                                    cls={'btn1'}
                                                />
                                        </div>
                                        <div className="contI col-md-6">
                                            <label htmlFor='base'>Ingrese Alto:</label>
                                            <Input
                                                tp={'number'}
                                                cls={'input1'}
                                                ph={'Alto de Ventana'}
                                                val={''}
                                                nm={'base'}
                                                // fuc={e => setBase(parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div className="contI col-md-6">
                                            <label htmlFor='base'>Ingrese Ancho:</label>
                                            <Input
                                                tp={'number'}
                                                cls={'input1'}
                                                ph={'Ancho de Ventana'}
                                                val={''}
                                                nm={'base'}
                                                // fuc={e => setBase(parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </div> :
                                null
                            }
                        </div>
                    </div> */}

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
                            <td>{presupuesto.Agua}</td>
                            <td>Litros</td>
                            <td>Agua</td>
                            <td>{presupuesto.precio} C$</td>
                        </tr>
                        <tr>
                            <td>{presupuesto.Arena.cantidad}</td>
                            <td>m3</td>
                            <td>Arena</td>
                            <td>{presupuesto.Arena.precio} C$</td>
                        </tr>
                        <tr>
                            <td>{presupuesto.Cemento.cantidad}</td>
                            <td>Kg</td>
                            <td>Cemento</td>
                            <td>{presupuesto.Cemento.precio} C$</td>
                        </tr>
                        <tr>
                            <td>{presupuesto.Ladrillos.cantidad}</td>
                            <td>Unidad</td>
                            <td>{material}</td>
                            <td>{presupuesto.Ladrillos.precio} C$</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Total:</td>
                            <td>{presupuesto.Ladrillos.precio + presupuesto.Arena.precio + presupuesto.Cemento.precio} C$</td>
                        </tr>
                    </tbody>:
                    <tbody>
                        
                    </tbody>
                    }
            </table>
        </div>
    );
}

export default Pared;