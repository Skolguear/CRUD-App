import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import {User} from '../models/user';

// Recibe el constructor la clase user de nuestro model
/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async(userLike) => {
    
    const user = new User( userLike );

    if(!user.firstName ||  !user.lastName )
        throw 'First & Last name are required';
    
        
    const userToSave = userModelToLocalhost(user);
    let userUpdated;
    
    if (user.id) {
        userUpdated = await updateUser(userToSave);
        
    } else {
        userUpdated = await createUser(userToSave);
    }

    return userModelToLocalhost( userUpdated );

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
//Actualizar informacion 
/**
 * @param {Like<User>} user
 */
const updateUser = async( user ) => {
    
    //par actualizar se añadio el user.id al url
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;

    //Respues es igual al await de fetch, le pasamos el url y pasamos la configuracion para postear
    const res = await fetch(url,{
        //metodo PATCH par actualizar
        method: 'PATCH',
        //Serializacion como formato string
        body: JSON.stringify(user),
        //header espera el contenido en formato json
        headers: {
            'Content-Type': 'application/json'
        }
    })
    //Se cambio los nombres para hacer referencia a actualizar usuario
    const updateUser = await res.json();
    console.log({updateUser});
    return updateUser;
}