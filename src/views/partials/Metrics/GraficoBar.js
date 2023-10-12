import React from 'react';
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

var ben = [2,23,56,78];
var mes = ['enero', 'mayo', 'agosto', 'dicimebre'];

var mioptions = {
    responsive: true,
    Animation: true,
    scales: {
        y: {
            min: 0,
            max: 100
        },
        x: {
            ticks: { color: 'rgba(0, 220, 195)'}
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
            label: 'benefciones',
            data: ben,
            tension: 0.5,
            backgroundColor: 'rgba(0, 220, 195)',
        },
    ],
};

export default function GraficoBar() {
    return <Bar options={mioptions} data={midata}/>
}