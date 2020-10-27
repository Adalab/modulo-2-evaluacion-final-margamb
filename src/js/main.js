'use strict';

const containerShows = document.querySelector('.js__containerShows');
const containerFavoriteShows = document.querySelector('.js__favoriteShowsList');
const btnSearch = document.querySelector('.js__btnSearch');
const inputShows = document.querySelector('.js__inputShows');
let shows = [];
//si hay algo en localStore cogelo, sino es una array vacia
let favs = JSON.parse(localStorage.getItem('favs')) || [];

function getData(show) {
  fetch(`https://api.tvmaze.com/search/shows?q=${show}`)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      renderShows();
      addFavEventListener();
    });
}

//function input to search show
function getSearchShows() {
  const inputNameShow = inputShows.value;
  getData(inputNameShow);
}
btnSearch.addEventListener('click', getSearchShows);

//Make the input work when hitting enter key.
function enterKey(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    e.preventDefault();
    btnSearch.click();
  }
}
inputShows.addEventListener('keydown', enterKey);

const btnLog = document.querySelector('.js__log');
function log() {
  for (let i = 0; i < shows.length; i++) {
    console.log(shows[i].show.name);
  }
}
btnLog.addEventListener('click', log);

//function render show and add class of favorite show
function renderShows() {
  let renderHtml = '';
  renderHtml += `<ul class="sectionTwo__ul">`;

  for (let i = 0; i < shows.length; i++) {
    let classFavoriteBackColor;
    //Me da una array con un show si este ya esta en favs, filtra en favs.
    const favoriteIndex = favs.filter(
      (favShow) => favShow.show.id === shows[i].show.id
    );

    // Si en la busqueda anterior tengo al menos un resultado
    // significa que el show esta incluido en favoritos
    const isFavoriteShow = favoriteIndex.length > 0; //true

    if (isFavoriteShow === true) {
      classFavoriteBackColor = 'showFavoriteBckColor';
    } else {
      classFavoriteBackColor = '';
    }

    renderHtml += `<li class = "${classFavoriteBackColor} sectionTwo__li js__showItem" id = "${[
      shows[i].show.id,
    ]}">`;
    renderHtml += `<img class="sectionTwo__img" src="${
      shows[i].show.image?.medium ||
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    }" alt="poster image" title="poster image" />`;

    renderHtml += `<h2 class="sectionTwo__titleShow">${shows[i].show.name}</h2>`;
    renderHtml += `<p>${shows[i].show.schedule.time}</p>`;
    renderHtml += `</li>`;
  }

  renderHtml += `</ul>`;
  containerShows.innerHTML = renderHtml;
}

//Handler function
function handleFavClick(ev) {
  const clickedId = parseInt(ev.currentTarget.id); //id -> solo numero

  // filter() crea un nuevo array con todos los elementos que cumplan la condición
  // Busco en FAVORITOS si el objetos esta.
  //> 0 esta
  const isShowAlreadyFaved =
    favs.filter((show) => show.show.id === clickedId).length > 0;

  if (isShowAlreadyFaved === true) {
    //Busco en favs si esta el show clickado y quito(falso)
    favs = favs.filter((show) => show.show.id !== clickedId);
    console.log('quito el objeto');
  } else {
    console.log('meto el objeto');
    //find() devuelve el valor del primer elemento del array cuya id es igual a la clikada
    //Busca el show en shows y lo copia en favoritos.
    const clickedShow = shows.find((show) => show.show.id === clickedId);
    favs.push(clickedShow); //el objeto entero lo copiamos a favoritos
  }

  setLocalStorage();
  renderShows();
  addFavEventListener();
  renderFavorites();
}

function addFavEventListener() {
  const showItems = document.querySelectorAll('.js__showItem');
  for (const showItem of showItems) {
    showItem.addEventListener('click', handleFavClick);
  }
}

// Function to render favorites
function renderFavorites() {
  let renderFavHtml = '';

  for (let i = 0; i < favs.length; i++) {
    renderFavHtml += `<li class="sectionOne__list">`;
    renderFavHtml += `<img class="sectionOne__img" src="${
      (favs[i].show.image && favs[i].show.image.medium) ||
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    }" alt="poster image" title="poster image" />`;

    renderFavHtml += `<h2 class="sectionOne__titleShow">${favs[i].show.name}</h2>`;
    renderFavHtml += `<i class="js__showItem fa fa-times" id = "${favs[i].show.id}" aria-hidden="true"></i>`;
    renderFavHtml += `</li>`;
  }
  containerFavoriteShows.innerHTML = renderFavHtml;
  addFavEventListener();
}

//renderizamos mas tarde para que nos aparezcan los favoritos
setLocalStorage();
renderFavorites();

//Function to delete all the favourites
const btnDeleteList = document.querySelector('.js__btnDeleteList');
function deleteList() {
  favs = [];
  setLocalStorage();
  renderFavorites();
  renderShows();
  addFavEventListener();
}
btnDeleteList.addEventListener('click', deleteList);

////Function localStorage
function setLocalStorage() {
  localStorage.setItem('favs', JSON.stringify(favs));
}
