import React, {useState, useEffect} from 'react';
import { configApi } from "../../../apis/configApi";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend} from 'chart.js';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function GraficoBar() {
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

    var mioptions = {
        responsive: true,
        Animation: true,
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

    var midata = {
        labels: mes,
        datasets: [
            {
                label: 'Numero de usos',
                data: ben,
                tension: 0.5,
                backgroundColor: 'rgb(54, 162, 235)',
            },
        ],
    };

    const obtenerTools = async () =>{
        const {data} = await configApi('/tools');
        setTools(data[0]);
    }

    useEffect(() => {
      obtenerTools();
    }, [])

    return <Bar options={mioptions} data={midata}/>
}