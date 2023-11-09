import { ingresarMate, validarDatos } from '../funtions/agregarMaterial';  // Reemplaza 'tuArchivoConIngresarMate' con la ruta correcta
import { configApi } from '../apis/configApi';  // Asegúrate de importar la configuración correcta de configApi

jest.mock('../apis/configApi');

// Mockear la función configApi.post para simular su comportamiento
jest.mock('../apis/configApi', () => {
  return {
    configApi: {
      post: jest.fn()
    }
  };
});

describe('Ingresar material', () => {
    it('debería retornar true si los datos son válidos', () => {
        const datosValidos = {
          nombre: 'Ejemplo',
          marca: 'Marca',
          tipo: 'Tipo',
          medida: 'Medida',
          cantidad: 5,
          precio: 10,
          description: 'Descripción válida',
        };
    
        const resultado = validarDatos(datosValidos);
        expect(resultado).toBe(true);
      });
    
      it('debería retornar false si algún dato es inválido', () => {
        const datosInvalidos = {
          nombre: '',  // Nombre vacío
          marca: 'Marca',
          tipo: 'Tipo',
          medida: 'Medida',
          cantidad: 5,
          precio: 0,   // Precio no válido
          description: 'Descripción válida',
        };
    
        const resultado = validarDatos(datosInvalidos);
        expect(resultado).toBe(false);
      });
  it('debería ingresar un material correctamente', async () => {
    // Mockear la respuesta exitosa de configApi.post
    const respuestaExitosa = { data: 'Material ingresado correctamente' };
    configApi.post.mockResolvedValue(respuestaExitosa);

    const mate = {
        "nombre": "Hierro liso 1/4",
        "marca": "Liso",
        "tipo": "Hierro",
        "medida":"mt",
        "cantidad": 6,
        "precio": 79.84,
        "description" : "El cemento es un material fundamental en la construcción y es ampliamente utilizado en una variedad de aplicaciones. Existen varios tipos de cemento, pero el más comúnmente empleado en la construcción es el cemento Portland, que es un componente clave en la fabricación de hormigón y mortero. Aquí tienes información sobre el cemento en la construcción"
    };

    const result = await ingresarMate(mate);

    expect(result).toBe(respuestaExitosa.data);
  });

  it('debería manejar un error correctamente', async () => {
    // Mockear un error al realizar la petición
    const error = new Error('Error al ingresar el material');
    configApi.post.mockRejectedValue(error);

    const mate = {
        "nombre": "Hierro liso 1/4",
        "marca": "Liso",
        "tipo": "Hierro",
        "medida":"mt",
        "cantidad": 6,
        "precio": 79.84,
        "description" : "El cemento es un material fundamental en la construcción y es ampliamente utilizado en una variedad de aplicaciones. Existen varios tipos de cemento, pero el más comúnmente empleado en la construcción es el cemento Portland, que es un componente clave en la fabricación de hormigón y mortero. Aquí tienes información sobre el cemento en la construcción"
    };

    const result = await ingresarMate(mate);

    expect(result).toBe(false);
  });
});
