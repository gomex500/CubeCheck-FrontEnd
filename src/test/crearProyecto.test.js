import { configApi } from '../apis/configApi';
import { crearProyecto } from '../funtions/proyecto'; // Asegúrate de importar la función desde el archivo adecuado

jest.mock('../apis/configApi'); // Simula configApi

describe('Pruebas para crearProyecto', () => {

    afterEach(() => {
        jest.clearAllMocks();
      });

  it('debería crear un proyecto exitosamente', async () => {
    
    const proyecto = {
        "nombre": "Nombre del proyecto",
        "description": "Descripción del proyecto",
        "construccion": {}
    };
    const response = {
        "id": "6549c25a988e409d5e613771"
      };

    configApi.post = jest.fn().mockResolvedValue(response);

    const result = await crearProyecto(proyecto);

    expect(result).toEqual(response.data);
    // Verificar que configApi.post se llamó con los parámetros esperados
    expect(configApi.post).toHaveBeenCalledWith('/proyectos', proyecto, expect.any(Object));
  });
  it('debería manejar un error de solicitud correctamente', async () => {
    const proyecto = {
      nombre: 'Nombre del proyecto',
      description: 'Descripción del proyecto',
      construccion: {},
    };

    const error = new Error('Error de petición');

    // Mock de la función configApi.post para que falle
    configApi.post = jest.fn().mockRejectedValue(error);

    const result = await crearProyecto(proyecto) ? true : false;
    
    // Verificar que la función devuelva false en caso de error
    expect(result).toBe(false);
  });
});