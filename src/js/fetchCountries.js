import axios from 'axios';
import debounce from 'lodash.debounce'
const refs = {
  input: document.querySelector('#search')
}
export function fetchCountries(e) {
  e.preventDefault();
  const name = refs.input.value;
  // axios.get always brings Object
axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(result => console.log(result))
    .catch(err => console.log(err))
}

// export const searchQuery = 0;
refs.input.addEventListener('input', debounce(fetchCountries, 500))