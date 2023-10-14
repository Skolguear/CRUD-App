import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import {User} from '../models/user';

// Recibe el constructor la clase user de nuestro model
/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async(userLike) => {
    //Hacemos una instancia de la informacion que recibimos
    const user = new User( userLike );
    //Validacion para evitar enviar informacion vacia en el modal
    if(!user.firstName ||  user.lastName )
        throw 'First & Last name are required';
    //conversion de la instancia que contiene el mapper como lo pide el backend
    const userToSave = userModelToLocalhost(user)
    //Valida si el id existe, entonces no se implementa nada
    if (user.id) {
        throw 'No implementada la actualizacion'
        return;
    }
    const updateUser = await createUser(userToSave);
    return updateUser;
}
//Crear nuevo usuario
/**
 * @param {Like<User>} user
 */
const createUser = async( user ) => {
    
    //Interpolamos el url con que vamos a trabajar la base del url esta en nuestro archivo env y solo tomamos el path
    const url = `${import.meta.env.VITE_BASE_URL}/users`;

    //Respues es igual al await de fetch, le pasamos el url y pasamos la configuracion para postear
    const res = await fetch(url,{
        //metodo post de posteo
        method: 'POST',
        //Serializacion como formato string
        body: JSON.stringify(user),
        //header espera el contenido en formato json
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const newUser = await res.json();
    console.log({newUser});
    return newUser;
}