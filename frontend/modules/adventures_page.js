 
// import config from ".././conf/index";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  const IndexCity = search.indexOf("=") + 1;
   const city = search.substring(IndexCity);
   return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
 try{
  // const city = getCityFromURL(search);
  // const apiUrl = `${backendEndpoint}/adventures?city=${city}`;
  const response = await fetch(`http://3.110.140.161:8082/adventures?city=${city}`);
  let cities = await response.json();
  console.log(cities);
  
return cities;
 }
 catch(error){
  return null;
 }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const data = document.querySelector("#data");

  adventures.forEach((val) => {
    const div = document.createElement("div");
    div.classList = "col-6 col-lg-3 my-3";
    div.innerHTML = `
    <a href="detail/?adventure=${val.id}" id="${val.id}">
    <div class="activity-card">
      <img src="${val.image}" alt="">
      <div class="category-banner">
        ${val.category}
      </div>
      <ul class="d-flex justify-content-between w-100 align-items-center flex-md-row flex-sm-column flex-column list-unstyled">
        <li class="mt-3 px-2 ">${val.name}</li>
        <li class="mt-3 px-2">₹${val.costPerHead}</li>
      </ul>
      <ul class="d-flex justify-content-between w-100 align-items-center flex-md-row flex-sm-column flex-column list-unstyled">
        <li class="mt-3 px-2">Duration</li>
        <li class="mt-3 px-2">${val.duration} Hours</li>
      </ul>
    </div>
   </a>
    `;

    data.append(div);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter((ele)=> ele.duration>=low && ele.duration<=high);
  return filteredList; 
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter((ele)=>categoryList.includes(ele.category));
  return filteredList;
  // ************************************
  // if (!categoryList || categoryList.length === 0) {
  //   return list; // No category filter, return all adventures
  // }

  // return list.filter(adventure => {
  //   return categoryList.includes(adventure.category);
  // });
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let fileredList = [];
  if(filters.duration.length>0 && filters.category.length >0){
    let choice = filters.duration.split("-");
    fileredList = filterByDuration(list, parseInt(choice[0]), parseInt(choice[1]));
    fileredList = filterByCategory(fileredList,filters.category);
  }
  else if(filters.duration.length>0){
    let choice = filters.duration.split("-");
    fileredList = filterByDuration(list, parseInt(choice[0]), parseInt(choice[1]));
  }
  else if(filters.category.length>0){
    fileredList = filterByCategory(list,filters.category);
  }
  else{
    fileredList=list;
  }

  return fileredList;

}



//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
const categoryList = filters.category || []; // Get the list of selected categories from filters

  const categoryListContainer = document.getElementById('category-list'); // Get the container element
  categoryListContainer.innerHTML = ''; // Clear any existing pills

  // Generate and insert pills for selected categories
  categoryList.forEach(category => {
    const pill = document.createElement('div');
    pill.classList.add('category-filter');
    pill.textContent = category;
    categoryListContainer.appendChild(pill);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
