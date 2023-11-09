import { validarDatos } from '../funtions/registro';

describe('Pruebas para validarDatos', () => {
  it('debería devolver true para datos válidos', () => {
    const user = {
        "nombre": "freddy",
        "apellido": "gomez",
        "edad": 25,
        "telefono": "2354665758",
        "email": "gomex6798@gmail.com",
        "password": "FREDDYGOMEZ@500"
    }
    const passwordN = "FREDDYGOMEZ@500";
    const result = validarDatos(user, passwordN);
    expect(result).toBe(true);
  });

  it('debería devolver false si algún campo está vacío', () => {
    const user = {
        "nombre": "",
        "apellido": "",
        "edad": 0,
        "telefono": "",
        "email": "",
        "password": ""
    }
    const result = validarDatos(user);
    expect(result).toBe(false);
  });

  it('debería devolver false si la edad es menor de 15', () => {
    const user = {
        "nombre": "freddy",
        "apellido": "gomez",
        "edad": 14,
        "telefono": "2354665758",
        "email": "gomex6798@gmail.com",
        "password": "FREDDYGOMEZ@500"
    }
    const result = validarDatos(user);
    expect(result).toBe(false);
  });

  it('debería devolver false si la contraseña no coincide', () => {
    const user = {
        "nombre": "freddy",
        "apellido": "gomez",
        "edad": 25,
        "telefono": "2354665758",
        "email": "gomex6798@gmail.com",
        "password": "FREDDYGOMEZ@500"
    }

    const passwordN = "FREDDYGOMEZ@";
    const result = validarDatos(user, passwordN);
    expect(result).toBe(false);
  });
});
