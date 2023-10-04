import React, {useState} from "react";
// import Btn1 from "../../components/Btn1";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import '../../css/Pared.css'

const Pared = () =>{

    const [puertas, setPuertas] = useState(false);
    const [ventanas, setVentanas] = useState(false);


    const contPuertas = (e) =>{
        setPuertas(e.target.checked);
    }

    const contVentanas = (e) =>{
        setVentanas(e.target.checked);
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
                </div>
                <div className="contPA">
                        <div className="contP">
                            <div class="form-check">
                                <Checkbox 
                                    cls={"form-check-input"}
                                    val={puertas} 
                                    id={"puertas"}
                                    func={contPuertas}
                                    />
                                <label class="form-check-label" htmlFor="puertas">
                                    Agregar Puertas
                                </label>
                            </div>
                            <hr/>
                            {puertas ?
                                <div className="puertas">
                                    <div className="row">
                                        <div className="col-md-4">
                                        <h4>Ingresando Puerta</h4>
                                        <div className="contI">
                                            <label htmlFor='base'>Ingrese Alto:</label>
                                            <Input
                                                tp={'number'}
                                                cls={'input1'}
                                                ph={'Alto de ventana'}
                                                val={''}
                                                nm={'base'}
                                                // fuc={e => setBase(parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div className="contI">
                                            <label htmlFor='base'>Ingrese Ancho:</label>
                                            <Input
                                                tp={'number'}
                                                cls={'input1'}
                                                ph={'Ancho de ventana'}
                                                val={''}
                                                nm={'base'}
                                                // fuc={e => setBase(parseInt(e.target.value))}
                                            />
                                        </div>
                                        </div>
                                        <div className="col-md-6">

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
                                    Agregar Ventanas
                                </label>
                            </div>
                            <hr/>
                            {ventanas ?
                                <div className="ventana">
                                    <h3>Ventanas</h3>
                                </div> :
                                null
                            }
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Pared;