import './render-button.css';
import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/render-table';


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = (element) => {

    
    const nextButton = document.createElement('button');
    nextButton.innerText = ' Next >';
    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev '

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';

    currentPageLabel.innerText = usersStore.getCurrentPage();

    element.append(prevButton, currentPageLabel, nextButton );

    //Evento nextpage
    nextButton.addEventListener('click', async() => {
        //Await de la funcion que carga la siguiente pagina
        await usersStore.loadNexPage();
        //pasamos el valos actual del getCurrentPage para mostar el numero en la pagina
        currentPageLabel.innerText = usersStore.getCurrentPage();
        //renderizamos nuevamente la tabla cargando cargando la informacion
        renderTable(element);
    })
    //Evento prevbutton
    prevButton.addEventListener('click', async() => {

        await usersStore.loadPreviusPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable(element)
    })
} 