import usersStore from '../../store/users-store'
import './render-table.css';


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


const tableSelectListener = (event) => {
    console.log(element.target);
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
        table.addEventListener('click', event => tableSelectListener(event))
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