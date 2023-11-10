import React, {useEffect, useState} from 'react';
import { Esquema, Input, Btn2 } from '../../../components';
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
    const [altura, setAltura] = useState(0);
    const [largo, setLargo] = useState(0);
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
        if (base > 0 && altura > 0 && largo > 0){
            alertas('success', 'Listo');
            superCalculo();
            setVer(true);
        }else{
            alertas('error', 'Campos vacios');
        }
    }

    const superCalculo = () =>{

        //cantidad pilares
        const CPZ = Math.floor((base / 3) - 1);
        const CPX = Math.floor((largo / 3) - 1);

        //cantidad paredes
        const CPPZ = Math.floor(base / 3);
        const CPPX = Math.floor(largo / 3);

        //grosor de pilares
        const grosorPZ = (CPZ + 2) * 0.4;
        const grosorPX = (CPX + 2) * 0.4;

        //calculo axuiliar
        const axuiZ = base - grosorPZ;
        const axuiX = base - grosorPX;

        //cantidad de espacios de separacion entre pilares
        const CDPZ = axuiZ / CPPZ;
        const CDPX = axuiX / CPPX;

        let pilaresZ = [];
        let ca = CDPZ + 0.4;
        let ca2 = base / 2
        for (let i = 0; i < CPZ; i++) {
            let n = ca2 - ca;
            let objeto = {
                "x":parseFloat(n.toFixed(1)),
                "y":1.6,
                "z":(largo/2)-0.25
            };
            ca2 = parseFloat(n.toFixed(1));
            pilaresZ.push(objeto);
        }

        const contruc = {
            "embaldosado": [base,0.4,largo],
            "altura":altura,
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
            // "pilaresZN":[],
            // "pilaresX":[],
            // "pilaresXN":[]
        }
        setContruccion(contruc);

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
                    <h2>Proyecto</h2>
                    <div className='form-contruccion'>
                        <div className='titulo'>
                            <h3><span>Nombre:</span> {proyecto.nombre}</h3>
                            <h3><span>Fecha:</span> {verFecha(proyecto.create_at)}</h3>
                        </div>
                        <hr/>
                        <div className='form'>
                            <h2 className="titulo-pared">Calculo de la Construccion</h2>
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
                                        nm={'base'}
                                        val={largo}
                                        fuc={e => setLargo(parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="contI col-md-4">
                                    <label htmlFor='base'>Ingrese Altura en Mt:</label>
                                    <Input
                                        tp={'number'}
                                        cls={'input1'}
                                        ph={'Altura'}
                                        nm={'base'}
                                        val={altura}
                                        fuc={e => setAltura(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
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