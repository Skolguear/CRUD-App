
/**
 * @returns {Promise<object>} quote information
 */
const fetchQuote = async() => {
    
    const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes/1');
    const data = await res.json();
    
    console.log(data[0]);
    return data[0];
};
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async(element) => {

    //Titulo en el Html
    document.querySelector('#app-title').innerHTML = 'BreakingBad App';
    //Muestra que algo esta ocurriendo..
    element.innerHTML = 'Loading...';
    //Carga la informacion de la api
    fetchQuote();
    //Creamos las etiquetas html
    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    //Le ponemos texto a los elementos del html
    nextQuoteButton.innerText = 'Next Quote';


    //renderiza la informacion en el html que traemos de la API
    const renderQuote = (data) => {
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author;
        //el replaceChildren remplaza todos los elementos por los nuevos.
        element.replaceChildren(quoteLabel, authorLabel, nextQuoteButton)
    }
    //Evento del boton next(siguiente)
    nextQuoteButton.addEventListener('click', async() => {
        //recarga la pagina muestra la pagina siguiente
        element.innerHTML = 'Loading...';
        //Constate que almacena la API al ser una await debemos colococar el async
        const quote = await fetchQuote();
        renderQuote(quote);
    })
    //Pides la solicitud de la API
    fetchQuote()
            .then(renderQuote)//Entonces si se cumple, renderizamos
}

