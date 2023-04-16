import defaultImage from "./images/default.jpg"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const apiKey = "?api_key=11f568ee70218bec08ad7368f7bb3250";
const apiUrl = "https://api.themoviedb.org/3/search/movie";
const popularUrl = "https://api.themoviedb.org/3/movie/popular"
const siteInput = document.querySelector('.search-form__input');
const siteBtn = document.querySelector('.search_button');
let page = 1;
let totalPage = 10;
const footer = document.querySelector('.footer')


async function checkPopular(){
  try{
    // const response = await fetch(discoverUrl+apiKey+'&sort_by=popularity.desc')
    const response = await fetch(`${popularUrl}${apiKey}&page=${page}`)
    const data = await response.json();
    console.log(data)
    let totalPage = data.total_pages
    onRenderGallery(data.results)
    return totalPage

  }catch(error){
    console.error(error);
  }
}

checkPopular()

async function checkMovie(movieTitle){
try {
  const response = await fetch(apiUrl+apiKey+'&query='+ movieTitle+'&page='+ page);
  const data = await response.json();
  console.log(data)
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
      movieGallery.innerHTML = ''
      const markup = elements
        .map(
          ({
            poster_path,
            title,
            overview,
            popularity
          }) => {

            if (poster_path!==null) {
              return `<div class="photo-card">
              <a href="#">
                <img class="photo-img" src="https://image.tmdb.org/t/p/w185${poster_path}" alt="${title}" loading="lazy" />
              </a>
              <div class="info">
              <p class="info-item title-item">
              ${title}
           </p>

              </div></div>`;
            } else {
              return `<div class="photo-card">
              <a href="#">
                <img class="photo-img" src="${defaultImage}" alt="${title}" loading="lazy"/>
              </a>
              <div class="info">
              <p class="info-item title-item">
              ${title}
           </p>

              </div></div>`;
            }

          }
        )
        .join('');
      movieGallery.insertAdjacentHTML('beforeend', markup);
    }


// const defImg = () => {
//     const defData = data.results
//     if (data.poster_path==null) {
//         data.poster_path=defaultImage
//         }
// }


const defData = data.results.map((data) => {
    if(data.poster_path==null){
      data.poster_path = 'defaultImage'}
    return data
    })
console.log(defData)


const defaultPoster = (data) => {
const dataDefPoster = data.results.map((data) => {
    if(data.poster_path==null){
      data.poster_path = 'defaultImage'}
    return dataDefPoster
    })}
console.log(defaultPoster(dataDefPoster))


