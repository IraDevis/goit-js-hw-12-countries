import './sass/main.scss';
import { debounce } from 'lodash';
import listMarkUp from './templates/list-template.hbs';
import cardMarkup from './templates/card-template.hbs';

const refs = {
    input: document.querySelector('.js-search-input'),
    searchResult: document.querySelector('.search-result-container')
}

refs.input.addEventListener('input', debounce(onSearch, 500))

function onSearch(e) {
    const searchQuery = e.target.value
    fetchCountry(searchQuery)
        .then(renderCountryCard)
        .catch(error => error)
}

function fetchCountry(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
  return fetch(url).then(response => response.json());
}

function renderCountryCard(country) {
    refs.searchResult.innerHTML = cardMarkup(country);
}

function renderCountryList(countries) {
    refs.searchResult.innerHTML = listMarkUp(countries);
}