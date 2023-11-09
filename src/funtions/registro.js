export const validarDatos = (user, passwordN) => {
    if (
        user.nombre === '' ||
        user.apellido === '' ||
        user.edad === '' ||
        user.telefono === '' ||
        user.email === '' ||
        user.password === ''
    ) {
        return false;
    }else if (user.password.length < 8){
        return false;
    }else if(user.edad < 15){
        return false;
    }else if (passwordN === user.password) {
        return true;
    } else {
        return false;
    }
}