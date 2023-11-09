import { cambiarR } from '../funtions/cambiarRol'; // Asegúrate de que la ruta de importación sea la correcta
import {configApi} from '../apis/configApi'; // Asegúrate de importar configApi de la ubicación correcta

jest.mock('../apis/configApi'); // Simula configApi

describe('Pruebas para cambiar rol de un usuario', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería cambiar el rol a "admin" si el rol actual es "user"', async () => {
    const id = '123'; // ID de usuario
    const rol = 'user';
    const response = { data: 'Rol cambiado a admin' };

    // Simular una respuesta exitosa de la API
    configApi.put = jest.fn().mockResolvedValue(response);

    const result = await cambiarR(id, rol);

    expect(result).toEqual(response.data);
    expect(configApi.put).toHaveBeenCalledWith(`/rol/${id}`, { rol: 'admin' }, expect.any(Object));
  });

  it('debería cambiar el rol a "user" si el rol actual no es "admin"', async () => {
    const id = '456'; // ID de usuario
    const rol = 'admin';
    const response = { data: 'Rol cambiado a user' };

    // Simular una respuesta exitosa de la API
    configApi.put = jest.fn().mockResolvedValue(response);

    const result = await cambiarR(id, rol);

    expect(result).toEqual(response.data);
    expect(configApi.put).toHaveBeenCalledWith(`/rol/${id}`, { rol: 'user' }, expect.any(Object));
  });

  it('debería manejo de error correctamente', async () => {
    const id = '789'; // ID de usuario
    const rol = 'user';
    const error = new Error('Error al cambiar el rol');

    // Simular un error en la respuesta de la API
    configApi.put = jest.fn().mockRejectedValue(error);

    try {
      await cambiarR(id, rol);
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
