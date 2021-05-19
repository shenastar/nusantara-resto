import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import data from '../DATA.json';

const menu = document.querySelector('#menu');
const hero = document.querySelector('.hero');
const main = document.querySelector('main');
const drawer = document.querySelector('#drawer');

menu.addEventListener('click', function (event) {
    drawer.classList.toggle('open');
    event.stopPropagation();
});

hero.addEventListener('click', function () {
    drawer.classList.remove('open');
});

main.addEventListener('click', function () {
    drawer.classList.remove('open');
});

const getData = (data) => {
    let html = "";
    data.restaurants.forEach(resto => {
        const rating = resto.rating.toFixed(1);
        html += `
        <article class="post-item">
            <img class="post-item__thumbnail" src="${resto.pictureId}"
                alt="gambar-${resto.name}">
            <div class="post-item__content">
                <p class="post-item__date">${resto.city}</p>
                <div class="post-item__head">
                    <p class="post-item__date">${resto.city}</p>
                    <h1 class="post-item__title post-head__main"><a href="#">${resto.name}</a></h1>
                </div>
                <div class="post-item__rating">
                    <span class="material-icons rating-icon">star_rate</span>
                    <p class="rating-text">${rating}</p>
                </div>
                <p class="post-item__description">${resto.description}</p>
            </div>
        </article>
        `;
    });
    document.getElementById('posts').innerHTML = html;
}
getData(data);



