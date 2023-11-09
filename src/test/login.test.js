import { user, validarDatos } from '../funtions/login';

describe('Pruebas para validacion de Login', () => {

  it('validarDatos debe retornar true para datos válidos', () => {
    const result = validarDatos(user);
    expect(result).toBe(true);
  });

  it('validarDatos debe retornar false para datos inválidos', () => {
    const invalidUser = {
      email: '',
      password: 'short',
    };

    const result = validarDatos(invalidUser);
    expect(result).toBe(false);
  });
});
