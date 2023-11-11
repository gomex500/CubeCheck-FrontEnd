import React, {useEffect, useState} from 'react';
import { Esquema, Input, Btn2, Checkbox } from '../../../components';
import '../../../css/contruccion.css';
import { Carga } from '../Loading';
import Swal from 'sweetalert2';
import { configApi } from '../../../apis/configApi';


const Contruccion = ({id}) =>{

    const [carga, setCarga] = useState(false);
    const [proyecto, setProyecto] = useState({
        "nombre": "",
        "descripcion": "",
        "presupuesto": {},
        "construccion": {}
    });

    const [base, setBase] = useState(0);
    const [largo, setLargo] = useState(0);
    const [grosor, setGrosor] = useState(15);

    const [alturaPilares, setAlturaPilares] = useState(0);
    const [alturaPardes, setAlturaParedes] = useState(0);
    const [material, setMaterial] = useState("Ladrillo");

    const [moverPared, setMoverPared] = useState(false);
    const [moverPilar, setMoverPilar] = useState(false);

    const [ver, setVer] = useState(false);
    
    const [contruccion, setContruccion] = useState({
        "embaldosado": [10,0.4,10],
        "altura":3,
        "pilares":[{
            "x":0,
            "z":0
        }]
    });

    const validarDatos = () =>{
        if (base > 0 && grosor > 0 && largo > 0){
            alertas('success', 'Listo');
            superCalculo();
            setVer(true);
        }else{
            alertas('error', 'Campos vacios');
        }
    }

    const superCalculo = () =>{
        if(base < 6 && largo < 6){
            const contruc = {
                "embaldosado": [base,grosor/100,largo],
                "alturaPilares":alturaPilares,
                "alturaParedes":alturaPardes,
                "moverpilar":moverPilar,
                "moverPared":moverPared,
                "pilaresEsquinas":[{
                        "x":(base/2)-0.25,
                        "y":1.6,
                        "z":(largo/2)-0.25
                    },
                    {
                        "x":((base/2)-0.25)*-1,
                        "y":1.6,
                        "z":(largo/2)-0.25
                    },
                    {
                        "x":((base/2)-0.25)*-1,
                        "y":1.6,
                        "z":((largo/2)-0.25)*-1
                    },
                    {
                        "x":(base/2)-0.25,
                        "y":1.6,
                        "z":((largo/2)-0.25)*-1
                    }
                ],
            }
            setContruccion(contruc);
        }else{
             //cantidad pilares
            const CPZ = Math.floor((base / 3) - 1);
            const CPX = Math.floor((largo / 3) - 1);

            //cantidad paredes
            const CPPZ = Math.floor(base / 3);
            const CPPX = Math.floor(largo / 3);

            //grosor de pilares
            const grosorPZ = (CPZ + 2) * 0.25;
            const grosorPX = (CPX + 2) * 0.25;

            //calculo axuiliar
            const axuiZ = base - grosorPZ;
            const axuiX = base - grosorPX;

            //cantidad de espacios de separacion entre pilares
            const CDPZ = axuiZ / CPPZ;
            const CDPX = axuiX / CPPX;

            let pilaresZ = [];
            let pilaresZN = [];

            let ca = CDPZ + 0.25;

            let ca2 = base / 2
            
            for (let i = 0; i < CPZ; i++) {
                let n = ca2 - ca;
                let objeto1 = {
                    "x":parseFloat(n.toFixed(1)),
                    "y":1.6,
                    "z":(largo/2)-0.25
                };
                let objeto2 = {
                    "x":parseFloat(n.toFixed(1)),
                    "y":1.6,
                    "z":((largo/2)-0.25)*-1
                };
                ca2 = parseFloat(n.toFixed(1));
                pilaresZ.push(objeto1);
                pilaresZN.push(objeto2);
            }

            let pilaresX = [];
            let pilaresXN = [];

            let cax = CDPX + 0.25;

            let cax2 = (largo / 2)*-1

            for (let e = 0; e < CPX; e++) {
                let n = cax2 + cax;
                let objeto1 = {
                    "x":(base/2)-0.25,
                    "y":1.6,
                    "z":parseFloat(n.toFixed(1))
                };
                let objeto2 = {
                    "x":((base/2)-0.25)*-1,
                    "y":1.6,
                    "z":parseFloat(n.toFixed(1))
                };
                cax2 = parseFloat(n.toFixed(1));
                pilaresX.push(objeto1);
                pilaresXN.push(objeto2);
            }

            const contruc = {
                "embaldosado": [base,grosor/100,largo],
                "alturaPilares":alturaPilares,
                "alturaParedes":alturaPardes,
                "moverPilar":moverPilar,
                "moverPared":moverPared,
                "pilaresEsquinas":[{
                        "x":(base/2)-0.25,
                        "y":1.6,
                        "z":(largo/2)-0.25
                    },
                    {
                        "x":((base/2)-0.25)*-1,
                        "y":1.6,
                        "z":(largo/2)-0.25
                    },
                    {
                        "x":((base/2)-0.25)*-1,
                        "y":1.6,
                        "z":((largo/2)-0.25)*-1
                    },
                    {
                        "x":(base/2)-0.25,
                        "y":1.6,
                        "z":((largo/2)-0.25)*-1
                    }
                ],
                "pilaresZ":pilaresZ,
                "pilaresZN":pilaresZN,
                "pilaresX":pilaresX,
                "pilaresXN":pilaresXN
            }
        setContruccion(contruc);
        }
    }

    const alertas = (icono, texto) =>{
        Swal.fire({
            // position: 'top-end',
            icon: icono,
            title: texto,
            showConfirmButton: false,
            timer: 1500
          });
    }

    const obtenerProyecto = () =>{
        setCarga(true);
        const datos = localStorage.getItem('data');
        const data = JSON.parse(datos);
        const config = {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
        }
        configApi.get(`/proyectos/${id}`, config)
        .then((response) =>{
            setCarga(false);
            setProyecto(response.data);
        })
        .catch((error) =>{
            console.log(error);
            setCarga(false);
            alertas('error', error.response.data.menssage);
        })
    }

    const verFecha = (date) =>{
        const fecha = new Date(date);
        return `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`
    }

    useEffect(() => {
        obtenerProyecto();
    }, [])
    

    if (carga) {
        return(<Carga/>);
    } else {
        return(
            <div className='seccion'>
                <div className='cont-contruccion'>
                    <h2 className="titulo-pared">Calculo de la Construccion</h2>
                    <div className='form-contruccion'>
                        <div className='titulo'>
                            <h3><span>Nombre:</span> {proyecto.nombre}</h3>
                            <h3><span>Fecha:</span> {verFecha(proyecto.create_at)}</h3>
                        </div>
                        <hr/>
                        <div className='form'>
                            <p className='tituloE'>Embaldosado</p>
                            <div className="form-pared row">
                                <div className="contI col-md-4">
                                    <label htmlFor='base'>Ingrese Ancho en Mt:</label>
                                    <Input
                                        tp={'number'}
                                        cls={'input1'}
                                        ph={'Base'}
                                        nm={'base'}
                                        val={base}
                                        fuc={e => setBase(parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="contI col-md-4">
                                    <label htmlFor='base'>Ingrese Largo en Mt:</label>
                                    <Input
                                        tp={'number'}
                                        cls={'input1'}
                                        ph={'Largo'}
                                        nm={'largo'}
                                        val={largo}
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
                            <div className='form-pared row'>
                            <p className='tituloE'>Pilar y Pared</p>
                                <div className="contI col-md-4">
                                    <label htmlFor='base'>Ingrese Altura del Pilar en Mt:</label>
                                    <Input
                                        tp={'number'}
                                        cls={'input1'}
                                        ph={'Altura Pilar'}
                                        nm={'alturap'}
                                        val={alturaPilares}
                                        fuc={e => setAlturaPilares(parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="contI col-md-4">
                                    <label htmlFor='base'>Ingrese Altura de la Pared en Mt:</label>
                                    <Input
                                        tp={'number'}
                                        cls={'input1'}
                                        ph={'Altura Pared'}
                                        nm={'alturaP2'}
                                        val={alturaPardes}
                                        fuc={e => setAlturaParedes(parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="contI col-md-4">
                                    <label htmlFor="material">Selecione Material:</label>
                                    <select name="material" onChange={e => setMaterial(e.target.value)} className='form-select select2'>
                                        <option value="Ladrillo">Ladrillo</option>
                                        <option value="Bloque">Bloque</option>
                                        <option value="Piedra">Piedra Cantera</option>
                                    </select>
                                </div>
                            </div>
                            <div className='cont-chekbox-movi'>
                                    <p>Ajustes 3D</p>
                                    <Checkbox
                                        cls={"form-check-input"}
                                        val={moverPilar}
                                        id={"pilar"}
                                        func={() => setMoverPilar(!moverPilar)}
                                        />
                                    <label class="form-check-label" htmlFor="pilar">
                                        Mover Pilares
                                    </label>
                                    <Checkbox
                                        cls={"form-check-input"}
                                        val={moverPared}
                                        id={"pared"}
                                        func={() => setMoverPared(!moverPared)}
                                        />
                                    <label class="form-check-label" htmlFor="pared">
                                        Mover Paredes
                                    </label>
                            </div>
                            <hr/>
                            <center>
                                <Btn2
                                    func={validarDatos}
                                    tp={"button"}
                                    cls={"btn1 mt-4"}
                                    text={"Calcular"}
                                />
                            </center>
                        </div>
                    </div>
                    <div className='presupuesto'>
                        <table className="table cont-tb table-bordered">
                        <thead className="table-head">
                            <tr>
                                <th>Cantidad</th>
                                <th>Medida</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                            {proyecto.presupuesto !== null ? <tbody className="table-body">
                                </tbody>:
                                <tbody>
                                    
                                </tbody>
                            }
                    </table>
                    </div>
                    <div className='lienzo'>
                        {ver === false ? <div>3D</div> :
                            <Esquema className="esquema" contruccion={contruccion}/>
                        }
                         {/* <Esquema className="esquema" contruccion={contruccion}/> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Contruccion;