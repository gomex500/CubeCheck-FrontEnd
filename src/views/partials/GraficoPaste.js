import React from "react";
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJs.register(ArcElement, Tooltip, Legend);

var mioptions = {
    responsive: true,
    maintainAspectRatio: false,
};

var midata = {
    labels: ['Pared', 'Pilar', 'Embaldosado', 'Losa'],
    datasets: [
        {
            label: 'Popularidad en Navidad',
            data: [35,28,15,18],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 286, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 286, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export default function GraficoPaste(){
    return <Pie data={midata} options={mioptions}/>
}