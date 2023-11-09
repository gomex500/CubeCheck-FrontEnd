import React, {useState, useEffect} from "react";
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import { configApi } from "../../../apis/configApi";

ChartJs.register(ArcElement, Tooltip, Legend);

var mioptions = {
    responsive: true,
    maintainAspectRatio: false,
};
export default function GraficoPaste(){
    
    const [nuser, setNuser] = useState({
        "user": 10,
        "admin": 20,
        "premium": 5
    });

    var midata = {
        labels: ['User', 'Premium', 'Admin'],
        datasets: [
            {
                label: 'Cantidad de Usuarios',
                data: [nuser.user,nuser.premium,nuser.admin],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 286, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 286, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const obtenerNUser = async () =>{
        const datos = localStorage.getItem('data');
        if (datos) {
            const dato = JSON.parse(datos);
            const config = {
                headers: {
                  Authorization: `Bearer ${dato.token}`,
                },
            }
            const {data} = await configApi('/nusers', config);
            setNuser(data);
        } else {
            console.log('error');
        }
    }

    useEffect(() => {
      obtenerNUser();
    }, [])
    

    return <Pie data={midata} options={mioptions}/>
}