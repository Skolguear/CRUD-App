import { renderAddButton } from './presentation/render-add-button/render-add-button';
import { renderButtons } from './presentation/render-button/render-button';
import { renderModal } from './presentation/render-modal/render-modal';
import { renderTable } from './presentation/render-table/render-table';
import usersStore from './store/users-store';
import { saveUser } from './use-cases/save-user';

/**
 * 
 * @param {HTMLDivElement} element 
 */
//Funcion que ejecuta lo que vamos a observar en la pagina web
export const UsersApp = async( element ) => {

    element.innerHTML = 'Loading...';
    await usersStore.loadNexPage();
    element.innerHTML = ' ';
    //render de la tabla
    renderTable(element);
    //render de los botones y pagina
    renderButtons(element);
    //Render boton flotante
    renderAddButton(element)
    //Render del modal
    renderModal(element, async(userLike) => {
        const user = await saveUser(userLike);
        usersStore.onUserChanged(user);
        renderTable();

    } )
}