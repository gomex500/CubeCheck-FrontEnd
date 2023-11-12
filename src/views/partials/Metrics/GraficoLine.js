import React, {useState, useEffect} from 'react';
import { configApi } from "../../../apis/configApi";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler } from 'chart.js';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


export default function GraficoLine(){

    const [tools, setTools] = useState({
        "perimetro": 0,
        "area": 0,
        "volumen": 0,
        "conversion": 0,
        "pared": 0,
        "pilar": 0,
        "embaldosado": 0,
        "loza": 0,
        "proyecto": 0,
        "materiales": 0,
        "chatbot": 0
      }
      );

    var ben = [
        tools.perimetro,
        tools.area,
        tools.volumen,
        tools.conversion,
        tools.pared,
        tools.pilar,
        tools.embaldosado,
        tools.loza,
        tools.proyecto,
        tools.materiales,
        tools.chatbot
    ];

    var mes = ['Perimetro', 'Area', 'Volumen', 'Convercion', 'Pared', 'Pilar', 'Embaldosado', 'Loza', 'Proyecto', 'Materiales','ChatBot'];
    
    var midata = {
        labels: mes,
        datasets: [
            {
                label: 'Herramientas CubeCheck',
                data: ben,
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgb(54, 162, 235)',
                PointBackgroundColor: 'rgb(54, 162, 235)',
            },
        ],
    };
    
    var mioptions = {
        scales: {
            y: {
                min: 0
            },
            x: {
                ticks: { color: 'rgba(54, 162, 235)'}
            }
        },
        plugins: {
            legend:{
                display: true
            }
        }
    }

    const obtenerTools = async () =>{
        const {data} = await configApi('/tools');
        setTools(data[0]);
    }

    useEffect(() => {
      obtenerTools();
    }, [])
    

    return <Line data={midata} options={mioptions}/>
}