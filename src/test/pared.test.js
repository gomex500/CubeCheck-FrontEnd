import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { generarP } from '../funtions/calcularPared'; // Asegúrate de importar la función desde el archivo adecuado

describe('Pruebas para presupuesto de una Pared', () => {
  const axiosMock = new MockAdapter(axios);
  afterEach(() => {
    axiosMock.reset();
  });

  it('debería generar un presupuesto exitosamente', async () => {
    const data = {
        "base": 4,
        "altura": 4,
        "material": "Ladrillo"
    };

    const responseData = {
        "Agua": 39.41,
        "Arena": {
          "cantidad": 0.2,
          "precio": 80.0
        },
        "Cemento": {
          "cantidad": 52.07,
          "precio": 380.11
        },
        "Ladrillos": {
          "cantidad": 1509,
          "precio": 30180
        }
      };

    axiosMock.onPost('https://cubecheck.onrender.com/calculoPared', data).reply(200, responseData);

    const response = await generarP(data);

    expect(response).toEqual(responseData);
  });

  it('debería manejar un error correctamente', async () => {
    const data = {
      "base": 4,
      "altura": 4
    };

    axiosMock.onPost('https://cubecheck.onrender.com/calculoPared', data).reply(500);

    try {
      const response = await generarP(data);

      // Asegurarse de que no se llegue aquí en caso de éxito
      expect(response.status).toBeUndefined();
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });
});
