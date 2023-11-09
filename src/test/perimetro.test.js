import {CalcularPerimetro} from '../funtions/perimetro'

describe('CalcularPerimetro', () => {
  it('debería calcular el perímetro correctamente', () => {
    const lados = [5, 6, 7, 8];
    const resultado = CalcularPerimetro(lados);
    expect(resultado).toBe(26);
  });

  it('debería devolver 0 si hay menos de 3 lados', () => {
    const lados = [4, 5];
    const resultado = CalcularPerimetro(lados);
    expect(resultado).toBe(0);
  });
});