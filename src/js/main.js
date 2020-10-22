'use strict';

// console.log('>> Ready :)');
const containerMovies = document.querySelector('.js__containerMovies');
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
    });
}

function renderMovies() {
  let renderHtml = '';
  renderHtml += `<ul>`;
  console.log(movies);
  for (let i = 0; i < movies.length; i++) {
    renderHtml += `<li>`;
    renderHtml += `<img src="${movies[i].show.image.medium}" alt="poster image" title="poster image" />`;
    renderHtml += `<h2>${movies[i].show.name}</h2>`;
    renderHtml += `</li>`;
  }
  renderHtml += `</ul>`;
  console.log(renderHtml);
  containerMovies.innerHTML = renderHtml;
}

function getSearchMovies() {
  console.log('hi');
  const inputNameMovie = inputMovies.value;
  getData(inputNameMovie);
}

btnSearch.addEventListener('click', getSearchMovies);

getData();
