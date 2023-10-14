

//Carga los usuarios por pagina traidos por la API

import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";
/**
 * 
 * @param {Number} page
 * @returns {Promise<User[]>}
 */

export const loadUsersByPage = async(page = 1) => {

    //Creamos el url exportantando la base del url con la variable de entonor y extrapolando el page
    const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${page}`;
    //Fetch con el cual hacemos la peticion a la API
    const res = await fetch(url)
    //y con eso traemos el json de los datos la misma api
    const data = await res.json()
    //Permite cambiar los valores de la data con ayuda del mapper
    const users = data.map( localhostUserToModel);

    return users;

}

