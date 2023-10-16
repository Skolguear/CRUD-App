import './render-table.css';
import { deleteUserById } from '../../use-cases/delete-user-by-id';
import {showModal} from '../render-modal/render-modal';
import usersStore from '../../store/users-store';


let table;

//Crea la estructura de la tabla en el HTML
const createTable = () => {
    const table =  document.createElement('table');//Crea la tabla
    const tableHeaders = document.createElement('thead');//Cabezera de la tabla

    //crea la estructura html de la tabla
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;
    //Cuerpo de la tabla
    const tableBody = document.createElement('tbody');
    //Inserta el header y el cuerpo de la tabla
    table.append(tableHeaders, tableBody);
    return table;
}

/**
 * 
 * @param {MauseEvent} event 
 */
const tableSelectListener = (event) => {
    
    const element = event.target.closest('.select-user');
    if(!element) return;
    
    const id = element.getAttribute('data-id');
    showModal(id)
}

/**
 * 
 * @param {MauseEvent} event 
 */
const tableDeleteListener = async(event) => {
    
    const element = event.target.closest('.delete-user');
    if(!element) return;
    const id = element.getAttribute('data-id');

    try {
        await deleteUserById(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar')
    }
    
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {

    const users = usersStore.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);

        //TODO listeners a la table como escuchar eventos de click
        table.addEventListener('click', tableSelectListener)
    }
    let tableHTML;

    users.forEach( user => {
        tableHTML += `
            <tr>
                <td>${ user.id }</td>
                <td>${ user.balance }</td>
                <td>${ user.firstName }</td>
                <td>${ user.lastName  }</td>
                <td>${ user.isActive   }</td>
                <td>
                    <a href="#/" class="select-user" data-id="${ user.id }">Select</a>
                |
                    <a href="#/" class="delete-user" data-id="${ user.id }">Delete</a>
                </td>
            </tr>
        
        `
        table.querySelector('tbody').innerHTML = tableHTML;
    })
}