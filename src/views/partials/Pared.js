import React from "react";
// import Btn1 from "../../components/Btn1";
import Input from "../../components/Input";
import '../../css/Pared.css'

const Pared = () =>{
    return(
        <div className="seccion">
            <div className="cont-pared">
                <h2 className="titulo-pared">Calcular Materiales de una Pared</h2>
                <div className="form-pared">
                    <div className="contI">
                        <label for='base'>Ingrese base:</label>
                        <Input
                            tp={'number'}
                            cls={'input1'}
                            ph={'Base'}
                            val={''}
                            nm={'base'}
                            // fuc={e => setBase(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="contI">
                        <label for='base'>Ingrese Altura:</label>
                        <Input
                            tp={'number'}
                            cls={'input1'}
                            ph={'Altura'}
                            val={''}
                            nm={'base'}
                            // fuc={e => setBase(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="contS1">
                        <p>Selecione Material:
                            <select className='form-select select2'>
                                <option value='1'>Ladrillo</option>
                                <option value='2'>Bloque</option>
                                <option value='3'>Piedra Cantera</option>
                            </select>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pared;