import React, {useState} from 'react';
import '../css/Calculation.css';
import Btn2 from '../components/Btn2';
import Input from '../components/Input';
import Swal from 'sweetalert2';
import Area from './partials/Area';
import Perimetro from './partials/Perimetro';
import Volumen from './partials/Volumen';

const Calculation = () =>{

    const [btnC, setBtnC] = useState(true);
    const [seleccion, setSeleccion] = useState(1);
    const [seleccion2, setSeleccion2] = useState(1);
    const [seleccionC, setSeleccionC] = useState(1);
    const [val1, setVal1] = useState(0);
    const [resultado, setResultado] = useState(0);


    const cambio = () =>{
        setBtnC(!btnC);
    }

    const convertir = () =>{
        if(val1 > 0){
            switch (seleccion) {
                case 1:
                    switch (seleccion2) {
                        case 1:
                            setResultado(val1);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 2:
                            setResultado(val1*100);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 3:
                            setResultado(val1*1000);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 4:
                            setResultado(val1*1.094);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 5:
                            setResultado(val1*3.281);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 6:
                            setResultado(val1*39.37);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        default:
                        alertas('error','Error');
                    }
                break;
                case 2:
                    switch (seleccion2) {
                        case 1:
                            setResultado(val1/100);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 2:
                            setResultado(val1);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 3:
                            setResultado(val1*10);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 4:
                            setResultado(val1/91.44);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 5:
                            setResultado(val1/30.48);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 6:
                            setResultado(val1/2.54);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        default:
                        alertas('error','Error');
                    }
                break;
                case 3:
                    switch (seleccion2) {
                        case 1:
                            setResultado(val1/1000);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 2:
                            setResultado(val1/10);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 3:
                            setResultado(val1);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 4:
                            setResultado(val1/914.4);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 5:
                            setResultado(val1/304.8);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 6:
                            setResultado(val1/25.4);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        default:
                        alertas('error','Error');
                    }
                break;
                case 4:
                    switch (seleccion2) {
                        case 1:
                            setResultado(val1/1.094);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 2:
                            setResultado(val1*91.44);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 3:
                            setResultado(val1*914.4);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 4:
                            setResultado(val1);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 5:
                            setResultado(val1*3);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 6:
                            setResultado(val1*36);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        default:
                        alertas('error','Error');
                    }
                break;
                case 5:
                    switch (seleccion2) {
                        case 1:
                            setResultado(val1/3.281);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 2:
                            setResultado(val1*30.48);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 3:
                            setResultado(val1*304.8);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 4:
                            setResultado(val1/3);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 5:
                            setResultado(val1);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 6:
                            setResultado(val1*12);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        default:
                        alertas('error','Error');
                    }
                break;
                case 6:
                    switch (seleccion2) {
                        case 1:
                            setResultado(val1/39.37);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 2:
                            setResultado(val1*2.54);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 3:
                            setResultado(val1*25.4);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 4:
                            setResultado(val1/36);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 5:
                            setResultado(val1/12);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        case 6:
                            setResultado(val1);
                            setVal1(0);
                            alertas('success','Listo');
                        break;
                        default:
                        alertas('error','Error');
                    }
                break;
                default:
                    alertas('error','Error');
            }
        }else{
            alertas('error','No hay datos');
        }
    }

    const cambio2 = (contenedor) =>{
        setSeleccionC(contenedor);
    }

    const alertas = (icono, texto) =>{
        Swal.fire({
            // position: 'top-end',
            icon: icono,
            title: texto,
            showConfirmButton: false,
            timer: 1500
          })
    }

    return(
        <div className='seccion'>
            <div className='cont-cal'>
                <div className='cont-btnC'>
                    <Btn2
                        text={'Calculadora'}
                        cls={btnC ? 'btnC2' : 'btnC1'}
                        tp={'button'}
                        func={btnC ? null : cambio}
                    />
                    <Btn2
                        text={'Convertidor'}
                        cls={btnC ? 'btnC1' : 'btnC2'}
                        tp={'button'}
                        func={btnC ? cambio : null}
                    />
                </div>
                {
                    btnC ?
                    <div className='cont-1 animate__animated animate__bounceInLeft'>
                        <div className='contS1'>
                            <p>Calcular:
                                <select onChange={e => cambio2(parseInt(e.target.value))} className='form-select select2'>
                                    <option value='1'>Area</option>
                                    <option value='2'>Perimetro</option>
                                    <option value='3'>Volumen</option>
                                </select>
                            </p>
                            <hr/>
                            {(() =>{
                                if (seleccionC === 1) {
                                    return <Area/>
                                } else if (seleccionC === 2) {
                                    return <Perimetro/>
                                }else if(seleccionC === 3){
                                    return <Volumen/>
                                }else{
                                    return null;
                                }
                            })()}
                        </div>
                    </div> :
                    <div className='cont2 animate__animated animate__bounceInRight'>
                        <div className='contS'>
                            <p>Convertir:
                                <select name='medida' onChange={e => setSeleccion(parseInt(e.target.value))} className='form-select select1'>
                                    <option value='1'>Metros</option>
                                    <option value='2'>Centimetro</option>
                                    <option value='3'>Milimetro</option>
                                    <option value='4'>Yarda</option>
                                    <option value='5'>Pie</option>
                                    <option value='6'>Pulgada</option>
                                </select>
                                A
                                <select name='medida' onChange={e => setSeleccion2(parseInt(e.target.value))} className='form-select select1'>
                                    <option value='1'>Metros</option>
                                    <option value='2'>Centimetro</option>
                                    <option value='3'>Milimetro</option>
                                    <option value='4'>Yarda</option>
                                    <option value='5'>Pie</option>
                                    <option value='6'>Pulgada</option>
                                </select>
                            </p>
                        </div>
                        <div className='contIB'>
                            <Input
                                tp={'number'}
                                cls={'form-control input1'}
                                val={val1}
                                fuc={e => setVal1(e.target.value)}
                                ph={'Ingrese numero'}
                                nm={'val'}
                            />
                            <Btn2
                                text={'Convertir'}
                                cls={'btnC1'}
                                tp={'button'}
                                func={convertir}
                            />
                            <h2>Resultado: {resultado}</h2>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Calculation;

