// import axios from 'axios';
import defaultImage from "./images/default.jpg"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const apiKey = "?api_key=11f568ee70218bec08ad7368f7bb3250";
const apiUrl = "https://api.themoviedb.org/3/search/movie";
// const discoverUrl = "https://api.themoviedb.org/3/discover/movie"
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


// function onRenderFooter(page) {
//   const footer = document.querySelector('.footer')
//   if(page>3){
//   footer.innerHTML =`
//   <ul class="footer-list">
//     <li class="footer-1-element" id=${page-3}><p>${page-3}</p></li>
//     <li class="footer-2-element" id=${page-2}><p>${page-2}</p></li>
//     <li class="footer-3-element" id=${page-1}><p>${page-1}</p></li>
//     <li class="footer-4-element" id=${page}><p>${page}</p></li>
//     <li class="footer-5-element" id=${parseInt(page)+1}><p>${parseInt(page)+1}</p></li>
//     <li class="footer-6-element" id=${parseInt(page)+2}><p>${parseInt(page)+2}</p></li>
//     <li class="footer-7-element" id=${parseInt(page)+3}><p>${parseInt(page)+3}</p></li>
//   </ul>`;} 
//   else
//   {  footer.innerHTML =`
//   <ul class="footer-list">
//     <li class="footer-1-element" id=1><p>1</p></li>
//     <li class="footer-2-element" id=2><p>2</p></li>
//     <li class="footer-3-element" id=3><p>3</p></li>
//     <li class="footer-4-element" id=4><p>4</p></li>
//     <li class="footer-5-element" id=5><p>5</p></li>
//     <li class="footer-6-element" id=6><p>6</p></li>
//     <li class="footer-7-element" id=7><p>7</p></li>
//   </ul>`;}
// }


// -------------------------------------------------


// const onRenderFooter = (page) => {
//   footer.innerHTML=''
//   if(page>3){
//     const markup = `
//       <ul class="footer-list">
//         <li class="footer-1-element" id=${parseInt(page)-3}><p>${parseInt(page)-3}</p></li>
//         <li class="footer-2-element" id=${parseInt(page)-2}><p>${parseInt(page)-2}</p></li>
//         <li class="footer-3-element" id=${parseInt(page)-1}><p>${parseInt(page)-1}</p></li>
//         <li class="footer-4-element" id=${parseInt(page)}><p>${parseInt(page)}</p></li>
//         <li class="footer-5-element" id=${parseInt(page)+1}><p>${parseInt(page)+1}</p></li>
//         <li class="footer-6-element" id=${parseInt(page)+2}><p>${parseInt(page)+2}</p></li>
//         <li class="footer-7-element" id=${parseInt(page)+3}><p>${parseInt(page)+3}</p></li>
//       </ul>`
//     footer.insertAdjacentHTML('beforeend', markup);
//   return} 
//     else{  
//       const markup =  `
//       <ul class="footer-list">
//         <li class="footer-1-element" id=1><p>1</p></li>
//         <li class="footer-2-element" id=2><p>2</p></li>
//         <li class="footer-3-element" id=3><p>3</p></li>
//         <li class="footer-4-element" id=4><p>4</p></li>
//         <li class="footer-5-element" id=5><p>5</p></li>
//         <li class="footer-6-element" id=6><p>6</p></li>
//         <li class="footer-7-element" id=7><p>7</p></li>
//       </ul>`
//     footer.insertAdjacentHTML('beforeend', markup);
//   return}
// }

// -------------------------------------------------


// onRenderFooter(page)
// const pageLink1 = document.querySelector('.footer-1-element');
// const pageLink2 = document.querySelector('.footer-2-element');
// const pageLink3 = document.querySelector('.footer-3-element');
// const pageLink4 = document.querySelector('.footer-4-element');
// const pageLink5 = document.querySelector('.footer-5-element');
// const pageLink6 = document.querySelector('.footer-6-element');
// const pageLink7 = document.querySelector('.footer-7-element');

// pageLink1.addEventListener('click', (page) => {page = pageLink1.id; console.log(page); onRenderFooter(page)});
// pageLink2.addEventListener('click', (page) => {page = pageLink2.id; console.log(page); onRenderFooter(page)});
// pageLink3.addEventListener('click', (page) => {page = pageLink3.id; console.log(page); onRenderFooter(page)});
// pageLink4.addEventListener('click', (page) => {page = pageLink4.id; console.log(page); onRenderFooter(page)});
// pageLink5.addEventListener('click', (page) => {page = pageLink5.id; console.log(page); onRenderFooter(page)});
// pageLink6.addEventListener('click', (page) => {page = pageLink6.id; console.log(page); onRenderFooter(page)});
// pageLink7.addEventListener('click', (page) => {page = pageLink7.id; console.log(page); onRenderFooter(page)});


const poleFirst = document.querySelector('.first');
const pole1 = document.querySelector('.one');
const pole2 = document.querySelector('.two');
const pole3 = document.querySelector('.three');
const pole4 = document.querySelector('.four');
const pole5 = document.querySelector('.five');
const poleLast = document.querySelector('.last');

const poleF = document.querySelector('.f') 
const poleA = document.querySelector('.a') 
const poleB = document.querySelector('.b') 
const poleC = document.querySelector('.c') 
const poleD = document.querySelector('.d') 
const poleE = document.querySelector('.e') 
const poleL = document.querySelector('.l')

const leftBtn = document.querySelector('.left-button')
const rightBtn = document.querySelector('.right-button')

poleF.innerHTML = 1
poleL.innerHTML = totalPage

const renderFoot = (page) => {
  footer.classList.remove('isHidden')
  poleA.classList.remove('isHidden')
  poleB.classList.remove('isHidden')
  poleC.classList.remove('isHidden')
  poleD.classList.remove('isHidden')
  poleE.classList.remove('isHidden')
  poleL.classList.remove('isHidden')
  if (totalPage==1){
    footer.classList.add('isHidden')
  }
  else if(totalPage<7){
    poleA.innerHTML = `${parseInt(page)-2}`
    poleB.innerHTML = `${parseInt(page)-1}`
    poleC.innerHTML = `${parseInt(page)}`
    poleD.innerHTML = `${parseInt(page)+1}`
    poleE.innerHTML = `${parseInt(page)+2}`
    poleL.classList.add('isHidden')
    checkPopular()
  }
  else if(totalPage<6){
    poleA.innerHTML = `${parseInt(page)-2}`
    poleB.innerHTML = `${parseInt(page)-1}`
    poleC.innerHTML = `${parseInt(page)}`
    poleD.innerHTML = `${parseInt(page)+1}`
    poleE.classList.add('isHidden')
    poleL.classList.add('isHidden')
    checkPopular()
  }
  else if(totalPage<5){
    poleA.innerHTML = `${parseInt(page)-2}`
    poleB.innerHTML = `${parseInt(page)-1}`
    poleC.innerHTML = `${parseInt(page)}`
    poleD.classList.add('isHidden')
    poleE.classList.add('isHidden')
    poleL.classList.add('isHidden')
    checkPopular()
  }
  else if(totalPage<4){
    poleA.innerHTML = `${parseInt(page)-2}`
    poleB.innerHTML = `${parseInt(page)-1}`
    poleC.classList.add('isHidden')
    poleD.classList.add('isHidden')
    poleE.classList.add('isHidden')
    poleL.classList.add('isHidden')
    checkPopular()
  }
  else if(totalPage<3){
    poleA.innerHTML = `${parseInt(page)-2}`
    poleB.classList.add('isHidden')
    poleC.classList.add('isHidden')
    poleD.classList.add('isHidden')
    poleE.classList.add('isHidden')
    poleL.classList.add('isHidden')
    checkPopular()
  }
  else if(page>3){
    poleA.innerHTML = `${parseInt(page)-2}`
    poleB.innerHTML = `${parseInt(page)-1}`
    poleC.innerHTML = `${parseInt(page)}`
    poleD.innerHTML = `${parseInt(page)+1}`
    poleE.innerHTML = `${parseInt(page)+2}`
    checkPopular()
  }
    else{
      poleA.innerHTML = 2
      poleB.innerHTML = 3
      poleC.innerHTML = 4
      poleD.innerHTML = 5
      poleE.innerHTML = 6
      checkPopular()
    }
}

pole1.addEventListener('click', renderF = ()=>{page = poleA.innerHTML; renderFoot(page)})
pole2.addEventListener('click', renderF = ()=>{page = poleB.innerHTML; renderFoot(page)})
pole3.addEventListener('click', renderF = ()=>{page = poleC.innerHTML; renderFoot(page)})
pole4.addEventListener('click', renderF = ()=>{page = poleD.innerHTML; renderFoot(page)})
pole5.addEventListener('click', renderF = ()=>{page = poleE.innerHTML; renderFoot(page)})
poleFirst.addEventListener('click', renderF = ()=>{page = poleF.innerHTML; renderFoot(page)})
poleLast.addEventListener('click', renderF = ()=>{page = poleL.innerHTML; renderFoot(page)})
leftBtn.addEventListener('click', renderF = ()=>{page = parseInt(poleC.innerHTML)-1; renderFoot(page)})
rightBtn.addEventListener('click', renderF = ()=>{if(totalPage!==page+3){page = parseInt(poleC.innerHTML)+1; renderFoot(page)}{renderFoot(page)}})

renderFoot(page)