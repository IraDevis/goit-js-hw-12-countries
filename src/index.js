import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import { debounce } from 'lodash';
import listMarkUp from './templates/list-template.hbs';
import cardMarkup from './templates/card-template.hbs';
import API from './js/api-sevices';
import getRefs from './js/get-refs';

const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    refs.searchResult.innerHTML = '';
    const searchQuery = e.target.value;
    API.fetchCountry(searchQuery)
       .then(searchCheck)
       .catch(onFetchError);
};

function searchCheck(countries) {
    if (countries.length === 1) {
        renderCountryCard(countries);
        return;
    };
            
    if (countries.length <= 10 && countries.length > 1) {
        renderCountryList(countries);
        return;
    };

    if (countries.length > 10) {
        error({
            text: "Too many matches found. Please enter a more specific query!",
            hide: true,
            delay: 1000,
            sticker: false,
            closer: true,
        });
    return;
    };
};

function renderCountryCard(country) {
    refs.searchResult.innerHTML = cardMarkup(country);
};

function renderCountryList(countries) {
    refs.searchResult.innerHTML = listMarkUp(countries);
};

function onFetchError(errorText) {
    error({
        text: `${errorText}`,
        hide: true,
        delay: 1000,
        sticker: false,
        closer: true,
        });
};