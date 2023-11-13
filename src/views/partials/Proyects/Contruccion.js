import React, {useEffect, useState} from 'react';
import { Esquema, Input, Btn2, Checkbox } from '../../../components';
import '../../../css/contruccion.css';
import { Carga } from '../Loading';
import Swal from 'sweetalert2';
import { configApi } from '../../../apis/configApi';
import jsPDF from 'jspdf'
import logoM from '../../../img/logoM.png'
import 'jspdf-autotable';


const Contruccion = ({proyect}) =>{

    const [carga, setCarga] = useState(false);
    const [proyecto, setProyecto] = useState({
        "construccion": {},
        "descripcion": "una casita",
        "nombre": "mi primer proyecto",
        "presupuesto": {}
      });

    const [base, setBase] = useState(0);
    const [largo, setLargo] = useState(0);
    const [grosor, setGrosor] = useState(15);

    const [alturaPilares, setAlturaPilares] = useState(0);
    const [alturaPardes, setAlturaParedes] = useState(0);
    const [material, setMaterial] = useState("Ladrillo");

    const [moverPared, setMoverPared] = useState(false);
    const [moverPilar, setMoverPilar] = useState(false);
    const [validar, setValidar] = useState(true);
    
    const [contruccion, setContruccion] = useState(null);

    const validarDatos = async () =>{
        if (base > 0 ||
            largo > 0 ||
            alturaPilares > 0 ||
            alturaPardes > 0){
            alertas('success', 'Listo');
            await superCalculo();
            setValidar(false)
        }else{
            alertas('error', 'Campos vacios');
        }
    }

    const superCalculo = () =>{
        return new Promise((resolve, reject) => {
            if(base < 6 && largo < 6){
                const contruc = {
                    "embaldosado": [base,grosor/100,largo],
                    "alturaPilares":alturaPilares,
                    "alturaParedes":alturaPardes,
                    "moverpilar":moverPilar,
                    "moverPared":moverPared,
                    "materialBase":material,
                    "numeroParedes":4,
                    "numeroPilares":4,
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
                resolve();
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
                    "numeroParedes":(CPPX+CPPZ)*2,
                    "numeroPilares":((CPZ+CPX)*2)+4,
                    "materialBase":material,
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
            resolve();
            }
        })
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

    const obtenerProyecto = async () =>{
        setCarga(true);
        const datos = localStorage.getItem('data');
        const data = JSON.parse(datos);
        const config = {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
        }
        await configApi.get(`/proyectos/${proyect}`, config)
        .then((response) =>{
            setProyecto(response.data);
            setCarga(false);
            setValidar(true);
        })
        .catch((error) =>{
            console.log(error);
            setCarga(false);
            alertas('error', error.response.data.menssage);
            setValidar(true);
        })
    }

    const generalCP3D = () =>{
        setCarga(true);
        const datos = localStorage.getItem('data');
        const data = JSON.parse(datos);
        const config = {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
        }
        configApi.put(`/proyectos/${proyecto._id}`, contruccion, config)
        .then((response) =>{
            obtenerProyecto();
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

    const generalPDF = () =>{

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: 'letter'
          });

          const fecha = new Date().toLocaleDateString();

          const pageWidth = doc.internal.pageSize.width;
          const pageHeight = doc.internal.pageSize.height;
          doc.addImage(logoM, 'JPEG', 0, 0, pageWidth, pageHeight);

          doc.setFont('Time-Roman');
          doc.setFontSize(16);
          doc.setTextColor("#4d83bc")
          var width = doc.internal.pageSize.getWidth()
          doc.text('CUBECHECK', 0.5, 0.4);
          doc.setTextColor("#4d83bc")
          doc.text(`Fecha: ${fecha}`, 8, 0.4, {align: 'right'});
            doc.setFontSize(30);
            doc.setTextColor("#4d83bc")
            doc.text(`Informe de Presupuesto`, width/2, 1, {align: 'center'});
            doc.setFontSize(20);
            doc.setTextColor("#252525")
            doc.text(`Nombre: ${proyecto.nombre}`, width/2, 1.3, {align: 'center'});
            doc.setFontSize(16);
            doc.setTextColor("#4d83bc")
            doc.text(`Presupuesto Paredes`, 0.5, 1.7);
            doc.setFontSize(12);
            doc.setTextColor("#252525")
            doc.text(`Numero de Paredes: ${proyecto.presupuesto.cantidadParedes}`, 8, 1.7,{align: 'right'});
            // Datos para la tabla
            const data = [
                ['Cantidad', 'Medida', 'Nombre', 'Precio'],
                [proyecto.presupuesto.presupuestoParedes.agua, 'Litros', 'Agua', 'C$'],
                [proyecto.presupuesto.presupuestoParedes.arena.cantidad, 'Latas', 'Arena', `${proyecto.presupuesto.presupuestoParedes.arena.precio} C$`],
                [proyecto.presupuesto.presupuestoParedes.Cemento.cantidad, 'Bolsas', 'Cemento', `${proyecto.presupuesto.presupuestoParedes.Cemento.precio} C$`],
                [proyecto.presupuesto.presupuestoParedes.ladrillos.cantidad, 'Unidad', material, `${proyecto.presupuesto.presupuestoParedes.ladrillos.precio} C$`],
                ['', '', 'Total:', `${Math.ceil(proyecto.presupuesto.presupuestoParedes.ladrillos.precio + proyecto.presupuesto.presupuestoParedes.arena.precio + proyecto.presupuesto.presupuestoParedes.Cemento.precio)} C$`],
            ];
            // Configurar la tabla
            doc.autoTable({
                head: [data[0]], // Encabezado de la tabla
                body: data.slice(1), // Cuerpo de la tabla (sin el encabezado)
                startY: 1.8, // Ajustar posición vertical de inicio
                styles: { fontSize: 10, textColor: [0, 0, 0] }, // Ajustar estilo de texto
            });

            doc.setFontSize(16);
            doc.setTextColor("#4d83bc")
            doc.text(`Presupuesto Pilares`, 0.5, 3.9);
            doc.setFontSize(12);
            doc.setTextColor("#252525")
            doc.text(`Numero de Pilares: ${proyecto.presupuesto.cantidadPilares}`, 8, 3.9, {align: 'right'});
            // Encabezado de la tabla
            const headers = ["Cantidad", "Medida", "Nombre", "Precio"];

            // Cuerpo de la tabla
            const data2 = [
                [proyecto.presupuesto.presupuestoPilares.agua, "Litros", "Agua", `C$`],
                [proyecto.presupuesto.presupuestoPilares.arena.cantidad, "Latas", "Arena", `${proyecto.presupuesto.presupuestoPilares.arena.precio} C$`],
                [proyecto.presupuesto.presupuestoPilares.grava.cantidad, "Latas", "Grava", `${proyecto.presupuesto.presupuestoPilares.grava.precio} C$`],
                [proyecto.presupuesto.presupuestoPilares.cemento.cantidad, "Bolsas", "Cemento", `${proyecto.presupuesto.presupuestoPilares.cemento.precio} C$`],
                [proyecto.presupuesto.presupuestoPilares.hierroCorrugado.cantidad, "Metros Liniales", "Hierro Corrugado", `${proyecto.presupuesto.presupuestoPilares.hierroCorrugado.precio} C$`],
                [proyecto.presupuesto.presupuestoPilares.hierroLiso.cantidad, "Metros Liniales", "Hierro Liso", `${proyecto.presupuesto.presupuestoPilares.hierroLiso.precio} C$`],
                ["", "", "Total:", `${Math.ceil(proyecto.presupuesto.presupuestoPilares.grava.precio + proyecto.presupuesto.presupuestoPilares.arena.precio + proyecto.presupuesto.presupuestoPilares.cemento.precio + proyecto.presupuesto.presupuestoPilares.hierroLiso.precio + proyecto.presupuesto.presupuestoPilares.hierroCorrugado.precio)} C$`],
            ];

            // Configurar la tabla
            doc.autoTable({
                head: [headers], // Encabezado de la tabla
                body: data2, // Cuerpo de la tabla
                startY: 4, // Ajustar posición vertical de inicio
                margin: { top: 2 }, // Ajustar margen superior
                styles: { fontSize: 10, textColor: [0, 0, 0] }, // Ajustar estilo de texto
            });

            doc.setFontSize(16);
            doc.setTextColor("#4d83bc")
            doc.text(`Presupuesto Embaldosado`, 0.5, 6.7);

            const headers2 = ["Cantidad", "Medida", "Nombre", "Precio"];
            const data3 = [
                [proyecto.presupuesto.presupuestoEmbaldosado.agua, "Litros", "Agua", `C$`],
                [Math.ceil(proyecto.presupuesto.presupuestoEmbaldosado.arena.cantidad / 0.019), "Latas", "Arena", `${proyecto.presupuesto.presupuestoEmbaldosado.arena.precio} C$`],
                [Math.ceil(proyecto.presupuesto.presupuestoEmbaldosado.grava.cantidad / 0.019), "Latas", "Grava", `${proyecto.presupuesto.presupuestoEmbaldosado.grava.precio} C$`],
                [proyecto.presupuesto.presupuestoEmbaldosado.cemento.cantidad, "Bolsas", "Cemento", `${proyecto.presupuesto.presupuestoEmbaldosado.cemento.precio} C$`],
                ["", "", "Total:", `${Math.ceil(proyecto.presupuesto.presupuestoEmbaldosado.arena.precio + proyecto.presupuesto.presupuestoEmbaldosado.grava.precio + proyecto.presupuesto.presupuestoEmbaldosado.cemento.precio)} C$`],
            ];
            // Configurar la tabla
            doc.autoTable({
                head: [headers2], // Encabezado de la tabla
                body: data3, // Cuerpo de la tabla
                startY: 6.8, // Ajustar posición vertical de inicio
                margin: { top: 2 }, // Ajustar margen superior
                styles: { fontSize: 10, textColor: [0, 0, 0] }, // Ajustar estilo de texto
            });

            const headers3 = ["Presupuesto", "Total"];
            const data4 = [
                ["Paredes", Math.ceil(proyecto.presupuesto.presupuestoParedes.ladrillos.precio + proyecto.presupuesto.presupuestoParedes.arena.precio + proyecto.presupuesto.presupuestoParedes.Cemento.precio) + " C$"],
                ["Pilares", Math.ceil(proyecto.presupuesto.presupuestoPilares.grava.precio + proyecto.presupuesto.presupuestoPilares.arena.precio + proyecto.presupuesto.presupuestoPilares.cemento.precio + proyecto.presupuesto.presupuestoPilares.hierroLiso.precio + proyecto.presupuesto.presupuestoPilares.hierroCorrugado.precio) + " C$"],
                ["Embaldosado", Math.ceil(proyecto.presupuesto.presupuestoEmbaldosado.arena.precio + proyecto.presupuesto.presupuestoEmbaldosado.grava.precio + proyecto.presupuesto.presupuestoEmbaldosado.cemento.precio) + " C$"],
                ["Total", Math.ceil(proyecto.presupuesto.presupuestoParedes.ladrillos.precio + proyecto.presupuesto.presupuestoParedes.arena.precio + proyecto.presupuesto.presupuestoParedes.Cemento.precio + proyecto.presupuesto.presupuestoPilares.grava.precio + proyecto.presupuesto.presupuestoPilares.arena.precio + proyecto.presupuesto.presupuestoPilares.cemento.precio + proyecto.presupuesto.presupuestoPilares.hierroLiso.precio + proyecto.presupuesto.presupuestoPilares.hierroCorrugado.precio + proyecto.presupuesto.presupuestoEmbaldosado.arena.precio + proyecto.presupuesto.presupuestoEmbaldosado.grava.precio + proyecto.presupuesto.presupuestoEmbaldosado.cemento.precio) + " C$"],
            ];
            // Configurar la tabla
            doc.autoTable({
                head: [headers3], // Encabezado de la tabla
                body: data4, // Cuerpo de la tabla
                startY: 8.9, // Ajustar posición vertical de inicio
                // margin: { top: 2 }, // Ajustar margen superior
                styles: { fontSize: 10, textColor: [0, 0, 0] }, // Ajustar estilo de texto
            });


            doc.save(`Informe_Presupuesto_${fecha}.pdf`);
    }

    useEffect(() => {
        obtenerProyecto();
        console.log(proyect);
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
                                    <label className="form-check-label" htmlFor="pilar">
                                        Mover Pilares
                                    </label>
                                    <Checkbox
                                        cls={"form-check-input"}
                                        val={moverPared}
                                        id={"pared"}
                                        func={() => setMoverPared(!moverPared)}
                                        />
                                    <label className="form-check-label" htmlFor="pared">
                                        Mover Paredes
                                    </label>
                            </div>
                            <hr/>
                            <center>
                                <Btn2
                                    func={validar ? validarDatos : generalCP3D}
                                    tp={"button"}
                                    cls={"btn1 mt-4"}
                                    text={validar ? "Validar": "Calcular"}
                                />
                            </center>
                        </div>
                    </div>
                    <div className='presupuesto'>
                        {Object.keys(proyecto.presupuesto).length === 0 ? <h2>Presupuesto</h2> :
                        <div cont-tablas>
                            <h2>Presupuesto paredes</h2>
                            <p className='ppp'>Numero de Paredes: {proyecto.presupuesto.cantidadParedes}</p>
                            <table className="table cont-tb table-bordered">
                                <thead className="table-head">
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Medida</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoParedes.agua}</td>
                                        <td>Litros</td>
                                        <td>Agua</td>
                                        <td> C$</td>
                                    </tr>
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoParedes.arena.cantidad}</td>
                                        <td>Latas</td>
                                        <td>Arena</td>
                                        <td>{proyecto.presupuesto.presupuestoParedes.arena.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoParedes.Cemento.cantidad}</td>
                                        <td>Bolsas</td>
                                        <td>Cemento</td>
                                        <td>{proyecto.presupuesto.presupuestoParedes.Cemento.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoParedes.ladrillos.cantidad}</td>
                                        <td>Unidad</td>
                                        <td>{material}</td>
                                        <td>{proyecto.presupuesto.presupuestoParedes.ladrillos.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>Total:</td>
                                        <td>{Math.ceil(proyecto.presupuesto.presupuestoParedes.ladrillos.precio + proyecto.presupuesto.presupuestoParedes.arena.precio + proyecto.presupuesto.presupuestoParedes.Cemento.precio)} C$</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2>Presupuesto pilares</h2>
                            <p className='ppp'>Numero de Pilares: {proyecto.presupuesto.cantidadPilares}</p>
                            <table className="table cont-tb table-bordered">
                                <thead className="table-head">
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Medida</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoPilares.agua}</td>
                                        <td>Litros</td>
                                        <td>Agua</td>
                                        <td>{proyecto.presupuesto.presupuestoPilares.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoPilares.arena.cantidad}</td>
                                        <td>Latas</td>
                                        <td>Arena</td>
                                        <td>{proyecto.presupuesto.presupuestoPilares.arena.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoPilares.grava.cantidad}</td>
                                        <td>Latas</td>
                                        <td>Grava</td>
                                        <td>{proyecto.presupuesto.presupuestoPilares.grava.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoPilares.cemento.cantidad}</td>
                                        <td>Bolsas</td>
                                        <td>Cemento</td>
                                        <td>{proyecto.presupuesto.presupuestoPilares.cemento.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoPilares.hierroCorrugado.cantidad}</td>
                                        <td>Metros Liniales</td>
                                        <td>Hierro Corrugado</td>
                                        <td>{proyecto.presupuesto.presupuestoPilares.hierroCorrugado.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoPilares.hierroLiso.cantidad}</td>
                                        <td>Metros Liniales</td>
                                        <td>Hierro Liso</td>
                                        <td>{proyecto.presupuesto.presupuestoPilares.hierroLiso.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>Total:</td>
                                        <td>{Math.ceil(proyecto.presupuesto.presupuestoPilares.grava.precio + proyecto.presupuesto.presupuestoPilares.arena.precio + proyecto.presupuesto.presupuestoPilares.cemento.precio + proyecto.presupuesto.presupuestoPilares.hierroLiso.precio + proyecto.presupuesto.presupuestoPilares.hierroCorrugado.precio)} C$</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2 className='ppp'>Presupuesto Embaldosado</h2>
                            <table className="table cont-tb table-bordered">
                                <thead className="table-head">
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Medida</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoEmbaldosado.agua}</td>
                                        <td>Litros</td>
                                        <td>Agua</td>
                                        <td>{proyecto.presupuesto.presupuestoEmbaldosado.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td>{Math.ceil(proyecto.presupuesto.presupuestoEmbaldosado.arena.cantidad/0.019 )}</td>
                                        <td>Latas</td>
                                        <td>Arena</td>
                                        <td>{proyecto.presupuesto.presupuestoEmbaldosado.arena.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td>{Math.ceil(proyecto.presupuesto.presupuestoEmbaldosado.grava.cantidad/0.019)}</td>
                                        <td>Latas</td>
                                        <td>Grava</td>
                                        <td>{proyecto.presupuesto.presupuestoEmbaldosado.grava.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td>{proyecto.presupuesto.presupuestoEmbaldosado.cemento.cantidad}</td>
                                        <td>Bolsas</td>
                                        <td>Cemento</td>
                                        <td>{proyecto.presupuesto.presupuestoEmbaldosado.cemento.precio} C$</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>Total:</td>
                                        <td>{Math.ceil(proyecto.presupuesto.presupuestoEmbaldosado.arena.precio + proyecto.presupuesto.presupuestoEmbaldosado.grava.precio + proyecto.presupuesto.presupuestoEmbaldosado.cemento.precio)} C$</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2>Total Presupuesto</h2>
                            <table className="table cont-tb table-bordered">
                                <thead className="table-head">
                                    <tr>
                                        <th>Presupuesto</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>Paredes</td>
                                        <td>{Math.ceil(proyecto.presupuesto.presupuestoParedes.ladrillos.precio + proyecto.presupuesto.presupuestoParedes.arena.precio + proyecto.presupuesto.presupuestoParedes.Cemento.precio)} C$</td>
                                    </tr>
                                    <tr>
                                        <td>Pilares</td>
                                        <td>{Math.ceil(proyecto.presupuesto.presupuestoPilares.grava.precio + proyecto.presupuesto.presupuestoPilares.arena.precio + proyecto.presupuesto.presupuestoPilares.cemento.precio + proyecto.presupuesto.presupuestoPilares.hierroLiso.precio + proyecto.presupuesto.presupuestoPilares.hierroCorrugado.precio)} C$</td>
                                    </tr>
                                    <tr>
                                        <td>Embaldosado</td>
                                        <td>{Math.ceil(proyecto.presupuesto.presupuestoEmbaldosado.arena.precio + proyecto.presupuesto.presupuestoEmbaldosado.grava.precio + proyecto.presupuesto.presupuestoEmbaldosado.cemento.precio)} C$</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{Math.ceil(proyecto.presupuesto.presupuestoParedes.ladrillos.precio + proyecto.presupuesto.presupuestoParedes.arena.precio + proyecto.presupuesto.presupuestoParedes.Cemento.precio + proyecto.presupuesto.presupuestoPilares.grava.precio + proyecto.presupuesto.presupuestoPilares.arena.precio + proyecto.presupuesto.presupuestoPilares.cemento.precio + proyecto.presupuesto.presupuestoPilares.hierroLiso.precio + proyecto.presupuesto.presupuestoPilares.hierroCorrugado.precio + proyecto.presupuesto.presupuestoEmbaldosado.arena.precio + proyecto.presupuesto.presupuestoEmbaldosado.grava.precio + proyecto.presupuesto.presupuestoEmbaldosado.cemento.precio)} C$</td>
                                    </tr>
                                </tbody>
                            </table>
                            <center>
                                <Btn2
                                    func={generalPDF}
                                    tp={"button"}
                                    cls={"btn1 mt-4"}
                                    text={"General Informe Pdf"}
                                />
                            </center>
                        </div>
                        }
                    </div>
                    <div className='lienzo'>
                        <h2>Renderizado 3D</h2>
                        {Object.keys(proyecto.construccion).length === 0 ? <h2>3D</h2> :
                            <Esquema className="esquema" contruccion={proyecto.construccion}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Contruccion;