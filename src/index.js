// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const apiKey = "?api_key=11f568ee70218bec08ad7368f7bb3250";
const apiUrl = "https://api.themoviedb.org/3/search/movie";
const siteInput = document.querySelector('.search-form__input')
const siteBtn = document.querySelector('.search_button')
const page = "1";


async function checkMovie(movieTitle){
try {
  const response = await fetch(apiUrl+`${apiKey}`+'&query='+ movieTitle+'&page='+ page);
  const data = await response.json();
  console.log(data);
  movieGallery.innerHTML=''
   Notify.success('Hooray! We found movie. First result is '+ data.results[0].original_title)
   onRenderGallery(data.results)
} catch (error) {
  Notify.failure('No results for '+ movieTitle +'!')
  console.error(error);
}}


siteBtn.addEventListener("click",  (e) => {
  e.preventDefault();
  if (siteInput.value=='') {
  Notify.warning('Please type movie title') 
  } else checkMovie(siteInput.value.toLowerCase());
    })  

    const movieGallery = document.querySelector('.movie_gallery')

    function onRenderGallery(elements) {
      const markup = elements
        .map(
          ({
            poster_path,
            title,
            overview,
            popularity
          }) => {
            return `<div class="photo-card">
        <a href="#">
          <img class="photo-img" src="https://image.tmdb.org/t/p/w185${poster_path}" alt="${title}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
             ${overview}
          </p>
          <p class="info-item">
          ${popularity}
       </p>
        </div></div>`;
          }
        )
        .join('');
      movieGallery.insertAdjacentHTML('beforeend', markup);
    }


    function byPopularity(a,b){
      if (a.popularity > b.popularity) {
        return 1;
      } else if (b.popularity > a.popularity){
        return -1;
      } else {
        return 0;
      }
    }