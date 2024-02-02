import SlimSelect from 'slim-select';
//https://blog.corsego.com/stimulus-slim-select
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ytXKzJTex2qoysuMUuCH9GUih58jBe3Ubxub8Orh1oQXsuEnp3IhJTfredNjkz3m';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const textMarkEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

textMarkEl.classList.add('is-hidden');
errorEl.classList.add('is-hidden');

const mainEl = document.querySelector(
  'slim-select/dist/slimselect.css/.ss.main'
);
mainEl.style.width = '30px';

selectEl.addEventListener('change', onChangeSelect);

updateSelect();

function updateSelect(data) {
  fetchBreeds(data)
    .then(data => {
      loaderEl.classList.toggle('loader', 'is-hidden');

      let markSelect = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });
      selectEl.insertAdjacentHTML('beforeend', markSelect);
      new SlimSelect({
        select: selectEl,
      });
    })
    .catch(onFetchError);
}

function onChangeSelect(event) {
  loaderEl.classList.toggle('is-hidden', 'loader');
  selectEl.classList.add('is-hidden');
  textMarkEl.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loaderEl.classList.toggle('loader', 'is-hidden');
      selectEl.classList.remove('is-hidden');

      const { url, breeds } = data[0];

      textMarkEl.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/>
      <div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;

      textMarkEl.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onFetchError() {
  selectEl.classList.remove('is-hidden');
  loaderEl.classList.toggle('loader', 'is-hidden');

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reload the page or select another cat breed!'
  );
}
