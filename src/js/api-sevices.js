const BASE_URL = 'https://restcountries.eu/rest/v2/'

function fetchCountry(searchQuery) {
    return fetch(`${BASE_URL}name/${searchQuery}`)
        .then(response => {
        if (response.ok) return response.json();
        throw new Error('Unfortunately, country is not found');
    });
}

export default { fetchCountry };