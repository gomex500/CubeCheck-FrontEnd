import axios from "axios";

export const generarP = (data) => {
  return axios.post('https://cubecheck.onrender.com/calculoPared', data)
    .then(response => {
      return response.data; // Retorna los datos de la respuesta
    })
    .catch(error => {
      throw error; // Lanza el error para que sea manejado
    });
}