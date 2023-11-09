export const CalcularPerimetro = (lados) =>{
    if (lados.length > 2) {
      let suma = 0;
      for (let i = 0; i < lados.length; i++) {
          suma += lados[i];
      }
      return suma;
    } else {
      return 0;
    }
}