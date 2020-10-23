'use strict';

const containerMovies = document.querySelector('.js__containerMovies');
const containerFavoriteSerie = document.querySelector(
  '.js__favoriteSeriesList'
);
const btnSearch = document.querySelector('.js__btnSearch');
const inputMovies = document.querySelector('.js__inputMovie');
let movies = [];
let favoritesMovies = [];

//function get data
function getData(movie) {
  fetch(`http://api.tvmaze.com/search/shows?q=${movie}`)
    .then((response) => response.json())
    .then((data) => {
      movies = data;
      renderMovies();
      addFavEventListener();
    });
}

//function render show and add class of favorite show
function renderMovies() {
  let renderHtml = '';
  renderHtml += `<ul class="sectionTwo__ul">`;

  for (let i = 0; i < movies.length; i++) {
    let classFavoriteBackColor;
    const favoriteIndex = favoritesMovies.filter(
      (favMovie) => favMovie.show.id === movies[i].show.id
    );
    const isFavoriteMov = favoriteIndex.length > 0;
    if (isFavoriteMov === true) {
      classFavoriteBackColor = 'movieFavoriteBckColor';
    } else {
      classFavoriteBackColor = '';
    }

    renderHtml += `<li class = "${classFavoriteBackColor} sectionTwo__li js__movieItem" id = "${[
      movies[i].show.id,
    ]}">`;
    renderHtml += `<img class="sectionTwo__img" src="${
      movies[i].show.image?.medium ||
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    }" alt="poster image" title="poster image" />`;

    // renderHtml += `<img src="${
    //   (movies[i].show.image && movies[i].show.image.medium) ||
    //   'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    // }" alt="poster image" title="poster image" />`;

    renderHtml += `<h2 ">${movies[i].show.name}</h2>`;
    renderHtml += `</li>`;
  }
  renderHtml += `</ul>`;
  containerMovies.innerHTML = renderHtml;
}

//function input to search show
function getSearchMovies() {
  const inputNameMovie = inputMovies.value;
  getData(inputNameMovie);
}
btnSearch.addEventListener('click', getSearchMovies);

function handleFavClick(ev) {
  const clicked = parseInt(ev.currentTarget.id); //id -> solo numero
  console.log(`El usuario ha clickado en un objeto con la id ${clicked}`);
  //la funciion de fanMovie coge el objeto cn la id q han clickado
  const favMovie = movies.filter((movie) => movie.show.id === clicked)[0];
  //   console.log(`Esta es la lista de foundMovies ${JSON.stringify(movies)}`);
  console.log(
    `Con la ID ${clicked} hemos encontrado este show en la lista de movies`,
    favMovie
  );

  //filter nos da un array  de las clicladas length es mayor de 0 si fuera menos uno no estarian clicadas.
  //Vemos
  const isShowAlreadyFaved =
    favoritesMovies.filter((show) => show.show.id === clicked).length > 0;

  console.log(
    `Hemos buscado la peli en las favoritas y nos ha dado ${isShowAlreadyFaved}`
  );
  if (isShowAlreadyFaved) {
    favoritesMovies = favoritesMovies.filter(
      (show) => show.show.id !== clicked
    );
    console.log('lo quito');
  } else {
    console.log('lo meto');
    favoritesMovies.push(favMovie); //el objeto entero subimos a favoritos
    // console.log(
    //   `Ahora en favmovies tenemos ${JSON.stringify(favoritesMovies)}`
    // );
  }

  setLocalStorage();
  renderMovies();
  addFavEventListener();
  renderFavorites();
}

function addFavEventListener() {
  console.log('Add event listener');
  const movieItems = document.querySelectorAll('.js__movieItem');
  for (const movieItem of movieItems) {
    movieItem.addEventListener('click', handleFavClick);
  }
}

// funcion para renderizar favoritos.
function renderFavorites() {
  let renderFavHtml = '';

  for (let i = 0; i < favoritesMovies.length; i++) {
    renderFavHtml += `<li class="sectionOne__list js__movieItem" id = "${[
      favoritesMovies[i].show.id,
    ]}">`;
    renderFavHtml += `<img class="sectionOne__img" src="${
      favoritesMovies[i].show.image?.medium ||
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    }" alt="poster image" title="poster image" />`;
    renderFavHtml += `<h2>${favoritesMovies[i].show.name}</h2>`;
    renderFavHtml += `<i class="fa fa-times" aria-hidden="true"></i>`;
    renderFavHtml += `</li>`;
  }
  containerFavoriteSerie.innerHTML = renderFavHtml;

  addFavEventListener();
}

/// local Storage ///
favoritesMovies = JSON.parse(localStorage.getItem('favoritesMovies'));

// -> renderizamos mas tarde para que nos aparezcan los favoritos
renderFavorites();

function setLocalStorage() {
  localStorage.setItem('favoritesMovies', JSON.stringify(favoritesMovies));
}
setLocalStorage();

// const btnDeleteList = document.querySelector('.js__btnDeleteList');
// function deleteList() {
//   favoritesMovies = '';
// }
// btnDeleteList.addEventListener('click', deleteList);
