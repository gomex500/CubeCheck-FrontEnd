export const user = {
    'email':'gomex6798@gmail.com',
    'password':'FREDDYGOMEZ@500'
};

export const validarDatos = (user) =>{
    if (user.email !== '' && user.password !== '') {
        if (user.password.length < 8){
            return false;
        }
        return true;
    } else {
        return false;
    }
}