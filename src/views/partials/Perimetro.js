import React, { useState } from "react";
import Input from "../../components/Input";
import Btn2 from "../../components/Btn2";
import Swal from "sweetalert2";
import '../../css/Perimetro.css';

const Perimetro = () => {
  const [lados, setLados] = useState([]);
  const [lado, setLado] = useState(0);
  const [resultado, setResultado] = useState(0);

  const IngresarLados = () => {
    if (lado > 0) {
        const aux = [...lados];
        aux.push(lado);
        setLado(0);
        setLados(aux);
    } else {
        alertas('error','campos vacio');
    }
  };

    const alertas = (icono, texto) =>{
        Swal.fire({
            // position: 'top-end',
            icon: icono,
            title: texto,
            showConfirmButton: false,
            timer: 1500
        })
    }

  const eliminarLado = (i) => {
    const aux1 = [...lados];
    aux1.splice(i, 1);
    setLados(aux1);
    alertas('success','Lado Eliminado');
  };

  const eliminarLados = () =>{
    setLados([]);
    setLado(0);
    setResultado(0);
    alertas('success','Lados Eliminados');
  }

  const CalcularPerimetro = () =>{
      if (lados.length > 2) {
        let suma = 0;
        for (let i = 0; i < lados.length; i++) {
            suma += lados[i];
        }
        setResultado(suma);
        alertas('success',`Perimetro es: ${suma}`);
      } else {
        alertas('error','Faltas datos');
      }
  }

  return (
    <div className="contP animate__animated animate__fadeInUp row">
      <div className="contF col-md-6">
        <div className="contI3">
          <label htmlFor="lado">Ingrese Lado:</label>
          <Input
            tp={"number"}
            cls={"input1"}
            ph={"Lado"}
            nm={"lado"}
            val={lado}
            fuc={(e) => setLado(parseInt(e.target.value))}
          />
        </div>
        <div className="contBP">
          <Btn2 text={<i class="fa-solid fa-circle-plus"></i>} cls={"btn1"} func={IngresarLados} />
          <Btn2 text={<i class="fa-solid fa-delete-left"></i>} cls={"btn2"} func={eliminarLados} />
          <Btn2 text={"Calcular"} cls={"btn3"} func={CalcularPerimetro} />
        </div>
        <div className="contR">
            <p>Perimetro es: {resultado}</p>
        </div>
      </div>
      <div className="lados col-md-6">
        {lados.length > 0 ? (
          lados.map((l, i) => (
            <div key={i}>
              <h3 className="l">{l}</h3>
              <Btn2
                tp={"buttom"}
                text={<i className="fa-solid fa-trash"></i>}
                cls={"btn1"}
                func={() => eliminarLado(i)}
              />
            </div>
          ))
        ) : (
          <h3>No hay datos</h3>
        )}
      </div>
    </div>
  );
};

export default Perimetro;
