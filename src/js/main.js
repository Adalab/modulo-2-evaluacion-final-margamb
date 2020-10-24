'use strict';

const containerShows = document.querySelector('.js__containerShows');
const containerFavoriteShows = document.querySelector('.js__favoriteShowsList');
const btnSearch = document.querySelector('.js__btnSearch');
const inputShows = document.querySelector('.js__inputShows');
let shows = [];
//si hay algo en localStore cogelo, sino es una array vacia
let favs = JSON.parse(localStorage.getItem('favs')) || [];

//function get data
function getData(show) {
  fetch(`http://api.tvmaze.com/search/shows?q=${show}`)
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

//function render show and add class of favorite show
function renderShows() {
  let renderHtml = '';
  renderHtml += `<ul class="sectionTwo__ul">`;
  for (let i = 0; i < shows.length; i++) {
    let classFavoriteBackColor;
    const favoriteIndex = favs.filter(
      (favShow) => favShow.show.id === shows[i].show.id
    );
    const isFavoriteShow = favoriteIndex.length > 0;
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
    // renderHtml += `<img src="${
    //   (shows[i].show.image && shows[i].show.image.medium) ||
    //   'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    // }" alt="poster image" title="poster image" />`;

    renderHtml += `<h2 class="sectionTwo__titleShow">${shows[i].show.name}</h2>`;
    renderHtml += `</li>`;
  }
  renderHtml += `</ul>`;
  containerShows.innerHTML = renderHtml;
}

//funcion manejadora.
function handleFavClick(ev) {
  const clicked = parseInt(ev.currentTarget.id); //id -> solo numero

  //la funciion de fanshow coge el objeto cn la id q han clickado
  //filter me devuelve una array de show(s) clickad(as) -> [0]cogemos el objeto.
  const favShow = shows.filter((show) => show.show.id === clicked)[0];

  // filter busca en favs si el id esta clickado(si es mayor q 0 esta clickado)
  const isShowAlreadyFaved =
    favs.filter((show) => show.show.id === clicked).length > 0;

  if (isShowAlreadyFaved === true) {
    //lo desclico
    favs = favs.filter((show) => show.show.id !== clicked);
    console.log('lo quito');
  } else {
    console.log('lo meto');
    favs.push(favShow); //el objeto entero subimos a favoritos
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

// funcion para renderizar favoritos.
function renderFavorites() {
  let renderFavHtml = '';

  for (let i = 0; i < favs.length; i++) {
    renderFavHtml += `<li class="sectionOne__list js__showItem" id = "${favs[i].show.id}">`;
    renderFavHtml += `<img class="sectionOne__img" src="${
      favs[i].show.image?.medium ||
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    }" alt="poster image" title="poster image" />`;
    renderFavHtml += `<h2 class="sectionOne__titleShow">${favs[i].show.name}</h2>`;
    renderFavHtml += `<i class="fa fa-times" aria-hidden="true"></i>`;
    renderFavHtml += `</li>`;
  }
  containerFavoriteShows.innerHTML = renderFavHtml;
  addFavEventListener();
}

/// local Storage ///
// favs = JSON.parse(localStorage.getItem('favs')) || [];

// -> renderizamos mas tarde para que nos aparezcan los favoritos
setLocalStorage();
renderFavorites();

const btnDeleteList = document.querySelector('.js__btnDeleteList');
function deleteList() {
  console.log('hi');
  favs = [];
  setLocalStorage();
  renderFavorites();
}
btnDeleteList.addEventListener('click', deleteList);

function setLocalStorage() {
  localStorage.setItem('favs', JSON.stringify(favs));
}
