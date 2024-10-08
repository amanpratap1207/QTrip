import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  const apiUrl = config.backendEndpoint + '/cities';
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const citiesData = await response.json();
    return citiesData;
  } catch (error) {
    
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let content = document.querySelector("#data");
  let div = document.createElement("div");
  div.className = "col-6 col-lg-3 my-2";
  div.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile">
      <img src="${image}" />
      <div class="tile-text">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
    </div>
  </a>
`;
content.append(div);
}

export { init, fetchCities, addCityToDOM };
