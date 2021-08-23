import './sass/main.scss';
import axios from 'axios';
import debounce from 'lodash.debounce';
import country from './templates/country.hbs';
import list from './templates/list.hbs';
import { alert, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';


const refs = {
  input: document.querySelector('#search'),
  container: document.querySelector('div')
}

refs.input.addEventListener('input', debounce(fetchCountries, 500))

function fetchCountries(e) {
  e.preventDefault();
  refs.container.innerHTML = '';

  const name = refs.input.value;
  // axios.get always brings Object
  axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(result => renderResult(result.data))
    .catch(err => (error({ text: "Type in a new query" }), console.log(err)))
}

function renderResult(arr) {

  if (arr.length > 10) {
alert({ text: "Could you specify the request?"});
  }

  if (arr.length === 1) {
    buildMarkup(arr, country);
    success({ text: "The country was found!"});
      console.log(arr); 
  }

  else if (arr.length > 1 && arr.length <= 10) {
    buildMarkup(arr, list);
    console.log(arr);
  }

}

function buildMarkup(arr, template) {
  const markup = arr.map(el => template(el)).join('');
  refs.container.insertAdjacentHTML('afterbegin', markup)
}





