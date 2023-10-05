import React from 'react';
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

var ben = [0,23,56,78];
var mes = ['enero', 'mayo', 'agosto', 'dicimebre'];

var midata = {
    labels: mes,
    datasets: [
        {
            label: 'benefciones',
            data: ben,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgb(255, 99, 132)',
            PointBackgroundColor: 'rgb(255, 99, 132)',
        },
    ],
};

var mioptions = {
    scales: {
        y: {
            min: 0
        },
        x: {
            ticks: { color: 'pink'}
        }
    },
    plugins: {
        legend:{
            display: true
        }
    }
}

export default function GraficoLine(){
    return <Line data={midata} options={mioptions}/>
}