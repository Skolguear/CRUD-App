


//Carga los usuarios por pagina traidos por la API

import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";
/**
 * 
 * @param {String|Number} id
 * @returns {Promise<User>}
 */

export const getUserById = async(id) => {

    //Creamos el url exportantando la base del url con la variable de entonor y extrapolando el page
    const url = `${ import.meta.env.VITE_BASE_URL }/users/${id}`;
    //Fetch con el cual hacemos la peticion a la API
    const res = await fetch(url)
    //y con eso traemos el json de los datos la misma api
    const data = await res.json()
    //Permite cambiar los valores de la data con ayuda del mapper
    const user = localhostUserToModel(data);

    return user;

}

