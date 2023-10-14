import modalHTML from './render-modal.html?raw';
import './render-modal.css'
import { User } from '../../models/user';
import { getUserById } from '../../use-cases/get-user-by-id';

let modal, form;
let loadedUser;

/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async(id) => {

    modal?.classList.remove('hide-modal');
    //Comprobacion de si existe o no el id, si no existe no hacemos nada
    if (!id) return;
    //De lo contario mandamos a llamar a nuestro await getUserById..
    const user = await getUserById(id)

} 
export const hideModal = () => {

    modal?.classList.add('hide-modal');
    // Reset del formulario 
    form?.reset();
    
}
/**
 * 
 * @param {User} user 
 */
const setFormValues = (user) => {

}

/**
 * 
 * @param {HTMLDivElement} elment 
 * @param {(userLike)=> promise<void>} callback
 */
export const renderModal = (element, callback) => {
    //comprueda si existe.. 
    if (modal) return;
    //si no existe se contruye todo..
    modal = document.createElement('div');
    //le pasamos el html de nuestroa archivo
    modal.innerHTML = modalHTML;
    //creamos las clases
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector('form');

    modal.addEventListener('click', (evento) => {
        if(evento.target.className === 'modal-container') {
            hideModal();
        }
    });

    form.addEventListener('submit', async(evento) => {
        evento.preventDefault();
        //capturamos la informacion del formulario
        const formData = new FormData(form);
        const userLike = {};
        
        if(!formData.get('isActive')){
            formData.append('isActive', 'off')
        }
        //iteramos y baremos el formulario para obtener key y value
        for (const [key, value] of formData) {
            //hacemos la comprobacion de balance
            if(key === 'balance') {
                //Convertimos el valor de balance a numero
                userLike[key] = +value;
                continue;
            }
            //comprobamos si el key es isActive
            if(key === 'isActive'){
                /*tomamos su informacion y le preguntamos que si su valor es on, 
                entonces es true y si no es on entonces es false*/
                userLike[key] = (value === 'on') ? true:false;
                continue;
            }
            userLike[key] =  value;
        }

        // console.log(userLike);
        await callback(userLike)

        hideModal();

    })

    element.append(modal)
}

