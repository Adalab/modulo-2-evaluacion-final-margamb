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
  renderHtml += `<ul>`;

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

    renderHtml += `<li class = "${classFavoriteBackColor} js__movieItem" id = "${[
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
  const clicked = parseInt(ev.currentTarget.id); //id solo numero
  console.log(`El usuario ha clickado en un objeto con la id ${clicked}`);
  //la funciion de favmovie coge el objeto cn la id q han clickado
  const favMovie = movies.filter((movie) => movie.show.id === clicked)[0];
  //   console.log(`Esta es la lista de foundMovies ${JSON.stringify(movies)}`);
  console.log(
    `Con la ID ${clicked} hemos encontrado este show en la lista de movies`,
    favMovie
  );

  //   for (let i = 0; i < favoritesMovies.length; i++) {
  const isShowAlreadyFaved =
    favoritesMovies.filter((show) => show.show.id === clicked).length > 0;
  console.log(
    `Hemos buscado la peli en las favoritas y nos ha dado ${isShowAlreadyFaved}`
  );
  if (isShowAlreadyFaved) {
    console.log('lo quito');
    // let fa = isFavorite;
  } else {
    console.log('lo meto');
    favoritesMovies.push(favMovie); //el objeto entero subimos a favoritos
    // console.log(
    //   `Ahora en favmovies tenemos ${JSON.stringify(favoritesMovies)}`
    // );
  }

  //     const isFavShow = indexFavShow === true;
  //     favoritesMovies.splice(isFavShow, 1);
  //   }

  //

  //isFavShow -> las series que estan el favoritos Como las quito?
  //   console.log(isFavShow);
  //   const isFavorite = favMovie !== -1;
  //   if (isFavorite === false) {
  //     favoritesMovies.push(favMovie);
  //   } else {
  //     favoritesMovies.splice(, 1);
  //   }

  //   if (isFavShow === false) {
  //     console.log('lo meto');
  //     favoritesMovies.push(favMovie);
  //   } else {
  //     console.log('lo quito');
  //     favoritesMovies.splice(indexFavShow, 1);
  //   }
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

function renderFavorites() {
  let renderFavHtml = '';

  for (let i = 0; i < favoritesMovies.length; i++) {
    renderFavHtml += `<li class="js__movieItem" id = "${[movies[i].show.id]}">`;
    renderFavHtml += `<img src="${
      favoritesMovies[i].show.image?.medium ||
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    }" alt="poster image" title="poster image" />`;
    renderFavHtml += `<h2>${favoritesMovies[i].show.name}</h2>`;
    renderFavHtml += `</li>`;
    renderFavHtml += `<i class="fa fa-times" aria-hidden="true"></i>`;
  }
  containerFavoriteSerie.innerHTML = renderFavHtml;
  addFavEventListener();
}

renderFavorites();

// function deleteFanMovie(ev) {
//   for (let i = 0; i < favoritesMovies.length; i++) {
//     console.log('Current target:', ev.currentTarget);
//     console.log('Target:', ev.target);
//   }
// }
