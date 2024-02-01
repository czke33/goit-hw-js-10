const URL = 'https://api.thecatapi.com/v1';
const CAT_API_KEY =
  'live_ytXKzJTex2qoysuMUuCH9GUih58jBe3Ubxub8Orh1oQXsuEnp3IhJTfredNjkz3m';
export function fetchBreeds() {
  return fetch(`${URL}/breeds?api_key=${CAT_API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${URL}/images/search?api_key=${CAT_API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
