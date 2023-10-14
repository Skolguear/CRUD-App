import { loadUsersByPage } from "../use-cases/load-users-by-page";

//Objeto literal con los usuarios que se añadan y el valor inicial de la pagina.
const state = {
    currentPage: 0,
    users: [],
} 
//Carga la siguiente pagina
const loadNexPage = async() => {
    //Intenta cargar la pagina y si hay registros  carca la pagina.. y si no
    const users = await loadUsersByPage( state.currentPage + 1);
    //si no hay nada se sale de la funcion
    if (users.length === 0) return;
    //Si encuentra carga la pagina siguiente
    state.currentPage += 1;
    //y establece los usuarios
    state.users = users;
}
//Carga la pagina previa
const loadPreviusPage = async() => {
    if(state.currentPage === 1) return;
    const users = await loadUsersByPage( state.currentPage - 1);
    state.users = users;
    state.currentPage -= 1;
    
}
//Cuando cambia la informacion de un usuario
const onUserChanged = async() => {
    throw new Error('No implementado');
}
//recarga la pagina
const reloadPage = async() => {
    throw new Error('No implementado');
}

//Exportacion de nuestras funciones 
export default {
    loadNexPage,
    loadPreviusPage,
    onUserChanged,
    reloadPage,
    
//acceso por fuera a la pagina y a los usuarios
    /**
     * @returns {User[]}
     */
    getUsers: () => [...state.users], //los objetos pasan por referencia
    /**
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage, //los primitivos pasan por valor
}