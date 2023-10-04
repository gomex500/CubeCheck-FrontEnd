import React from "react";
// import Btn1 from "../../components/Btn1";
import Input from "../../components/Input";
import '../../css/Pared.css'

const Pared = () =>{
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
                            val={''}
                            nm={'base'}
                            // fuc={e => setBase(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="contI col-md-4">
                        <label htmlFor='base'>Ingrese Altura:</label>
                        <Input
                            tp={'number'}
                            cls={'input1'}
                            ph={'Altura'}
                            val={''}
                            nm={'base'}
                            // fuc={e => setBase(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="contI col-md-4">
                        <label htmlFor="material">Selecione Material:</label>
                            <select name="material" className='form-select select2'>
                                <option value='1'>Ladrillo</option>
                                <option value='2'>Bloque</option>
                                <option value='3'>Piedra Cantera</option>
                            </select>
                    </div>
                    <div className="contPA">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pared;