import React, {useEffect, useState} from 'react';
import { Esquema, Input } from '../../../components';
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

    const contruccion = {
        "embaldosado": [20,1,20]
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
                                    <label htmlFor='base'>Ingrese Ancho en Cm:</label>
                                    <Input
                                        tp={'number'}
                                        cls={'input1'}
                                        ph={'Base'}
                                        nm={'base'}
                                        max={1}
                                        min={12}
                                    />
                                </div>
                                <div className="contI col-md-4">
                                    <label htmlFor='base'>Ingrese Largo en Cm:</label>
                                    <Input
                                        tp={'number'}
                                        cls={'input1'}
                                        ph={'Altura'}
                                        nm={'base'}
                                    />
                                </div>
                                <div className="contI col-md-4">
                                    <label htmlFor='base'>Ingrese Altura en M:</label>
                                    <Input
                                        tp={'number'}
                                        cls={'input1'}
                                        ph={'Altura'}
                                        nm={'base'}
                                    />
                                </div>
                            </div>
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
                        {proyecto.construccion !== null ? <div>3D</div> :
                            <Esquema className="esquema" contruccion={contruccion}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Contruccion;