import React, {useState} from "react";
import Input from '../../components/Input';
import Btn2 from '../../components/Btn2';

const Perimetro = () =>{

    const [lados, setLados] = useState([]);

    return(
        <div className="contP animate__animated animate__fadeInUp row">
            <div className="contF col-md-6">
                <div className="contI3">
                    <label for='lado'>Ingrese Lado:</label>
                    <Input
                        tp={'number'}
                        cls={'input1'}
                        ph={'Lado'}
                        nm={'lado'}
                        // fuc={e => setLongitud(parseInt(e.target.value))}
                    />
                </div>
                <div className="contBP">
                    <Btn2
                        text={'Calcular'}
                        cls={'btn1'}
                        // func={calcular}
                    />
                </div>
            </div>
            <div className="lados col-md-6">
                {lados.length > 0 ? (
                    lados.map((lado, i) =>(
                            <h2>{lado}</h2>
                        ))) :
                        (
                            <h3>No hay datos</h3>
                        )}
            </div>
        </div>
    );
}

export default Perimetro;