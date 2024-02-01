import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ytXKzJTex2qoysuMUuCH9GUih58jBe3Ubxub8Orh1oQXsuEnp3IhJTfredNjkz3m';

const apiKey =
  'live_ytXKzJTex2qoysuMUuCH9GUih58jBe3Ubxub8Orh1oQXsuEnp3IhJTfredNjkz3m';

const url1 = 'https://api.thecatapi.com/v1/breeds';
const url2 = 'https://api.thecatapi.com/v1/images';

const fetchBreeds = () => {
  return fetch(`${url1}?api_key=${apiKey}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
const fetchCatByBreed = breedId => {
  return fetch(`${url2}/${breedId}?api_key=${apiKey}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
