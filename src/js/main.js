'use strict';

const containerMovies = document.querySelector('.js__containerMovies');
const containerFavoriteSerie = document.querySelector(
  '.js__favoriteSeriesList'
);
const btnSearch = document.querySelector('.js__btnSearch');
const inputMovies = document.querySelector('.js__inputMovie');
let movies = [];
let favoritesMovies = [];

function getData(movie) {
  fetch(`http://api.tvmaze.com/search/shows?q=${movie}`)
    .then((response) => response.json())
    // .then(console.log)
    .then((data) => {
      movies = data;
      renderMovies();
      clickFavoriteMovies();
    });
}

function renderMovies() {
  let renderHtml = '';
  renderHtml += `<ul>`;
  console.log(movies);

  for (let i = 0; i < movies.length; i++) {
    let classFavoriteBackColor;
    console.log('favoritesMovies', favoritesMovies);
    const favoriteIndex = favoritesMovies.indexOf(movies[i].show.id);
    console.log('favoriteIndex', favoriteIndex);
    const isFavoriteMov = favoriteIndex !== -1;
    if (isFavoriteMov === true) {
      classFavoriteBackColor = 'movieFavoriteBckColor';
    } else {
      classFavoriteBackColor = '';
    }

    renderHtml += `<li class = "${classFavoriteBackColor} js__movieItem" id = "${[
      movies[i].show.id,
    ]}">`;
    renderHtml += `<img src="${
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
  console.log(renderHtml);
  containerMovies.innerHTML = renderHtml;
}

function getSearchMovies() {
  const inputNameMovie = inputMovies.value;
  getData(inputNameMovie);
}

btnSearch.addEventListener('click', getSearchMovies);

function favoriteListMovies(ev) {
  const clicked = parseInt(ev.currentTarget.id);
  console.log(clicked);
  const indexFav = favoritesMovies.indexOf(clicked);
  const isFavorite = indexFav !== -1;
  if (isFavorite === false) {
    console.log('lo meto');
    favoritesMovies.push(clicked);
  } else {
    console.log('lo quito');
    favoritesMovies.splice(indexFav, 1);
  }
  renderMovies();
  clickFavoriteMovies();
}

function clickFavoriteMovies() {
  console.log('clickFavoriteMovies');
  const movieItems = document.querySelectorAll('.js__movieItem');
  for (const movieItem of movieItems) {
    movieItem.addEventListener('click', favoriteListMovies);
  }
}

//hacer lo de si no tiene foto no va

//el boton search q vaya con reset
